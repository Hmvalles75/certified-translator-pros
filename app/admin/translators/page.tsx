import { requireAdmin } from "@/lib/auth/admin";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import Link from "next/link";
import AdminNav from "@/components/admin/AdminNav";

interface Translator {
  id: string;
  full_name: string;
  email: string;
  languages: string[];
  rate_per_page: number;
  can_rush: boolean;
  can_notarize: boolean;
  time_zone: string;
  max_pages_per_day: number;
  status: string;
  created_at: string;
}

export default async function AdminTranslatorsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  await requireAdmin();
  const params = await searchParams;

  const supabase = await createServerSupabaseClient();

  // Build query with filters
  let query = supabase.from("translators").select("*").order("created_at", { ascending: false });

  if (params.status) {
    query = query.eq("status", params.status);
  }

  const { data: translators } = await query;
  const allTranslators = (translators || []) as Translator[];

  const statuses = [
    { value: "pending", label: "Pending", color: "bg-yellow-100 text-yellow-800" },
    { value: "active", label: "Active", color: "bg-green-100 text-green-800" },
    { value: "inactive", label: "Inactive", color: "bg-gray-100 text-gray-800" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <AdminNav />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link
            href="/admin/orders"
            className="text-accent hover:underline inline-flex items-center gap-2"
          >
            ← Back to Orders
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-primary">
              Manage Translators
            </h1>
            <Link
              href="/translators/apply"
              className="bg-accent text-white px-4 py-2 rounded-lg font-semibold hover:bg-accent/90 transition"
            >
              + Add Translator
            </Link>
          </div>

          {/* Filters */}
          <div className="mb-6 flex flex-wrap gap-2">
            <Link
              href="/admin/translators"
              className={`px-4 py-2 rounded-lg font-medium transition ${
                !params.status
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All
            </Link>
            <Link
              href="/admin/translators?status=pending"
              className={`px-4 py-2 rounded-lg font-medium transition ${
                params.status === "pending"
                  ? "bg-yellow-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Pending
            </Link>
            <Link
              href="/admin/translators?status=active"
              className={`px-4 py-2 rounded-lg font-medium transition ${
                params.status === "active"
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Active
            </Link>
            <Link
              href="/admin/translators?status=inactive"
              className={`px-4 py-2 rounded-lg font-medium transition ${
                params.status === "inactive"
                  ? "bg-gray-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Inactive
            </Link>
          </div>

          {/* Translators Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Translator
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Languages
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Rate
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Capacity
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
                {allTranslators.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-gray-500">
                      No translators found
                    </td>
                  </tr>
                ) : (
                  allTranslators.map((translator) => (
                    <tr
                      key={translator.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-4 px-4">
                        <div>
                          <div className="font-medium text-gray-900">
                            {translator.full_name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {translator.email}
                          </div>
                          {translator.time_zone && (
                            <div className="text-xs text-gray-400">
                              {translator.time_zone}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex flex-wrap gap-1">
                          {translator.languages.slice(0, 2).map((lang: string) => (
                            <span
                              key={lang}
                              className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded"
                            >
                              {lang}
                            </span>
                          ))}
                          {translator.languages.length > 2 && (
                            <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                              +{translator.languages.length - 2}
                            </span>
                          )}
                        </div>
                        <div className="flex gap-2 mt-1">
                          {translator.can_rush && (
                            <span className="text-xs text-orange-600">⚡ Rush</span>
                          )}
                          {translator.can_notarize && (
                            <span className="text-xs text-purple-600">📋 Notary</span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-900">
                        ${translator.rate_per_page}/page
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-900">
                        {translator.max_pages_per_day} pages/day
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            statuses.find((s) => s.value === translator.status)
                              ?.color || "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {translator.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <Link
                          href={`/admin/translators/${translator.id}`}
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

          <div className="mt-6 text-sm text-gray-600">
            Total: {allTranslators.length} translator(s)
          </div>
        </div>
      </div>
    </div>
  );
}
