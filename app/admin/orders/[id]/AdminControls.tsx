"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

interface AdminControlsProps {
  orderId: string;
  currentStatus: string;
  needsRevision: boolean;
  adminNote: string | null;
}

export default function AdminControls({
  orderId,
  currentStatus,
  needsRevision,
  adminNote,
}: AdminControlsProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [note, setNote] = useState(adminNote || "");
  const [file, setFile] = useState<File | null>(null);

  const handleMarkDelivered = async () => {
    if (!confirm("Mark this order as delivered without a file? This is for admin override only.")) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/orders/mark-delivered", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to mark as delivered");
      }

      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkCompleted = async () => {
    if (!confirm("Mark this order as completed?")) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/orders/mark-completed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to mark as completed");
      }

      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearRevision = async () => {
    if (!confirm("Clear the revision request for this order?")) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/orders/clear-revision", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to clear revision");
      }

      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveNote = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/orders/update-note", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, note }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to save note");
      }

      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUploadFile = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("orderId", orderId);

      const response = await fetch("/api/admin/orders/upload-translation", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to upload file");
      }

      setFile(null);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-background p-6 rounded-lg space-y-6">
      <h2 className="text-xl font-semibold text-primary">Admin Controls</h2>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded text-red-800 text-sm">
          {error}
        </div>
      )}

      {/* Quick Actions */}
      <div className="space-y-3">
        <h3 className="font-medium text-gray-700">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <button
            onClick={handleMarkDelivered}
            disabled={isLoading || currentStatus === "delivered"}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            Mark as Delivered
          </button>
          <button
            onClick={handleMarkCompleted}
            disabled={isLoading}
            className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            Mark as Completed
          </button>
        </div>
        {needsRevision && (
          <button
            onClick={handleClearRevision}
            disabled={isLoading}
            className="w-full bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-yellow-700 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            Clear Revision Request
          </button>
        )}
      </div>

      {/* Upload Translation (Admin Override) */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="font-medium text-gray-700 mb-3">
          Upload Translation (Admin Override)
        </h3>
        <form onSubmit={handleUploadFile} className="space-y-3">
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
            disabled={isLoading}
          />
          {file && (
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-accent text-white px-4 py-2 rounded-lg font-medium hover:bg-accent/90 transition disabled:opacity-50 text-sm"
            >
              {isLoading ? "Uploading..." : "Upload File"}
            </button>
          )}
        </form>
      </div>

      {/* Admin Note */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="font-medium text-gray-700 mb-3">
          Internal Admin Note
        </h3>
        <form onSubmit={handleSaveNote} className="space-y-3">
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="Add internal notes visible only to admins..."
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-accent text-white px-4 py-2 rounded-lg font-medium hover:bg-accent/90 transition disabled:opacity-50 text-sm"
          >
            {isLoading ? "Saving..." : "Save Note"}
          </button>
        </form>
      </div>
    </div>
  );
}
