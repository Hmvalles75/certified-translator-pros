import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { sendOrderStartedEmail } from "@/lib/notifications";

export async function POST(request: NextRequest) {
  try {
    const { orderId } = await request.json();

    if (!orderId) {
      return NextResponse.json(
        { error: "Order ID is required" },
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

    // Get translator profile
    const { data: translator } = await supabase
      .from("translators")
      .select("id, email")
      .eq("user_id", user.id)
      .single();

    if (!translator) {
      return NextResponse.json({ error: "Not a translator" }, { status: 403 });
    }

    // Verify order is assigned to this translator
    const { data: order } = await supabase
      .from("orders")
      .select("id, translator_id, status, customer_id")
      .eq("id", orderId)
      .single();

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (order.translator_id !== translator.id) {
      return NextResponse.json(
        { error: "This order is not assigned to you" },
        { status: 403 }
      );
    }

    if (order.status !== "assigned") {
      return NextResponse.json(
        { error: "Order is not in assigned status" },
        { status: 400 }
      );
    }

    // Update order status to in_progress
    const { error: updateError } = await supabase
      .from("orders")
      .update({
        status: "in_progress",
        updated_at: new Date().toISOString(),
      })
      .eq("id", orderId);

    if (updateError) {
      console.error("Error updating order status:", updateError);
      return NextResponse.json(
        { error: "Failed to update order status" },
        { status: 500 }
      );
    }

    // Get customer email for notification
    const { data: customer } = await supabase
      .from("auth.users")
      .select("email")
      .eq("id", order.customer_id)
      .single();

    // Send notification to customer (stub)
    if (customer?.email) {
      await sendOrderStartedEmail(customer.email, orderId);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in start-work route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
