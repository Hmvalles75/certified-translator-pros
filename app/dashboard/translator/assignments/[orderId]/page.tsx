import { requireTranslator } from "@/lib/auth/translator";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getSignedDownloadUrl } from "@/lib/storage";
import type { Order, OrderFile } from "@/lib/types/database";
import { LANGUAGES, DOCUMENT_TYPES } from "@/lib/constants";
import { formatPrice } from "@/lib/pricing";
import Link from "next/link";
import { redirect } from "next/navigation";
import StartWorkButton from "./StartWorkButton";
import UploadTranslationForm from "./UploadTranslationForm";

export default async function TranslatorOrderDetailPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;
  const { translator } = await requireTranslator();

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
          <Link
            href="/dashboard/translator/assignments"
            className="text-accent hover:underline"
          >
            ← Back to Assignments
          </Link>
        </div>
      </div>
    );
  }

  const orderData = order as Order;

  // Verify this order is assigned to current translator
  if (orderData.translator_id !== translator.id) {
    redirect("/dashboard/translator/assignments");
  }

  // Fetch order files
  const { data: files } = await supabase
    .from("order_files")
    .select("*")
    .eq("order_id", orderId);

  const orderFiles = (files || []) as OrderFile[];

  // Generate signed URLs for original files
  const filesWithUrls = await Promise.all(
    orderFiles.map(async (file) => {
      const signedUrl = await getSignedDownloadUrl("order_files", file.file_path);
      return { ...file, signedUrl };
    })
  );

  // Get customer info
  const { data: customer } = await supabase
    .from("auth.users")
    .select("email")
    .eq("id", orderData.customer_id)
    .single();

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
            href="/dashboard/translator/assignments"
            className="text-accent hover:underline inline-flex items-center gap-2"
          >
            ← Back to All Assignments
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-primary mb-2">
                Translation Order
              </h1>
              <p className="text-gray-600">Order ID: {orderData.id}</p>
            </div>
            <div>
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  orderData.status === "assigned"
                    ? "bg-blue-100 text-blue-800"
                    : orderData.status === "in_progress"
                    ? "bg-yellow-100 text-yellow-800"
                    : orderData.status === "revision_requested"
                    ? "bg-red-100 text-red-800"
                    : orderData.status === "delivered"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {orderData.status === "revision_requested"
                  ? "Needs Revision"
                  : orderData.status
                      .replace(/_/g, " ")
                      .replace(/\b\w/g, (l) => l.toUpperCase())}
              </span>
            </div>
          </div>

          {/* Revision Alert */}
          {orderData.needs_revision && orderData.revision_message && (
            <div className="mb-8 p-6 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
              <div className="flex items-start gap-3">
                <svg
                  className="w-6 h-6 text-red-600 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-red-900 mb-2">
                    Revision Requested
                  </h3>
                  <p className="text-sm text-red-800 mb-1">
                    <strong>Customer feedback:</strong>
                  </p>
                  <p className="text-red-700 bg-white p-3 rounded border border-red-200">
                    {orderData.revision_message}
                  </p>
                  {orderData.revision_submitted_at && (
                    <p className="text-xs text-red-600 mt-2">
                      Requested on:{" "}
                      {new Date(
                        orderData.revision_submitted_at
                      ).toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
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
                    {orderData.urgency === "rush" ? (
                      <span className="text-red-600 font-semibold">
                        🔥 Rush (12-24 hours)
                      </span>
                    ) : (
                      "Standard (24-48 hours)"
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="text-gray-600 mb-1">Pages:</dt>
                  <dd className="font-medium text-gray-900">{orderData.pages}</dd>
                </div>
                <div>
                  <dt className="text-gray-600 mb-1">Price:</dt>
                  <dd className="font-semibold text-gray-900 text-lg">
                    {formatPrice(orderData.price_cents || 0)}
                  </dd>
                </div>
                <div>
                  <dt className="text-gray-600 mb-1">Customer Email:</dt>
                  <dd className="font-medium text-gray-900 text-sm">
                    {customer?.email || "N/A"}
                  </dd>
                </div>
                <div>
                  <dt className="text-gray-600 mb-1">Order Date:</dt>
                  <dd className="text-gray-900 text-sm">
                    {new Date(orderData.created_at).toLocaleString()}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Status & Actions */}
            <div className="bg-background p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-primary mb-4">
                Actions
              </h2>

              {orderData.status === "assigned" && (
                <StartWorkButton orderId={orderData.id} />
              )}

              {(orderData.status === "in_progress" ||
                orderData.status === "revision_requested") && (
                <UploadTranslationForm
                  orderId={orderData.id}
                  isRevision={orderData.status === "revision_requested"}
                />
              )}

              {orderData.status === "delivered" && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 font-medium flex items-center gap-2">
                    <svg
                      className="w-5 h-5"
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
                    Translation delivered successfully
                  </p>
                  {orderData.delivered_at && (
                    <p className="text-sm text-green-700 mt-2">
                      Delivered on:{" "}
                      {new Date(orderData.delivered_at).toLocaleString()}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Customer Notes */}
          {orderData.notes && (
            <div className="bg-background p-6 rounded-lg mb-8">
              <h2 className="text-xl font-semibold text-primary mb-4">
                Customer Notes
              </h2>
              <p className="text-gray-900 bg-white p-4 rounded border border-gray-200">
                {orderData.notes}
              </p>
            </div>
          )}

          {/* Admin Note */}
          {orderData.admin_note && (
            <div className="bg-blue-50 p-6 rounded-lg mb-8 border-l-4 border-blue-500">
              <h2 className="text-lg font-semibold text-blue-900 mb-3">
                Admin Note
              </h2>
              <p className="text-blue-800 bg-white p-4 rounded border border-blue-200">
                {orderData.admin_note}
              </p>
            </div>
          )}

          {/* Original Documents */}
          {filesWithUrls.length > 0 && (
            <div className="bg-background p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-primary mb-4">
                Original Documents to Translate
              </h2>
              <div className="space-y-3">
                {filesWithUrls.map((file) => (
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
                        <p className="font-medium text-gray-900">
                          {file.file_name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {(file.file_size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    {file.signedUrl ? (
                      <a
                        href={file.signedUrl}
                        download
                        className="text-accent hover:underline text-sm font-medium"
                      >
                        Download →
                      </a>
                    ) : (
                      <span className="text-sm text-gray-400">
                        URL unavailable
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
