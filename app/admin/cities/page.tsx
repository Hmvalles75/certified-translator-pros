import { requireAdmin } from "@/lib/auth/admin";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { City } from "@/lib/types/database";
import Link from "next/link";
import AddCityForm from "./AddCityForm";
import AdminNav from "@/components/admin/AdminNav";

export default async function AdminCitiesPage() {
  await requireAdmin();

  const supabase = await createServerSupabaseClient();

  // Fetch all cities
  const { data: cities } = await supabase
    .from("cities")
    .select("*")
    .order("name", { ascending: true });

  const allCities = (cities || []) as City[];

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

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Add City Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h2 className="text-2xl font-bold text-primary mb-4">
                Add New City
              </h2>
              <AddCityForm />
            </div>
          </div>

          {/* Cities List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
              <h1 className="text-3xl font-bold text-primary mb-6">
                Manage Cities
              </h1>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        City
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        State
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Country
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Translators
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {allCities.length === 0 ? (
                      <tr>
                        <td
                          colSpan={5}
                          className="text-center py-8 text-gray-500"
                        >
                          No cities found. Add one using the form.
                        </td>
                      </tr>
                    ) : (
                      allCities.map((city) => (
                        <tr
                          key={city.id}
                          className="border-b border-gray-100 hover:bg-gray-50"
                        >
                          <td className="py-4 px-4">
                            <div className="font-medium text-gray-900">
                              {city.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              /{city.slug}
                            </div>
                          </td>
                          <td className="py-4 px-4 text-sm text-gray-600">
                            {city.state}
                          </td>
                          <td className="py-4 px-4 text-sm text-gray-600">
                            {city.country}
                          </td>
                          <td className="py-4 px-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-accent/10 text-accent">
                              {city.translator_count}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <Link
                              href={`/admin/cities/${city.id}`}
                              className="text-accent hover:underline text-sm font-medium"
                            >
                              Edit →
                            </Link>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 text-sm text-gray-600">
                Total: {allCities.length} city/cities
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
