import { createServerSupabaseClient, getUser } from "@/lib/supabase/server";
import { getSignedDownloadUrl } from "@/lib/storage";
import type { Order, OrderFile } from "@/lib/types/database";
import { LANGUAGES, DOCUMENT_TYPES } from "@/lib/constants";
import { formatPrice } from "@/lib/pricing";
import Link from "next/link";
import { redirect } from "next/navigation";
import DownloadTranslationButton from "./DownloadTranslationButton";
import RevisionRequestForm from "./RevisionRequestForm";

export default async function CustomerOrderViewPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;
  const user = await getUser();

  if (!user) {
    redirect(`/login?redirect=/order/${orderId}`);
  }

  const supabase = await createServerSupabaseClient();

  // Fetch order
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .select("*")
    .eq("id", orderId)
    .single();

  if (orderError || !order) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">
            Order Not Found
          </h1>
          <Link href="/" className="text-accent hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const orderData = order as Order;

  // Verify this order belongs to current user
  if (orderData.customer_id !== user.id) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600 mb-4">
            You don't have permission to view this order.
          </p>
          <Link href="/" className="text-accent hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // Fetch order files
  const { data: files } = await supabase
    .from("order_files")
    .select("*")
    .eq("order_id", orderId);

  const orderFiles = (files || []) as OrderFile[];

  // Get signed URL for translated file if available
  let translatedFileUrl: string | null = null;
  if (orderData.translated_file_url) {
    translatedFileUrl = await getSignedDownloadUrl(
      "completed_translations",
      orderData.translated_file_url,
      3600 // 1 hour
    );
  }

  // Get language and document type labels
  const sourceLanguageLabel =
    LANGUAGES.find((l) => l.value === orderData.source_language)?.label ||
    orderData.source_language;
  const targetLanguageLabel =
    LANGUAGES.find((l) => l.value === orderData.target_language)?.label ||
    orderData.target_language;
  const documentTypeLabel =
    DOCUMENT_TYPES.find((d) => d.value === orderData.document_type)?.label ||
    orderData.document_type;

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            href="/"
            className="text-accent hover:underline inline-flex items-center gap-2"
          >
            ← Back to Home
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-primary mb-2">
                Your Translation Order
              </h1>
              <p className="text-gray-600">Order ID: {orderData.id}</p>
            </div>
            <div>
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  orderData.status === "paid"
                    ? "bg-green-100 text-green-800"
                    : orderData.status === "assigned"
                    ? "bg-blue-100 text-blue-800"
                    : orderData.status === "in_progress"
                    ? "bg-yellow-100 text-yellow-800"
                    : orderData.status === "delivered"
                    ? "bg-purple-100 text-purple-800"
                    : orderData.status === "revision_requested"
                    ? "bg-red-100 text-red-800"
                    : orderData.status === "completed"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {orderData.status
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase())}
              </span>
            </div>
          </div>

          {/* Status Messages */}
          {orderData.status === "paid" && (
            <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
              <p className="text-blue-900 font-medium">
                ✓ Payment successful!
              </p>
              <p className="text-sm text-blue-700 mt-1">
                Your order has been received. We're assigning a translator now.
              </p>
            </div>
          )}

          {orderData.status === "assigned" && (
            <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
              <p className="text-blue-900 font-medium">
                ✓ Translator assigned!
              </p>
              <p className="text-sm text-blue-700 mt-1">
                A certified translator has been assigned to your order and will start working soon.
              </p>
            </div>
          )}

          {orderData.status === "in_progress" && (
            <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded-r-lg">
              <p className="text-yellow-900 font-medium">
                🔄 Translation in progress
              </p>
              <p className="text-sm text-yellow-700 mt-1">
                Your translator is currently working on your document.
              </p>
            </div>
          )}

          {orderData.status === "delivered" && !orderData.customer_viewed_at && (
            <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg">
              <p className="text-green-900 font-medium text-lg">
                ✓ Your translation is ready!
              </p>
              <p className="text-sm text-green-700 mt-1">
                Download your certified translation below.
              </p>
            </div>
          )}

          {orderData.status === "revision_requested" && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
              <p className="text-red-900 font-medium">
                Revision requested
              </p>
              <p className="text-sm text-red-700 mt-1">
                Your translator is working on the requested corrections.
              </p>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Order Details */}
            <div className="bg-background p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-primary mb-4">
                Order Details
              </h2>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="text-gray-600 mb-1">Source Language:</dt>
                  <dd className="font-medium text-gray-900">
                    {sourceLanguageLabel}
                  </dd>
                </div>
                <div>
                  <dt className="text-gray-600 mb-1">Target Language:</dt>
                  <dd className="font-medium text-gray-900">
                    {targetLanguageLabel}
                  </dd>
                </div>
                <div>
                  <dt className="text-gray-600 mb-1">Document Type:</dt>
                  <dd className="font-medium text-gray-900">
                    {documentTypeLabel}
                  </dd>
                </div>
                <div>
                  <dt className="text-gray-600 mb-1">Urgency:</dt>
                  <dd className="font-medium text-gray-900">
                    {orderData.urgency === "rush"
                      ? "Rush (12-24 hours)"
                      : "Standard (24-48 hours)"}
                  </dd>
                </div>
                <div>
                  <dt className="text-gray-600 mb-1">Pages:</dt>
                  <dd className="font-medium text-gray-900">{orderData.pages}</dd>
                </div>
                <div>
                  <dt className="text-gray-600 mb-1">Total Paid:</dt>
                  <dd className="font-semibold text-gray-900 text-lg">
                    {formatPrice(orderData.price_cents || 0)}
                  </dd>
                </div>
                <div>
                  <dt className="text-gray-600 mb-1">Order Date:</dt>
                  <dd className="text-gray-900">
                    {new Date(orderData.created_at).toLocaleDateString()}
                  </dd>
                </div>
                {orderData.delivered_at && (
                  <div>
                    <dt className="text-gray-600 mb-1">Delivered:</dt>
                    <dd className="text-gray-900">
                      {new Date(orderData.delivered_at).toLocaleString()}
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Original Files */}
            <div className="bg-background p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-primary mb-4">
                Your Uploaded Documents
              </h2>
              {orderFiles.length > 0 ? (
                <div className="space-y-3">
                  {orderFiles.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center gap-3 bg-white p-3 rounded border border-gray-200"
                    >
                      <svg
                        className="w-6 h-6 text-accent flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {file.file_name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {(file.file_size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No files uploaded</p>
              )}
            </div>
          </div>

          {/* Download Completed Translation */}
          {orderData.status === "delivered" && translatedFileUrl && (
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border-2 border-green-200 mb-8">
              <h2 className="text-2xl font-semibold text-primary mb-4 flex items-center gap-2">
                <svg
                  className="w-7 h-7 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Your Certified Translation
              </h2>
              <p className="text-gray-700 mb-4">
                Your certified translation is ready for download. This is an official translation
                with the translator's certification and seal.
              </p>
              <DownloadTranslationButton
                orderId={orderData.id}
                downloadUrl={translatedFileUrl}
              />
            </div>
          )}

          {/* Revision Request */}
          {orderData.status === "delivered" && !orderData.needs_revision && (
            <div className="bg-background p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-primary mb-4">
                Need Changes?
              </h2>
              <p className="text-gray-600 mb-4 text-sm">
                If you notice any errors or need corrections to the translation, you can request a revision.
              </p>
              <RevisionRequestForm orderId={orderData.id} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
