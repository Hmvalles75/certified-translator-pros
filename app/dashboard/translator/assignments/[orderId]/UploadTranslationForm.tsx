"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

interface UploadTranslationFormProps {
  orderId: string;
  isRevision?: boolean;
}

export default function UploadTranslationForm({
  orderId,
  isRevision = false,
}: UploadTranslationFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!file) {
      setError("Please select a file to upload");
      setIsLoading(false);
      return;
    }

    // Validate file type (PDF only for certified translations)
    if (file.type !== "application/pdf") {
      setError("Only PDF files are accepted for certified translations");
      setIsLoading(false);
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10MB");
      setIsLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("orderId", orderId);
      formData.append("isRevision", isRevision.toString());

      const response = await fetch("/api/translator/upload-translation", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to upload translation");
      }

      // Success - refresh page
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded text-red-800 text-sm">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {isRevision
            ? "Upload Corrected Translation (PDF)"
            : "Upload Completed Certified Translation (PDF)"}
        </label>
        <input
          type="file"
          accept=".pdf,application/pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
          disabled={isLoading}
        />
        <p className="text-xs text-gray-500 mt-1">
          PDF only, max 10MB. Must be a certified translation with official seal/stamp.
        </p>
      </div>

      {file && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded text-sm">
          <p className="text-blue-900 font-medium">Selected file:</p>
          <p className="text-blue-700">
            {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading || !file}
        className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Uploading...
          </>
        ) : (
          <>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            {isRevision
              ? "Upload Corrected Translation"
              : "Upload & Mark as Delivered"}
          </>
        )}
      </button>

      <p className="text-xs text-gray-500 text-center">
        {isRevision
          ? "This will update the translation and clear the revision request"
          : "Customer will be notified and can download the translation"}
      </p>
    </form>
  );
}
