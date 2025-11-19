import { requireTranslator } from "@/lib/auth/translator";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Order } from "@/lib/types/database";
import Link from "next/link";
import { LANGUAGES, DOCUMENT_TYPES } from "@/lib/constants";

export default async function TranslatorAssignmentsPage() {
  const { translator } = await requireTranslator();

  const supabase = await createServerSupabaseClient();

  // Fetch all orders assigned to this translator
  const { data: orders } = await supabase
    .from("orders")
    .select("*")
    .eq("translator_id", translator.id)
    .in("status", ["assigned", "in_progress", "delivered", "revision_requested"])
    .order("created_at", { ascending: false });

  const allOrders = (orders || []) as Order[];

  // Separate by status
  const assignedOrders = allOrders.filter((o) => o.status === "assigned");
  const inProgressOrders = allOrders.filter((o) => o.status === "in_progress");
  const revisionOrders = allOrders.filter(
    (o) => o.status === "revision_requested"
  );
  const deliveredOrders = allOrders.filter((o) => o.status === "delivered");

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">
            My Assignments
          </h1>
          <p className="text-gray-600">
            Manage your translation orders and upload completed work
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <p className="text-sm text-gray-600 mb-1">New Assignments</p>
            <p className="text-3xl font-bold text-blue-600">
              {assignedOrders.length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
            <p className="text-sm text-gray-600 mb-1">In Progress</p>
            <p className="text-3xl font-bold text-yellow-600">
              {inProgressOrders.length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
            <p className="text-sm text-gray-600 mb-1">Needs Revision</p>
            <p className="text-3xl font-bold text-red-600">
              {revisionOrders.length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
            <p className="text-sm text-gray-600 mb-1">Delivered</p>
            <p className="text-3xl font-bold text-green-600">
              {deliveredOrders.length}
            </p>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">
                    Order ID
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">
                    Languages
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">
                    Document Type
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">
                    Pages
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">
                    Urgency
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">
                    Created
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {allOrders.length === 0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="text-center py-12 text-gray-500"
                    >
                      <div className="flex flex-col items-center">
                        <svg
                          className="w-16 h-16 text-gray-300 mb-4"
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
                        <p className="text-lg font-medium">
                          No assignments yet
                        </p>
                        <p className="text-sm mt-1">
                          Orders will appear here when assigned to you
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  allOrders.map((order) => {
                    const sourceLanguage =
                      LANGUAGES.find((l) => l.value === order.source_language)
                        ?.label || order.source_language;
                    const targetLanguage =
                      LANGUAGES.find((l) => l.value === order.target_language)
                        ?.label || order.target_language;
                    const documentType =
                      DOCUMENT_TYPES.find((d) => d.value === order.document_type)
                        ?.label || order.document_type;

                    return (
                      <tr
                        key={order.id}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-4 px-6">
                          <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                            {order.id.slice(0, 8)}
                          </code>
                        </td>
                        <td className="py-4 px-6 text-sm">
                          <div className="flex items-center gap-2">
                            <span>{sourceLanguage}</span>
                            <svg
                              className="w-4 h-4 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                            <span>{targetLanguage}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-600">
                          {documentType}
                        </td>
                        <td className="py-4 px-6 text-sm font-medium">
                          {order.pages}
                        </td>
                        <td className="py-4 px-6">
                          {order.urgency === "rush" ? (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">
                              🔥 Rush
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                              Standard
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-6">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                              order.status === "assigned"
                                ? "bg-blue-100 text-blue-800"
                                : order.status === "in_progress"
                                ? "bg-yellow-100 text-yellow-800"
                                : order.status === "revision_requested"
                                ? "bg-red-100 text-red-800"
                                : order.status === "delivered"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {order.status === "revision_requested"
                              ? "Needs Revision"
                              : order.status
                                  .replace(/_/g, " ")
                                  .replace(/\b\w/g, (l) => l.toUpperCase())}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-600">
                          {new Date(order.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-6">
                          <Link
                            href={`/dashboard/translator/assignments/${order.id}`}
                            className="text-accent hover:underline font-medium text-sm"
                          >
                            Open →
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
