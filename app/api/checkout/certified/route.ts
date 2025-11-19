import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
});

// Initialize Supabase with service role key for admin operations
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      customer_name,
      customer_email,
      source_language,
      target_language,
      document_type,
      page_count,
      turnaround,
      notes,
      price_cents,
    } = body;

    // Validate required fields
    if (!customer_name || !customer_email) {
      return NextResponse.json(
        { error: "Customer name and email are required" },
        { status: 400 }
      );
    }

    if (!source_language || !target_language) {
      return NextResponse.json(
        { error: "Source and target languages are required" },
        { status: 400 }
      );
    }

    if (!page_count || page_count < 1) {
      return NextResponse.json(
        { error: "Page count must be at least 1" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customer_email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Calculate price server-side to prevent tampering
    const basePrice = 29.0;
    const rushMultiplier = turnaround === "rush" ? 1.5 : 1.0;
    const calculatedPriceCents = Math.round(page_count * basePrice * rushMultiplier * 100);

    // Verify the price from client matches server calculation (with small tolerance for rounding)
    if (Math.abs(price_cents - calculatedPriceCents) > 1) {
      return NextResponse.json(
        { error: "Price calculation mismatch" },
        { status: 400 }
      );
    }

    // Create order record in Supabase
    const { data: order, error: dbError } = await supabaseAdmin
      .from("orders")
      .insert({
        customer_name,
        customer_email,
        source_language,
        target_language,
        document_type: document_type || null,
        page_count,
        turnaround: turnaround || "standard",
        price_cents: calculatedPriceCents,
        status: "pending",
        notes: notes || null,
      })
      .select()
      .single();

    if (dbError || !order) {
      console.error("Database error:", dbError);
      return NextResponse.json(
        { error: "Failed to create order" },
        { status: 500 }
      );
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Certified Translation",
              description: `${source_language} to ${target_language} - ${page_count} page(s) - ${turnaround === "rush" ? "Rush (24-48hrs)" : "Standard (3-5 days)"}`,
            },
            unit_amount: calculatedPriceCents,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/order/cancelled`,
      customer_email,
      metadata: {
        order_id: order.id,
        customer_name,
        source_language,
        target_language,
        page_count: page_count.toString(),
        turnaround,
      },
    });

    // Update order with Stripe session ID
    const { error: updateError } = await supabaseAdmin
      .from("orders")
      .update({ stripe_session_id: session.id })
      .eq("id", order.id);

    if (updateError) {
      console.error("Failed to update order with session ID:", updateError);
      // Continue anyway - the order exists and the session is created
    }

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
