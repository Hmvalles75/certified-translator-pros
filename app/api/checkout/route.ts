import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { stripe } from "@/lib/stripe";
import type { Order } from "@/lib/types/database";

export async function POST(request: NextRequest) {
  try {
    const { order_id } = await request.json();

    if (!order_id) {
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

    // Fetch order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("*")
      .eq("id", order_id)
      .eq("customer_id", user.id)
      .single();

    if (orderError || !order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const orderData = order as Order;

    // Verify order status
    if (orderData.status !== "pending_review") {
      return NextResponse.json(
        { error: "Order is not in pending review status" },
        { status: 400 }
      );
    }

    // Verify price is set
    if (!orderData.price_cents || orderData.price_cents <= 0) {
      return NextResponse.json(
        { error: "Order price not calculated" },
        { status: 400 }
      );
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: orderData.price_cents,
            product_data: {
              name: "Certified Translation Service",
              description: `${orderData.source_language} to ${orderData.target_language} - ${orderData.document_type}`,
            },
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/order/success?order_id=${order_id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/order/review/${order_id}`,
      metadata: {
        order_id: order_id,
        customer_id: user.id,
      },
      customer_email: user.email,
    });

    // Update order status
    await supabase
      .from("orders")
      .update({
        status: "checkout_initiated",
        stripe_session_id: session.id,
      })
      .eq("id", order_id);

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
