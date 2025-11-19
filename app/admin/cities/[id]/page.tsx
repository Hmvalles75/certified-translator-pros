import { requireAdmin } from "@/lib/auth/admin";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { City, Translator } from "@/lib/types/database";
import Link from "next/link";
import EditCityForm from "./EditCityForm";

export default async function AdminCityEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  await requireAdmin();

  const supabase = await createServerSupabaseClient();

  // Fetch city
  const { data: city, error } = await supabase
    .from("cities")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !city) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">
            City Not Found
          </h1>
          <Link href="/admin/cities" className="text-accent hover:underline">
            ← Back to Cities
          </Link>
        </div>
      </div>
    );
  }

  const cityData = city as City;

  // Fetch translators in this city
  const { data: translators } = await supabase
    .from("translators")
    .select("*")
    .eq("city", cityData.name)
    .eq("is_active", true)
    .order("name", { ascending: true });

  const cityTranslators = (translators || []) as Translator[];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            href="/admin/cities"
            className="text-accent hover:underline inline-flex items-center gap-2"
          >
            ← Back to All Cities
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <h1 className="text-3xl font-bold text-primary mb-2">
            {cityData.name}
          </h1>
          <p className="text-gray-600 mb-6">
            {cityData.state}, {cityData.country}
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Edit Form */}
            <div className="bg-background p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-primary mb-4">
                Edit City
              </h2>
              <EditCityForm city={cityData} />
            </div>

            {/* Stats */}
            <div className="bg-background p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-primary mb-4">
                Statistics
              </h2>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm text-gray-600 mb-1">Total Translators:</dt>
                  <dd className="text-3xl font-bold text-accent">
                    {cityData.translator_count}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-600 mb-1">Slug:</dt>
                  <dd className="font-medium text-gray-900">
                    /{cityData.slug}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-600 mb-1">Created:</dt>
                  <dd className="text-sm text-gray-700">
                    {new Date(cityData.created_at).toLocaleDateString()}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Translators in this city */}
          {cityTranslators.length > 0 && (
            <div className="bg-background p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-primary mb-4">
                Translators in {cityData.name}
              </h2>
              <div className="space-y-3">
                {cityTranslators.map((translator) => (
                  <div
                    key={translator.id}
                    className="flex items-center justify-between bg-white p-4 rounded border border-gray-200"
                  >
                    <div>
                      <p className="font-medium text-gray-900">
                        {translator.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {translator.languages.slice(0, 3).join(", ")}
                      </p>
                    </div>
                    <Link
                      href={`/admin/translators/${translator.id}`}
                      className="text-accent hover:underline text-sm font-medium"
                    >
                      View Profile →
                    </Link>
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
