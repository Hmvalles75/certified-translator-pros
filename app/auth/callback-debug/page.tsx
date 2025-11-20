"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

function CallbackDebugContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("Processing...");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const redirectTo = searchParams.get("redirectTo") || "/admin/orders";
    const supabase = createClient();

    setStatus("Processing authentication...");

    // Check if user is already authenticated
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        setError(error.message);
        setStatus("Error getting session");
        return;
      }

      if (session) {
        setStatus("Already authenticated! Redirecting...");
        setTimeout(() => {
          window.location.href = redirectTo;
        }, 500);
      } else {
        setStatus("Waiting for authentication...");
        setError("No active session found. Please try logging in again.");
      }
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        setStatus("Successfully signed in! Redirecting...");
        setTimeout(() => {
          window.location.href = redirectTo;
        }, 500);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [searchParams, router]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-primary mb-6">
          Authentication Callback
        </h1>

        <div className="mb-4">
          <p className="text-gray-700 mb-2">
            <strong>Status:</strong> {status}
          </p>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">
                <strong>Error:</strong> {error}
              </p>
            </div>
          )}
        </div>

        <div className="text-sm text-gray-600">
          <p>If you're not redirected automatically:</p>
          <a
            href="/admin/orders"
            className="text-accent hover:underline"
          >
            Go to Admin Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}

export default function CallbackDebugPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-700">Loading authentication...</p>
        </div>
      </div>
    }>
      <CallbackDebugContent />
    </Suspense>
  );
}
