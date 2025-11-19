import { requireAdmin } from "@/lib/auth/admin";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Lead, Translator } from "@/lib/types/database";
import Link from "next/link";
import AdminNav from "@/components/admin/AdminNav";

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  await requireAdmin();
  const params = await searchParams;

  const supabase = await createServerSupabaseClient();

  // Build query with filters
  let query = supabase
    .from("leads")
    .select("*, translators(name)")
    .order("created_at", { ascending: false });

  if (params.status === "handled") {
    query = query.eq("is_handled", true);
  } else if (params.status === "pending") {
    query = query.eq("is_handled", false);
  }

  const { data: leads } = await query;
  const allLeads = (leads || []) as (Lead & {
    translators?: { name: string } | null;
  })[];

  const pendingCount = allLeads.filter((l) => !l.is_handled).length;
  const handledCount = allLeads.filter((l) => l.is_handled).length;

  return (
    <div className="min-h-screen bg-background">
      <AdminNav />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link
            href="/admin"
            className="text-accent hover:underline inline-flex items-center gap-2"
          >
            ← Back to Dashboard
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-primary">Manage Leads</h1>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-background p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Total Leads</p>
              <p className="text-2xl font-bold text-primary">
                {allLeads.length}
              </p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-sm text-yellow-700 mb-1">Pending</p>
              <p className="text-2xl font-bold text-yellow-800">
                {pendingCount}
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-700 mb-1">Handled</p>
              <p className="text-2xl font-bold text-green-800">
                {handledCount}
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="mb-6 flex gap-2">
            <Link
              href="/admin/leads"
              className={`px-4 py-2 rounded-lg font-medium transition ${
                !params.status
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All Leads
            </Link>
            <Link
              href="/admin/leads?status=pending"
              className={`px-4 py-2 rounded-lg font-medium transition ${
                params.status === "pending"
                  ? "bg-yellow-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Pending
            </Link>
            <Link
              href="/admin/leads?status=handled"
              className={`px-4 py-2 rounded-lg font-medium transition ${
                params.status === "handled"
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Handled
            </Link>
          </div>

          {/* Leads Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Name
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Email
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Phone
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Translator
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    City
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Date
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {allLeads.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-8 text-gray-500">
                      No leads found
                    </td>
                  </tr>
                ) : (
                  allLeads.map((lead) => (
                    <tr
                      key={lead.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-4 px-4">
                        <div className="font-medium text-gray-900">
                          {lead.name}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {lead.email}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {lead.phone || "N/A"}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {lead.translators?.name || "N/A"}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {lead.city || "N/A"}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {new Date(lead.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            lead.is_handled
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {lead.is_handled ? "Handled" : "Pending"}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <Link
                          href={`/admin/leads/${lead.id}`}
                          className="text-accent hover:underline text-sm font-medium"
                        >
                          View Details →
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
