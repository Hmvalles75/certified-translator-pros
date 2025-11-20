"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { Translator } from "@/lib/types/database";

interface TranslatorEditFormProps {
  translator: Translator;
}

export default function TranslatorEditForm({
  translator,
}: TranslatorEditFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    rate_per_page: translator.rate_per_page.toString(),
    status: translator.status,
    can_rush: translator.can_rush,
    can_notarize: translator.can_notarize,
    max_pages_per_day: translator.max_pages_per_day.toString(),
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("/api/admin/translators/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          translatorId: translator.id,
          rate_per_page: parseFloat(formData.rate_per_page),
          status: formData.status,
          can_rush: formData.can_rush,
          can_notarize: formData.can_notarize,
          max_pages_per_day: parseInt(formData.max_pages_per_day),
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to update translator");
      }

      setSuccess(true);
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

      {success && (
        <div className="p-3 bg-green-50 border border-green-200 rounded text-green-800 text-sm">
          Translator updated successfully!
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rate per Page (USD)
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={formData.rate_per_page}
            onChange={(e) =>
              setFormData({ ...formData, rate_per_page: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="29.00"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max Pages per Day
          </label>
          <input
            type="number"
            min="1"
            value={formData.max_pages_per_day}
            onChange={(e) =>
              setFormData({ ...formData, max_pages_per_day: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="10"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Status
        </label>
        <select
          value={formData.status}
          onChange={(e) =>
            setFormData({ ...formData, status: e.target.value as "pending" | "active" | "inactive" })
          }
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
        >
          <option value="pending">Pending</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.can_rush}
            onChange={(e) =>
              setFormData({ ...formData, can_rush: e.target.checked })
            }
            className="w-5 h-5 text-accent border-gray-300 rounded focus:ring-accent"
          />
          <span className="text-sm font-medium text-gray-700">
            Can handle rush orders
          </span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.can_notarize}
            onChange={(e) =>
              setFormData({ ...formData, can_notarize: e.target.checked })
            }
            className="w-5 h-5 text-accent border-gray-300 rounded focus:ring-accent"
          />
          <span className="text-sm font-medium text-gray-700">
            Can notarize documents
          </span>
        </label>
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>

        <button
          type="button"
          onClick={() => router.push("/admin/translators")}
          className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
