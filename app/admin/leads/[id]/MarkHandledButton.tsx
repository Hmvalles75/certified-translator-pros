"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface MarkHandledButtonProps {
  leadId: string;
  isHandled: boolean;
}

export default function MarkHandledButton({
  leadId,
  isHandled,
}: MarkHandledButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleToggle = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/leads/mark-handled", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId, isHandled: !isHandled }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to update lead");
      }

      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-800 text-sm">
          {error}
        </div>
      )}

      <button
        onClick={handleToggle}
        disabled={isLoading}
        className={`px-6 py-3 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed ${
          isHandled
            ? "bg-yellow-600 text-white hover:bg-yellow-700"
            : "bg-green-600 text-white hover:bg-green-700"
        }`}
      >
        {isLoading
          ? "Updating..."
          : isHandled
          ? "Mark as Pending"
          : "Mark as Handled"}
      </button>
    </div>
  );
}
