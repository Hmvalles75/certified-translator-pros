"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  LANGUAGES,
  DOCUMENT_TYPES,
  URGENCY_OPTIONS,
  ALLOWED_FILE_TYPES,
  MAX_FILE_SIZE,
} from "@/lib/constants";
import type { DocumentType, Urgency } from "@/lib/types/database";

export const dynamic = "force-dynamic";

export default function OrderPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [sourceLanguage, setSourceLanguage] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("");
  const [documentType, setDocumentType] = useState<DocumentType | "">("");
  const [urgency, setUrgency] = useState<Urgency>("standard");
  const [notes, setNotes] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Validate file type
    if (!ALLOWED_FILE_TYPES.includes(selectedFile.type)) {
      setError("Please upload a PDF, JPG, or PNG file");
      setFile(null);
      return;
    }

    // Validate file size
    if (selectedFile.size > MAX_FILE_SIZE) {
      setError("File size must be less than 10MB");
      setFile(null);
      return;
    }

    setError(null);
    setFile(selectedFile);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();

    try {
      // Validate form
      if (!file) {
        throw new Error("Please upload a file");
      }
      if (!sourceLanguage || !targetLanguage) {
        throw new Error("Please select both source and target languages");
      }
      if (!documentType) {
        throw new Error("Please select a document type");
      }

      // Check authentication
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login?redirect=/order");
        return;
      }

      // Create order record
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          customer_id: user.id,
          status: "pending_review",
          source_language: sourceLanguage,
          target_language: targetLanguage,
          document_type: documentType,
          urgency,
          notes: notes || null,
          pages: 1, // Default for MVP
          price_cents: null,
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Upload file to Supabase Storage
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `orders/${order.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("order_files")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Create order_files record
      const { error: fileRecordError } = await supabase
        .from("order_files")
        .insert({
          order_id: order.id,
          file_name: file.name,
          file_path: filePath,
          file_size: file.size,
          mime_type: file.type,
        });

      if (fileRecordError) throw fileRecordError;

      // Redirect to review page
      router.push(`/order/review/${order.id}`);
    } catch (err: any) {
      console.error("Order submission error:", err);
      setError(err.message || "Failed to create order");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <h1 className="text-3xl font-bold text-primary mb-2">
            Order a Certified Translation
          </h1>
          <p className="text-gray-600 mb-8">
            Upload your document and provide details to get started.
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* File Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Upload Document *
              </label>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-600 file:mr-4 file:py-3 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-white hover:file:bg-accent/90 file:cursor-pointer cursor-pointer border border-gray-300 rounded-lg"
                required
              />
              {file && (
                <p className="mt-2 text-sm text-gray-600">
                  Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Accepted formats: PDF, JPG, PNG (max 10MB)
              </p>
            </div>

            {/* Source Language */}
            <div>
              <label
                htmlFor="sourceLanguage"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Source Language *
              </label>
              <select
                id="sourceLanguage"
                value={sourceLanguage}
                onChange={(e) => setSourceLanguage(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none"
                required
              >
                <option value="">Select source language</option>
                {LANGUAGES.map((lang) => (
                  <option key={lang.value} value={lang.value}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Target Language */}
            <div>
              <label
                htmlFor="targetLanguage"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Target Language *
              </label>
              <select
                id="targetLanguage"
                value={targetLanguage}
                onChange={(e) => setTargetLanguage(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none"
                required
              >
                <option value="">Select target language</option>
                {LANGUAGES.map((lang) => (
                  <option key={lang.value} value={lang.value}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Document Type */}
            <div>
              <label
                htmlFor="documentType"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Document Type *
              </label>
              <select
                id="documentType"
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value as DocumentType)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none"
                required
              >
                <option value="">Select document type</option>
                {DOCUMENT_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Urgency */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Turnaround Time *
              </label>
              <div className="space-y-3">
                {URGENCY_OPTIONS.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <input
                      type="radio"
                      name="urgency"
                      value={option.value}
                      checked={urgency === option.value}
                      onChange={(e) => setUrgency(e.target.value as Urgency)}
                      className="w-4 h-4 text-accent focus:ring-accent"
                    />
                    <div className="ml-3 flex-1">
                      <div className="font-medium text-gray-900">{option.label}</div>
                      <div className="text-sm text-gray-600">{option.price}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label
                htmlFor="notes"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Additional Notes (Optional)
              </label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                placeholder="Any special instructions or context for the translator..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-accent text-white py-4 rounded-lg font-semibold hover:bg-accent/90 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Processing..." : "Continue to Review"}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <a href="/" className="text-accent hover:underline text-sm">
              ← Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
