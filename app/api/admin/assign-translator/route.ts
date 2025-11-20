import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const { order_id, translator_id } = await request.json();

    if (!order_id || !translator_id) {
      return NextResponse.json(
        { error: "Order ID and Translator ID are required" },
        { status: 400 }
      );
    }

    const supabase = await createServerSupabaseClient();

    // Verify user is authenticated
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // TODO: Add admin role check here
    // For now, we'll allow any authenticated user

    // Verify translator exists and is active (using new schema)
    const { data: translator, error: translatorError } = await supabase
      .from("translators")
      .select("*")
      .eq("id", translator_id)
      .eq("status", "active")
      .single();

    if (translatorError || !translator) {
      return NextResponse.json(
        { error: "Translator not found or inactive" },
        { status: 404 }
      );
    }

    // Update order with translator assignment (using assigned_to field)
    const { error: updateError } = await supabase
      .from("orders")
      .update({
        assigned_to: translator_id,
        status: "assigned",
        updated_at: new Date().toISOString(),
      })
      .eq("id", order_id);

    if (updateError) {
      throw updateError;
    }

    // Create notification for translator
    const { error: notificationError } = await supabase
      .from("notifications")
      .insert({
        user_id: translator.user_id,
        type: "order_assigned",
        title: "New Order Assigned",
        message: `You have been assigned to order ${order_id}`,
        related_order_id: order_id,
        is_read: false,
      });

    if (notificationError) {
      console.error("Error creating notification:", notificationError);
      // Don't fail the request if notification fails
    }

    // TODO: Send email notification to translator
    // await sendTranslatorAssignmentEmail(translator.email, order_id);

    return NextResponse.json({
      success: true,
      message: "Translator assigned successfully",
    });
  } catch (error: any) {
    console.error("Assignment error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
