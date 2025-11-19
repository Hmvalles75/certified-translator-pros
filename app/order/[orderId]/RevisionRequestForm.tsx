"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

interface RevisionRequestFormProps {
  orderId: string;
}

export default function RevisionRequestForm({
  orderId,
}: RevisionRequestFormProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!message.trim()) {
      setError("Please describe what needs to be corrected");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/customer/request-revision", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, message: message.trim() }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to submit revision request");
      }

      // Success - refresh page
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="text-accent hover:underline font-medium text-sm"
      >
        Request a Revision
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded text-red-800 text-sm">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          What needs to be corrected?
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
          placeholder="Please describe the specific changes or corrections needed..."
          disabled={isLoading}
        />
        <p className="text-xs text-gray-500 mt-1">
          Be as specific as possible to help the translator make the correct changes.
        </p>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-accent text-white px-6 py-2 rounded-lg font-semibold hover:bg-accent/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Submitting..." : "Submit Revision Request"}
        </button>
        <button
          type="button"
          onClick={() => {
            setIsOpen(false);
            setMessage("");
            setError(null);
          }}
          className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
