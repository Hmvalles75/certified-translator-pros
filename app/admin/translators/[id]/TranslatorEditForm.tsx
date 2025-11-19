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
    price_per_page: translator.price_per_page
      ? (translator.price_per_page / 100).toString()
      : "",
    hourly_rate: translator.hourly_rate
      ? (translator.hourly_rate / 100).toString()
      : "",
    is_public: translator.is_public,
    is_active: translator.is_active,
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
          price_per_page: formData.price_per_page
            ? Math.round(parseFloat(formData.price_per_page) * 100)
            : null,
          hourly_rate: formData.hourly_rate
            ? Math.round(parseFloat(formData.hourly_rate) * 100)
            : null,
          is_public: formData.is_public,
          is_active: formData.is_active,
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
            Price per Page (USD)
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={formData.price_per_page}
            onChange={(e) =>
              setFormData({ ...formData, price_per_page: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="29.00"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hourly Rate (USD)
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={formData.hourly_rate}
            onChange={(e) =>
              setFormData({ ...formData, hourly_rate: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="50.00"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.is_public}
            onChange={(e) =>
              setFormData({ ...formData, is_public: e.target.checked })
            }
            className="w-5 h-5 text-accent border-gray-300 rounded focus:ring-accent"
          />
          <span className="text-sm font-medium text-gray-700">
            Public Profile (visible on website)
          </span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.is_active}
            onChange={(e) =>
              setFormData({ ...formData, is_active: e.target.checked })
            }
            className="w-5 h-5 text-accent border-gray-300 rounded focus:ring-accent"
          />
          <span className="text-sm font-medium text-gray-700">
            Active (can be assigned orders)
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
