import { requireAdmin } from "@/lib/auth/admin";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Lead, Translator } from "@/lib/types/database";
import Link from "next/link";
import MarkHandledButton from "./MarkHandledButton";

export default async function AdminLeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  await requireAdmin();

  const supabase = await createServerSupabaseClient();

  // Fetch lead with translator info
  const { data: lead, error } = await supabase
    .from("leads")
    .select("*, translators(*)")
    .eq("id", id)
    .single();

  if (error || !lead) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">
            Lead Not Found
          </h1>
          <Link href="/admin/leads" className="text-accent hover:underline">
            ← Back to Leads
          </Link>
        </div>
      </div>
    );
  }

  const leadData = lead as Lead & { translators?: Translator | null };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            href="/admin/leads"
            className="text-accent hover:underline inline-flex items-center gap-2"
          >
            ← Back to All Leads
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-primary mb-2">
                Lead Details
              </h1>
              <p className="text-gray-600">
                Submitted on {new Date(leadData.created_at).toLocaleString()}
              </p>
            </div>
            <div>
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  leadData.is_handled
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {leadData.is_handled ? "Handled" : "Pending"}
              </span>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-background p-6 rounded-lg mb-6">
            <h2 className="text-xl font-semibold text-primary mb-4">
              Contact Information
            </h2>
            <dl className="space-y-3">
              <div>
                <dt className="text-sm text-gray-600 mb-1">Name:</dt>
                <dd className="font-medium text-gray-900 text-lg">
                  {leadData.name}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-gray-600 mb-1">Email:</dt>
                <dd className="font-medium text-gray-900">
                  <a
                    href={`mailto:${leadData.email}`}
                    className="text-accent hover:underline"
                  >
                    {leadData.email}
                  </a>
                </dd>
              </div>
              {leadData.phone && (
                <div>
                  <dt className="text-sm text-gray-600 mb-1">Phone:</dt>
                  <dd className="font-medium text-gray-900">
                    <a
                      href={`tel:${leadData.phone}`}
                      className="text-accent hover:underline"
                    >
                      {leadData.phone}
                    </a>
                  </dd>
                </div>
              )}
              {leadData.city && (
                <div>
                  <dt className="text-sm text-gray-600 mb-1">City:</dt>
                  <dd className="font-medium text-gray-900">{leadData.city}</dd>
                </div>
              )}
            </dl>
          </div>

          {/* Related Translator */}
          {leadData.translators && (
            <div className="bg-background p-6 rounded-lg mb-6">
              <h2 className="text-xl font-semibold text-primary mb-4">
                Related Translator
              </h2>
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-lg text-gray-900">
                    {leadData.translators.full_name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {leadData.translators.email}
                  </p>
                  {leadData.translators.country && (
                    <p className="text-sm text-gray-600 mt-1">
                      {leadData.translators.country}
                    </p>
                  )}
                </div>
                <Link
                  href={`/admin/translators/${leadData.translators.id}`}
                  className="text-accent hover:underline text-sm font-medium"
                >
                  View Profile →
                </Link>
              </div>
            </div>
          )}

          {/* Message */}
          {leadData.message && (
            <div className="bg-background p-6 rounded-lg mb-6">
              <h2 className="text-xl font-semibold text-primary mb-4">
                Message
              </h2>
              <p className="text-gray-700 whitespace-pre-wrap bg-white p-4 rounded border border-gray-200">
                {leadData.message}
              </p>
            </div>
          )}

          {/* Handled Info */}
          {leadData.is_handled && leadData.handled_at && (
            <div className="bg-green-50 p-6 rounded-lg mb-6 border border-green-200">
              <h2 className="text-lg font-semibold text-green-800 mb-2">
                Handled
              </h2>
              <p className="text-sm text-green-700">
                Marked as handled on{" "}
                {new Date(leadData.handled_at).toLocaleString()}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="bg-background p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-primary mb-4">Actions</h2>
            <MarkHandledButton
              leadId={leadData.id}
              isHandled={leadData.is_handled}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
