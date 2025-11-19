import { Suspense } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
});

// Initialize Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

async function SuccessContent({ sessionId }: { sessionId: string }) {
  // Get the session from Stripe to retrieve order details
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (!session || !session.metadata?.order_id) {
    return (
      <div className="text-center">
        <p className="text-red-600">Order not found.</p>
        <a href="/" className="text-accent hover:underline mt-4 inline-block">
          Return to Home
        </a>
      </div>
    );
  }

  // Fetch order from database
  const { data: order, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", session.metadata.order_id)
    .single();

  if (error || !order) {
    return (
      <div className="text-center">
        <p className="text-red-600">Order not found.</p>
        <a href="/" className="text-accent hover:underline mt-4 inline-block">
          Return to Home
        </a>
      </div>
    );
  }

  const orderData = order as any;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-primary mb-3">
          Order Confirmed!
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Your certified translation order has been received and payment confirmed.
        </p>

        {/* Order Details */}
        <div className="bg-background rounded-lg p-6 mb-8 text-left">
          <h2 className="font-semibold text-primary mb-4 text-center">
            Order Details
          </h2>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-gray-600">Order ID:</dt>
              <dd className="font-mono text-gray-900">{orderData.id.slice(0, 8)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">Status:</dt>
              <dd className="font-medium text-green-600">
                {orderData.status === "paid" ? "Payment Confirmed" : "Processing"}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">Amount Paid:</dt>
              <dd className="font-semibold text-gray-900">
                {formatPrice(orderData.price_cents || 0)}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">Turnaround:</dt>
              <dd className="font-medium text-gray-900">
                {orderData.turnaround === "rush" ? "24-48 hours (Rush)" : "3-5 days (Standard)"}
              </dd>
            </div>
          </dl>
        </div>

        {/* Next Steps */}
        <div className="bg-accent/5 border border-accent/20 rounded-lg p-6 mb-8 text-left">
          <h2 className="font-semibold text-primary mb-4">What happens next?</h2>
          <ol className="space-y-3 text-sm text-gray-700">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-accent text-white rounded-full flex items-center justify-center text-xs font-bold">
                1
              </span>
              <span>
                A certified translator is being assigned to your document.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-accent text-white rounded-full flex items-center justify-center text-xs font-bold">
                2
              </span>
              <span>
                Your document will be professionally translated and certified.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-accent text-white rounded-full flex items-center justify-center text-xs font-bold">
                3
              </span>
              <span>
                You'll receive your certified translation via email within{" "}
                {orderData.turnaround === "rush" ? "24-48 hours" : "3-5 days"}.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-accent text-white rounded-full flex items-center justify-center text-xs font-bold">
                4
              </span>
              <span>
                A confirmation email with your order details has been sent to your inbox.
              </span>
            </li>
          </ol>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/"
            className="px-6 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition-all shadow-md hover:shadow-lg"
          >
            Return to Home
          </a>
          <a
            href="/order"
            className="px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-all"
          >
            Order Another Translation
          </a>
        </div>

        {/* Support */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Questions about your order?{" "}
            <a href="mailto:support@certifiedtranslatorpros.com" className="text-accent hover:underline">
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const params = await searchParams;
  const sessionId = params.session_id;

  if (!sessionId) {
    redirect("/order/certified");
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <Suspense
        fallback={
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-gray-600">Loading order details...</p>
          </div>
        }
      >
        <SuccessContent sessionId={sessionId} />
      </Suspense>
    </div>
  );
}
