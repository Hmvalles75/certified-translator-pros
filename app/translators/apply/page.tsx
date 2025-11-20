"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const LANGUAGE_PAIRS = [
  "Spanish → English",
  "English → Spanish",
  "French → English",
  "English → French",
  "German → English",
  "English → German",
  "Portuguese → English",
  "English → Portuguese",
  "Italian → English",
  "English → Italian",
  "Chinese → English",
  "English → Chinese",
  "Japanese → English",
  "English → Japanese",
  "Korean → English",
  "English → Korean",
  "Arabic → English",
  "English → Arabic",
  "Russian → English",
  "English → Russian",
];

export default function TranslatorApplicationPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    country: "",
    time_zone: "America/New_York",
    languages: [] as string[],
    rate_per_page: "",
    max_pages_per_day: "10",
    can_rush: false,
    can_notarize: false,
    bio: "",
  });

  const handleLanguageToggle = (lang: string) => {
    setFormData((prev) => ({
      ...prev,
      languages: prev.languages.includes(lang)
        ? prev.languages.filter((l) => l !== lang)
        : [...prev.languages, lang],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (formData.languages.length === 0) {
        throw new Error("Please select at least one language pair");
      }

      const response = await fetch("/api/translators/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit application");
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <div className="text-center">
            <svg
              className="w-16 h-16 text-green-500 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <h1 className="text-2xl font-bold text-primary mb-2">
              Application Submitted!
            </h1>
            <p className="text-gray-600 mb-6">
              Thank you for your interest in joining our translation team. We'll
              review your application and get back to you within 2-3 business
              days.
            </p>
            <button
              onClick={() => router.push("/")}
              className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-all"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-primary mb-2">
            Join Our Translation Team
          </h1>
          <p className="text-gray-600 mb-8">
            Apply to become a certified translator and work with us on
            high-quality translation projects.
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Personal Information */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-primary mb-4">
                Personal Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.full_name}
                    onChange={(e) =>
                      setFormData({ ...formData, full_name: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.country}
                    onChange={(e) =>
                      setFormData({ ...formData, country: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time Zone *
                </label>
                <select
                  required
                  value={formData.time_zone}
                  onChange={(e) =>
                    setFormData({ ...formData, time_zone: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="America/New_York">Eastern Time (ET)</option>
                  <option value="America/Chicago">Central Time (CT)</option>
                  <option value="America/Denver">Mountain Time (MT)</option>
                  <option value="America/Los_Angeles">Pacific Time (PT)</option>
                  <option value="Europe/London">London (GMT)</option>
                  <option value="Europe/Paris">Central European Time</option>
                  <option value="Asia/Tokyo">Tokyo</option>
                  <option value="Australia/Sydney">Sydney</option>
                </select>
              </div>
            </div>

            {/* Language Pairs */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-primary mb-4">
                Language Pairs *
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Select all language pairs you can translate:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {LANGUAGE_PAIRS.map((lang) => (
                  <label
                    key={lang}
                    className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <input
                      type="checkbox"
                      checked={formData.languages.includes(lang)}
                      onChange={() => handleLanguageToggle(lang)}
                      className="mr-3"
                    />
                    <span className="text-sm">{lang}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Rates & Availability */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-primary mb-4">
                Rates & Availability
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rate Per Page (USD) *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={formData.rate_per_page}
                    onChange={(e) =>
                      setFormData({ ...formData, rate_per_page: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="15.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Pages Per Day *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.max_pages_per_day}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        max_pages_per_day: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.can_rush}
                    onChange={(e) =>
                      setFormData({ ...formData, can_rush: e.target.checked })
                    }
                    className="mr-3"
                  />
                  <span className="text-sm">
                    I can accept rush orders (24-hour turnaround)
                  </span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.can_notarize}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        can_notarize: e.target.checked,
                      })
                    }
                    className="mr-3"
                  />
                  <span className="text-sm">
                    I am a certified notary and can notarize documents
                  </span>
                </label>
              </div>
            </div>

            {/* Bio */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Professional Bio *
              </label>
              <p className="text-sm text-gray-600 mb-2">
                Tell us about your translation experience, certifications, and
                specializations.
              </p>
              <textarea
                required
                rows={6}
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="I have 5 years of experience in legal and medical translation..."
              />
            </div>

            {/* Submit */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => router.push("/")}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition-all disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
