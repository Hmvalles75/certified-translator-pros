import { requireAdmin } from "@/lib/auth/admin";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Translator } from "@/lib/types/database";
import Link from "next/link";
import AdminNav from "@/components/admin/AdminNav";

export default async function AdminTranslatorsPage({
  searchParams,
}: {
  searchParams: Promise<{ city?: string; status?: string }>;
}) {
  await requireAdmin();
  const params = await searchParams;

  const supabase = await createServerSupabaseClient();

  // Build query with filters
  let query = supabase.from("translators").select("*").order("created_at", { ascending: false });

  if (params.city) {
    query = query.eq("city", params.city);
  }

  if (params.status === "public") {
    query = query.eq("is_public", true);
  } else if (params.status === "private") {
    query = query.eq("is_public", false);
  }

  const { data: translators } = await query;
  const allTranslators = (translators || []) as Translator[];

  // Get unique cities for filter
  const { data: citiesData } = await supabase
    .from("translators")
    .select("city")
    .not("city", "is", null);

  const uniqueCities = Array.from(
    new Set((citiesData || []).map((t) => t.city).filter(Boolean))
  ).sort();

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
            <h1 className="text-3xl font-bold text-primary">
              Manage Translators
            </h1>
            <Link
              href="/admin/translators/new"
              className="bg-accent text-white px-4 py-2 rounded-lg font-semibold hover:bg-accent/90 transition"
            >
              + Add Translator
            </Link>
          </div>

          {/* Filters */}
          <div className="mb-6 flex flex-wrap gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by City:
              </label>
              <select
                className="border border-gray-300 rounded-lg px-4 py-2"
                value={params.city || ""}
                onChange={(e) => {
                  const url = new URL(window.location.href);
                  if (e.target.value) {
                    url.searchParams.set("city", e.target.value);
                  } else {
                    url.searchParams.delete("city");
                  }
                  window.location.href = url.toString();
                }}
              >
                <option value="">All Cities</option>
                {uniqueCities.map((city) => (
                  <option key={city} value={city as string}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Status:
              </label>
              <div className="flex gap-2">
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
                  href="/admin/translators?status=public"
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    params.status === "public"
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Public
                </Link>
                <Link
                  href="/admin/translators?status=private"
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    params.status === "private"
                      ? "bg-gray-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Private
                </Link>
              </div>
            </div>
          </div>

          {/* Translators Table */}
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
                    City
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Languages
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
                        <div className="font-medium text-gray-900">
                          {translator.name}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {translator.email}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {translator.city || "N/A"}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {translator.languages.slice(0, 2).join(", ")}
                        {translator.languages.length > 2 && "..."}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            translator.is_public
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {translator.is_public ? "Public" : "Private"}
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
