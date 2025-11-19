import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { sendRevisionRequestedEmail } from "@/lib/notifications";

export async function POST(request: NextRequest) {
  try {
    const { orderId, message } = await request.json();

    if (!orderId || !message) {
      return NextResponse.json(
        { error: "Order ID and message are required" },
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

    // Verify order belongs to user and is delivered
    const { data: order } = await supabase
      .from("orders")
      .select("id, customer_id, status, translator_id")
      .eq("id", orderId)
      .single();

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (order.customer_id !== user.id) {
      return NextResponse.json(
        { error: "This order does not belong to you" },
        { status: 403 }
      );
    }

    if (order.status !== "delivered") {
      return NextResponse.json(
        { error: "Can only request revision for delivered orders" },
        { status: 400 }
      );
    }

    // Update order with revision request
    const { error: updateError } = await supabase
      .from("orders")
      .update({
        status: "revision_requested",
        needs_revision: true,
        revision_message: message,
        revision_submitted_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", orderId);

    if (updateError) {
      console.error("Error updating order for revision:", updateError);
      return NextResponse.json(
        { error: "Failed to submit revision request" },
        { status: 500 }
      );
    }

    // Get translator email for notification
    if (order.translator_id) {
      const { data: translator } = await supabase
        .from("translators")
        .select("email")
        .eq("id", order.translator_id)
        .single();

      if (translator?.email) {
        await sendRevisionRequestedEmail(
          translator.email,
          orderId,
          message
        );
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in request-revision route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
