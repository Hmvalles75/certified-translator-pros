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
                {translatorData.full_name}
              </h1>
              <p className="text-gray-600">{translatorData.email}</p>
            </div>
            <div>
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  translatorData.status === "active"
                    ? "bg-green-100 text-green-800"
                    : translatorData.status === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {translatorData.status.charAt(0).toUpperCase() + translatorData.status.slice(1)}
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
                  <dt className="text-gray-600 mb-1">Country:</dt>
                  <dd className="font-medium text-gray-900">
                    {translatorData.country || "Not provided"}
                  </dd>
                </div>
                <div>
                  <dt className="text-gray-600 mb-1">Time Zone:</dt>
                  <dd className="font-medium text-gray-900">
                    {translatorData.time_zone}
                  </dd>
                </div>
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
                  <dt className="text-gray-600 mb-1">Rate per Page:</dt>
                  <dd className="font-semibold text-gray-900 text-lg">
                    ${translatorData.rate_per_page.toFixed(2)}
                  </dd>
                </div>
                <div>
                  <dt className="text-gray-600 mb-1">Max Pages per Day:</dt>
                  <dd className="font-medium text-gray-900">
                    {translatorData.max_pages_per_day}
                  </dd>
                </div>
                <div>
                  <dt className="text-gray-600 mb-1">Can Handle Rush Orders:</dt>
                  <dd className="font-medium text-gray-900">
                    {translatorData.can_rush ? "Yes" : "No"}
                  </dd>
                </div>
                <div>
                  <dt className="text-gray-600 mb-1">Can Notarize:</dt>
                  <dd className="font-medium text-gray-900">
                    {translatorData.can_notarize ? "Yes" : "No"}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

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
