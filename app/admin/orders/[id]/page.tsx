import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/admin";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { formatPrice } from "@/lib/pricing";
import { LANGUAGES, DOCUMENT_TYPES } from "@/lib/constants";
import type { Order, OrderFile, Translator } from "@/lib/types/database";
import AssignTranslatorForm from "./AssignTranslatorForm";
import OrderStatusActions from "./OrderStatusActions";
import AdminControls from "./AdminControls";

export default async function AdminOrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  await requireAdmin();

  const supabase = await createServerSupabaseClient();

  // Fetch order
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .single();

  if (orderError || !order) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">Order Not Found</h1>
          <a href="/admin/orders" className="text-accent hover:underline">
            ← Back to Orders
          </a>
        </div>
      </div>
    );
  }

  const orderData = order as Order;

  // Fetch order files
  const { data: files } = await supabase
    .from("order_files")
    .select("*")
    .eq("order_id", id);

  const orderFiles = (files || []) as OrderFile[];

  // Fetch available translators
  const { data: translators } = await supabase
    .from("translators")
    .select("*")
    .eq("is_active", true);

  const availableTranslators = (translators || []) as Translator[];

  // Fetch assigned translator if exists
  let assignedTranslator: Translator | null = null;
  if (orderData.translator_id) {
    const { data: translator } = await supabase
      .from("translators")
      .select("*")
      .eq("id", orderData.translator_id)
      .single();

    assignedTranslator = translator as Translator;
  }

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
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <a
            href="/admin/orders"
            className="text-accent hover:underline inline-flex items-center gap-2"
          >
            ← Back to All Orders
          </a>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-primary mb-2">
                Order Management
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
                    : orderData.status === "completed"
                    ? "bg-purple-100 text-purple-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {orderData.status.replace(/_/g, " ").toUpperCase()}
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Order Details */}
            <div className="bg-background p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-primary mb-4">
                Order Details
              </h2>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="text-gray-600 mb-1">Source Language:</dt>
                  <dd className="font-medium text-gray-900">{sourceLanguageLabel}</dd>
                </div>
                <div>
                  <dt className="text-gray-600 mb-1">Target Language:</dt>
                  <dd className="font-medium text-gray-900">{targetLanguageLabel}</dd>
                </div>
                <div>
                  <dt className="text-gray-600 mb-1">Document Type:</dt>
                  <dd className="font-medium text-gray-900">{documentTypeLabel}</dd>
                </div>
                <div>
                  <dt className="text-gray-600 mb-1">Urgency:</dt>
                  <dd className="font-medium text-gray-900">
                    {orderData.urgency === "rush" ? (
                      <span className="text-accent">Rush (12-24 hours)</span>
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
                {orderData.notes && (
                  <div>
                    <dt className="text-gray-600 mb-1">Customer Notes:</dt>
                    <dd className="text-gray-900 bg-white p-3 rounded border border-gray-200 text-sm">
                      {orderData.notes}
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Assignment Section */}
            <div className="bg-background p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-primary mb-4">
                Translator Assignment
              </h2>

              {assignedTranslator ? (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-green-900">
                        Assigned Translator
                      </p>
                      <p className="text-lg font-bold text-green-800 mt-1">
                        {assignedTranslator.name}
                      </p>
                      <p className="text-sm text-green-700">
                        {assignedTranslator.email}
                      </p>
                    </div>
                    <svg
                      className="w-6 h-6 text-green-600"
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
                  <div className="mt-3 text-sm text-green-700">
                    <p className="font-medium">Languages:</p>
                    <p>{assignedTranslator.languages.join(", ")}</p>
                  </div>
                </div>
              ) : (
                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-yellow-800 font-medium">
                    No translator assigned yet
                  </p>
                  <p className="text-sm text-yellow-700 mt-1">
                    Select a translator from the list below to assign this order.
                  </p>
                </div>
              )}

              <AssignTranslatorForm
                orderId={orderData.id}
                currentTranslatorId={orderData.translator_id}
                translators={availableTranslators}
              />
            </div>
          </div>

          {/* Status Actions */}
          <div className="mb-8">
            <OrderStatusActions
              orderId={orderData.id}
              currentStatus={orderData.status}
            />
          </div>

          {/* Admin Controls */}
          <div className="mb-8">
            <AdminControls
              orderId={orderData.id}
              currentStatus={orderData.status}
              needsRevision={orderData.needs_revision || false}
              adminNote={orderData.admin_note}
            />
          </div>

          {/* Uploaded Files */}
          {orderFiles.length > 0 && (
            <div className="bg-background p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-primary mb-4">
                Uploaded Documents
              </h2>
              <div className="space-y-3">
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
                    <button className="text-accent hover:underline text-sm font-medium">
                      Download
                    </button>
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
