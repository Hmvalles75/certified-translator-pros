"use client";

import { useState } from "react";

interface DownloadTranslationButtonProps {
  orderId: string;
  downloadUrl: string;
}

export default function DownloadTranslationButton({
  orderId,
  downloadUrl,
}: DownloadTranslationButtonProps) {
  const [hasDownloaded, setHasDownloaded] = useState(false);

  const handleDownload = async () => {
    // Track customer viewed
    try {
      await fetch("/api/customer/mark-viewed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });
    } catch (error) {
      console.error("Error marking order as viewed:", error);
    }

    // Trigger download
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = `certified-translation-${orderId.slice(0, 8)}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setHasDownloaded(true);
  };

  return (
    <div>
      <button
        onClick={handleDownload}
        className="w-full md:w-auto bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center gap-3 text-lg"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
          />
        </svg>
        Download Certified Translation (PDF)
      </button>
      {hasDownloaded && (
        <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          Download started!
        </p>
      )}
    </div>
  );
}
