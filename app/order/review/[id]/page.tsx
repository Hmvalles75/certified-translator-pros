import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getPriceBreakdown, formatPrice } from "@/lib/pricing";
import { LANGUAGES, DOCUMENT_TYPES } from "@/lib/constants";
import type { Order, OrderFile } from "@/lib/types/database";
import CheckoutButton from "./CheckoutButton";

export default async function OrderReviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();

  // Fetch order
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .single();

  if (orderError || !order) {
    redirect("/order");
  }

  // Fetch order files
  const { data: files } = await supabase
    .from("order_files")
    .select("*")
    .eq("order_id", id);

  const orderData = order as Order;
  const orderFiles = (files || []) as OrderFile[];

  // Calculate pricing
  const priceBreakdown = getPriceBreakdown(orderData.pages, orderData.urgency);

  // Update order with calculated price if not already set
  if (!orderData.price_cents) {
    await supabase
      .from("orders")
      .update({ price_cents: priceBreakdown.totalPrice })
      .eq("id", id);
  }

  const finalPrice = orderData.price_cents || priceBreakdown.totalPrice;

  // Get language labels
  const sourceLanguageLabel =
    LANGUAGES.find((l) => l.value === orderData.source_language)?.label ||
    orderData.source_language;
  const targetLanguageLabel =
    LANGUAGES.find((l) => l.value === orderData.target_language)?.label ||
    orderData.target_language;

  // Get document type label
  const documentTypeLabel =
    DOCUMENT_TYPES.find((d) => d.value === orderData.document_type)?.label ||
    orderData.document_type;

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <h1 className="text-3xl font-bold text-primary mb-2">
            Review Your Order
          </h1>
          <p className="text-gray-600 mb-8">
            Please review your order details before proceeding to checkout.
          </p>

          {/* Order Details */}
          <div className="space-y-6 mb-8">
            <div className="bg-background p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-primary mb-4">
                Order Details
              </h2>

              <dl className="space-y-3">
                <div className="flex justify-between">
                  <dt className="text-gray-600">Order ID:</dt>
                  <dd className="font-mono text-sm text-gray-900">{orderData.id}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Source Language:</dt>
                  <dd className="font-medium text-gray-900">{sourceLanguageLabel}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Target Language:</dt>
                  <dd className="font-medium text-gray-900">{targetLanguageLabel}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Document Type:</dt>
                  <dd className="font-medium text-gray-900">{documentTypeLabel}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Turnaround Time:</dt>
                  <dd className="font-medium text-gray-900">
                    {orderData.urgency === "rush" ? (
                      <span className="text-accent">Rush (12-24 hours)</span>
                    ) : (
                      "Standard (24-48 hours)"
                    )}
                  </dd>
                </div>
                {orderData.notes && (
                  <div className="pt-3 border-t border-gray-200">
                    <dt className="text-gray-600 mb-2">Additional Notes:</dt>
                    <dd className="text-gray-900 text-sm bg-white p-3 rounded border border-gray-200">
                      {orderData.notes}
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Uploaded Files */}
            {orderFiles.length > 0 && (
              <div className="bg-background p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-primary mb-4">
                  Uploaded Document
                </h2>
                {orderFiles.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between bg-white p-4 rounded border border-gray-200"
                  >
                    <div className="flex items-center gap-3">
                      <svg
                        className="w-8 h-8 text-accent"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg>
                      <div>
                        <p className="font-medium text-gray-900">{file.file_name}</p>
                        <p className="text-sm text-gray-500">
                          {(file.file_size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Price Breakdown */}
            <div className="bg-accent/5 border-2 border-accent/20 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-primary mb-4">
                Price Breakdown
              </h2>

              <dl className="space-y-3">
                <div className="flex justify-between">
                  <dt className="text-gray-600">
                    Base Price ({orderData.pages} page{orderData.pages > 1 ? "s" : ""}):
                  </dt>
                  <dd className="font-medium text-gray-900">
                    {formatPrice(priceBreakdown.basePrice)}
                  </dd>
                </div>
                {orderData.urgency === "rush" && (
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Rush Fee (+50%):</dt>
                    <dd className="font-medium text-accent">
                      +{formatPrice(priceBreakdown.rushFee)}
                    </dd>
                  </div>
                )}
                <div className="border-t border-accent/20 pt-3 flex justify-between items-center">
                  <dt className="text-lg font-semibold text-primary">Total:</dt>
                  <dd className="text-2xl font-bold text-accent">
                    {formatPrice(finalPrice)}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Checkout Button */}
          <CheckoutButton orderId={orderData.id} />

          <div className="mt-6 text-center">
            <a href="/order" className="text-accent hover:underline text-sm">
              ← Back to Order Form
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
