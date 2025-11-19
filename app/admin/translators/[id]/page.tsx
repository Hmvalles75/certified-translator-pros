import { requireAdmin } from "@/lib/auth/admin";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Translator } from "@/lib/types/database";
import Link from "next/link";
import TranslatorEditForm from "./TranslatorEditForm";
import { redirect } from "next/navigation";

export default async function AdminTranslatorDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  await requireAdmin();

  const supabase = await createServerSupabaseClient();

  // Fetch translator
  const { data: translator, error } = await supabase
    .from("translators")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !translator) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">
            Translator Not Found
          </h1>
          <Link
            href="/admin/translators"
            className="text-accent hover:underline"
          >
            ← Back to Translators
          </Link>
        </div>
      </div>
    );
  }

  const translatorData = translator as Translator;

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            href="/admin/translators"
            className="text-accent hover:underline inline-flex items-center gap-2"
          >
            ← Back to All Translators
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-primary mb-2">
                {translatorData.name}
              </h1>
              <p className="text-gray-600">{translatorData.email}</p>
            </div>
            <div>
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  translatorData.is_public
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {translatorData.is_public ? "Public Profile" : "Private Profile"}
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Translator Info */}
            <div className="bg-background p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-primary mb-4">
                Contact Information
              </h2>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="text-gray-600 mb-1">Phone:</dt>
                  <dd className="font-medium text-gray-900">
                    {translatorData.phone || "Not provided"}
                  </dd>
                </div>
                <div>
                  <dt className="text-gray-600 mb-1">Location:</dt>
                  <dd className="font-medium text-gray-900">
                    {translatorData.city && translatorData.state
                      ? `${translatorData.city}, ${translatorData.state}`
                      : translatorData.city || "Not provided"}
                  </dd>
                </div>
                <div>
                  <dt className="text-gray-600 mb-1">Country:</dt>
                  <dd className="font-medium text-gray-900">
                    {translatorData.country}
                  </dd>
                </div>
                {translatorData.website && (
                  <div>
                    <dt className="text-gray-600 mb-1">Website:</dt>
                    <dd className="font-medium text-gray-900">
                      <a
                        href={translatorData.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:underline"
                      >
                        {translatorData.website}
                      </a>
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Professional Info */}
            <div className="bg-background p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-primary mb-4">
                Professional Details
              </h2>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="text-gray-600 mb-1">Languages:</dt>
                  <dd className="font-medium text-gray-900">
                    {translatorData.languages.join(", ")}
                  </dd>
                </div>
                <div>
                  <dt className="text-gray-600 mb-1">Specializations:</dt>
                  <dd className="font-medium text-gray-900">
                    {translatorData.specializations.length > 0
                      ? translatorData.specializations.join(", ")
                      : "None specified"}
                  </dd>
                </div>
                <div>
                  <dt className="text-gray-600 mb-1">Services:</dt>
                  <dd className="font-medium text-gray-900">
                    {translatorData.services.length > 0
                      ? translatorData.services.join(", ")
                      : "None specified"}
                  </dd>
                </div>
                <div>
                  <dt className="text-gray-600 mb-1">Price per Page:</dt>
                  <dd className="font-semibold text-gray-900 text-lg">
                    {translatorData.price_per_page
                      ? `$${(translatorData.price_per_page / 100).toFixed(2)}`
                      : "Not set"}
                  </dd>
                </div>
                <div>
                  <dt className="text-gray-600 mb-1">Hourly Rate:</dt>
                  <dd className="font-semibold text-gray-900 text-lg">
                    {translatorData.hourly_rate
                      ? `$${(translatorData.hourly_rate / 100).toFixed(2)}`
                      : "Not set"}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Certifications */}
          {translatorData.certifications.length > 0 && (
            <div className="bg-background p-6 rounded-lg mb-8">
              <h2 className="text-xl font-semibold text-primary mb-4">
                Certifications
              </h2>
              <ul className="list-disc list-inside space-y-2">
                {translatorData.certifications.map((cert, index) => (
                  <li key={index} className="text-gray-700">
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Bio */}
          {translatorData.bio && (
            <div className="bg-background p-6 rounded-lg mb-8">
              <h2 className="text-xl font-semibold text-primary mb-4">Bio</h2>
              <p className="text-gray-700 whitespace-pre-wrap">
                {translatorData.bio}
              </p>
            </div>
          )}

          {/* Edit Form */}
          <div className="bg-background p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-primary mb-4">
              Edit Translator
            </h2>
            <TranslatorEditForm translator={translatorData} />
          </div>
        </div>
      </div>
    </div>
  );
}
