import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

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

    // Verify order belongs to user
    const { data: order } = await supabase
      .from("orders")
      .select("id, customer_id, customer_viewed_at")
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

    // Only update if not already viewed
    if (!order.customer_viewed_at) {
      const { error: updateError } = await supabase
        .from("orders")
        .update({
          customer_viewed_at: new Date().toISOString(),
        })
        .eq("id", orderId);

      if (updateError) {
        console.error("Error updating customer_viewed_at:", updateError);
        return NextResponse.json(
          { error: "Failed to update view status" },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in mark-viewed route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
