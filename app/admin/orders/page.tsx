import Link from "next/link";
import { requireAdmin } from "@/lib/auth/admin";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Order } from "@/lib/types/database";
import { LANGUAGES, DOCUMENT_TYPES } from "@/lib/constants";
import AdminNav from "@/components/admin/AdminNav";

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  await requireAdmin();
  const params = await searchParams;
  const statusFilter = params.status;

  const supabase = await createServerSupabaseClient();

  let query = supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (statusFilter && statusFilter !== "all") {
    query = query.eq("status", statusFilter);
  }

  const { data: orders, error } = await query;

  const ordersList = (orders || []) as Order[];

  const statuses = [
    { value: "all", label: "All Orders" },
    { value: "pending_review", label: "Pending Review" },
    { value: "paid", label: "Paid" },
    { value: "assigned", label: "Assigned" },
    { value: "in_progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <AdminNav />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-2">
              Manage Orders
            </h1>
            <p className="text-gray-600">View and manage all translation orders</p>
          </div>
          <Link
            href="/admin"
            className="text-accent hover:underline inline-flex items-center gap-2"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {/* Status Filter */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {statuses.map((status) => (
              <Link
                key={status.value}
                href={`/admin/orders${status.value !== "all" ? `?status=${status.value}` : ""}`}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  (statusFilter === status.value || (!statusFilter && status.value === "all"))
                    ? "bg-accent text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {status.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Order ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Languages
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Document
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Created
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {ordersList.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                      No orders found
                    </td>
                  </tr>
                ) : (
                  ordersList.map((order) => {
                    const sourceLang = LANGUAGES.find((l) => l.value === order.source_language)?.label || order.source_language;
                    const targetLang = LANGUAGES.find((l) => l.value === order.target_language)?.label || order.target_language;
                    const docType = DOCUMENT_TYPES.find((d) => d.value === order.document_type)?.label || order.document_type;

                    return (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-mono text-gray-900">
                          {order.id.slice(0, 8)}...
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {sourceLang} → {targetLang}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {docType}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                              order.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : order.status === "paid"
                                ? "bg-yellow-100 text-yellow-800"
                                : order.status === "assigned"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {order.status.replace(/_/g, " ")}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {new Date(order.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3">
                          <Link
                            href={`/admin/orders/${order.id}`}
                            className="text-accent hover:underline text-sm font-medium"
                          >
                            View
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

        {error && (
          <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            Error loading orders: {error.message}
          </div>
        )}
      </div>
    </div>
  );
}
