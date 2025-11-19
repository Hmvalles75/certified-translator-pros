"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { OrderStatus } from "@/lib/types/database";

interface OrderStatusActionsProps {
  orderId: string;
  currentStatus: OrderStatus;
}

export default function OrderStatusActions({
  orderId,
  currentStatus,
}: OrderStatusActionsProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateStatus = async (newStatus: OrderStatus) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/orders/update-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status: newStatus }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to update status");
      }

      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-background p-6 rounded-lg">
      <h2 className="text-xl font-semibold text-primary mb-4">
        Order Status Actions
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-800 text-sm">
          {error}
        </div>
      )}

      <div className="space-y-3">
        {currentStatus === "paid" && (
          <p className="text-sm text-gray-600 mb-4">
            Assign a translator to move this order to the next stage.
          </p>
        )}

        {currentStatus === "assigned" && (
          <button
            onClick={() => updateStatus("in_progress")}
            disabled={isLoading}
            className="w-full bg-yellow-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-yellow-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Updating..." : "Mark as In Progress"}
          </button>
        )}

        {currentStatus === "in_progress" && (
          <button
            onClick={() => updateStatus("completed")}
            disabled={isLoading}
            className="w-full bg-purple-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Updating..." : "Mark as Completed"}
          </button>
        )}

        {currentStatus === "completed" && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 font-medium flex items-center gap-2">
              <svg
                className="w-5 h-5"
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
              This order has been completed
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
