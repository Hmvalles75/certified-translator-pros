import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { createClient } from "@supabase/supabase-js";

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("Supabase credentials not configured");
  }

  return createClient(url, key);
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "No signature provided" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  // Handle the event
  try {
    const supabaseAdmin = getSupabaseAdmin();

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const orderId = session.metadata?.order_id;
        const customerId = session.metadata?.customer_id;

        if (!orderId) {
          console.error("No order_id in session metadata");
          break;
        }

        // Update order status to paid
        const { error: updateError } = await supabaseAdmin
          .from("orders")
          .update({
            status: "paid",
            stripe_payment_intent_id: session.payment_intent as string,
          })
          .eq("id", orderId);

        if (updateError) {
          console.error("Error updating order:", updateError);
          throw updateError;
        }

        // Create notification for admin
        const { error: notificationError } = await supabaseAdmin
          .from("notifications")
          .insert({
            user_id: customerId,
            type: "order_paid",
            title: "Order Payment Received",
            message: `Payment received for order ${orderId}. Translation in progress.`,
            related_order_id: orderId,
            is_read: false,
          });

        if (notificationError) {
          console.error("Error creating notification:", notificationError);
        }

        // TODO: Send email to translator pool
        // TODO: Trigger admin notification

        console.log(`Order ${orderId} marked as paid`);
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.error("Payment failed:", paymentIntent.id);
        // TODO: Handle payment failure
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
