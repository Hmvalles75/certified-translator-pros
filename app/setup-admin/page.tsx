"use client";

import { useState } from "react";

export default function SetupAdminPage() {
  const [email, setEmail] = useState("hmvalles75@yahoo.com");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSetAdmin = async () => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/debug/set-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error: any) {
      setResult({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-primary mb-6">
          Setup Admin User
        </h1>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <button
          onClick={handleSetAdmin}
          disabled={loading}
          className="w-full px-6 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition-all disabled:opacity-50"
        >
          {loading ? "Setting..." : "Set as Admin"}
        </button>

        {result && (
          <div className={`mt-6 p-4 rounded-lg ${result.error ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
            <pre className="text-sm overflow-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}

        <div className="mt-6 text-sm text-gray-600">
          <p className="mb-2">
            <strong>Note:</strong> This page is for initial setup only.
          </p>
          <p>
            After setting admin role, go to{" "}
            <a href="/admin/login" className="text-accent hover:underline">
              /admin/login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
