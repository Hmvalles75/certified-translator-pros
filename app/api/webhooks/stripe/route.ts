import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

// Initialize Supabase with service role key
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function buffer(readable: ReadableStream) {
  const chunks: Uint8Array[] = [];
  const reader = readable.getReader();

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  return Buffer.concat(chunks);
}

export async function POST(req: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET is not set");
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 500 }
    );
  }

  try {
    // Get the raw body as a buffer
    const buf = await buffer(req.body as ReadableStream);
    const sig = req.headers.get("stripe-signature");

    if (!sig) {
      return NextResponse.json(
        { error: "No signature found" },
        { status: 400 }
      );
    }

    let event: Stripe.Event;

    try {
      // Verify the webhook signature
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    } catch (err: any) {
      console.error("Webhook signature verification failed:", err.message);
      return NextResponse.json(
        { error: `Webhook Error: ${err.message}` },
        { status: 400 }
      );
    }

    // Handle the checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      console.log("Checkout completed for session:", session.id);

      // Update order status in database
      const { data: order, error: updateError } = await supabaseAdmin
        .from("orders")
        .update({
          status: "paid",
          updated_at: new Date().toISOString(),
        })
        .eq("stripe_session_id", session.id)
        .select()
        .single();

      if (updateError) {
        console.error("Failed to update order:", updateError);
        return NextResponse.json(
          { error: "Failed to update order" },
          { status: 500 }
        );
      }

      if (!order) {
        console.error("No order found for session:", session.id);
        return NextResponse.json(
          { error: "Order not found" },
          { status: 404 }
        );
      }

      console.log("Order updated successfully:", {
        order_id: order.id,
        customer_email: order.customer_email,
        status: order.status,
        amount: `$${(order.price_cents / 100).toFixed(2)}`,
      });

      // TODO: Send confirmation email to customer
      // TODO: Send notification email to admin
      // For now, just log to console
      console.log(`
========================================
NEW PAID ORDER
========================================
Order ID: ${order.id}
Customer: ${order.customer_name}
Email: ${order.customer_email}
Translation: ${order.source_language} → ${order.target_language}
Pages: ${order.page_count}
Turnaround: ${order.turnaround}
Amount Paid: $${(order.price_cents / 100).toFixed(2)}
Document Type: ${order.document_type || "N/A"}
Notes: ${order.notes || "None"}
========================================
      `);
    }

    // Handle payment_intent.succeeded event (optional, for additional logging)
    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log("Payment succeeded:", paymentIntent.id);
    }

    // Handle payment_intent.payment_failed event
    if (event.type === "payment_intent.payment_failed") {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.error("Payment failed:", paymentIntent.id);

      // TODO: Send notification about failed payment
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: error.message || "Webhook handler failed" },
      { status: 500 }
    );
  }
}
