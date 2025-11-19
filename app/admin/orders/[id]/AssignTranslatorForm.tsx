"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Translator } from "@/lib/types/database";

interface AssignTranslatorFormProps {
  orderId: string;
  currentTranslatorId: string | null;
  translators: Translator[];
}

export default function AssignTranslatorForm({
  orderId,
  currentTranslatorId,
  translators,
}: AssignTranslatorFormProps) {
  const router = useRouter();
  const [selectedTranslatorId, setSelectedTranslatorId] = useState(
    currentTranslatorId || ""
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleAssign = async () => {
    if (!selectedTranslatorId) {
      setError("Please select a translator");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("/api/admin/assign-translator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order_id: orderId,
          translator_id: selectedTranslatorId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to assign translator");
      }

      setSuccess("Translator assigned successfully!");
      setTimeout(() => {
        router.refresh();
      }, 1000);
    } catch (err: any) {
      console.error("Assignment error:", err);
      setError(err.message || "Failed to assign translator");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4 text-sm">
          {success}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label
            htmlFor="translator"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Select Translator
          </label>
          <select
            id="translator"
            value={selectedTranslatorId}
            onChange={(e) => setSelectedTranslatorId(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none bg-white"
            disabled={loading}
          >
            <option value="">Choose a translator...</option>
            {translators.map((translator) => (
              <option key={translator.id} value={translator.id}>
                {translator.name} - {translator.languages.join(", ")}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleAssign}
          disabled={loading || !selectedTranslatorId}
          className="w-full bg-accent text-white py-3 rounded-lg font-semibold hover:bg-accent/90 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Assigning..." : "Assign Translator"}
        </button>
      </div>

      {translators.length === 0 && (
        <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">
          No active translators available. Please add translators to the system first.
        </div>
      )}
    </div>
  );
}
