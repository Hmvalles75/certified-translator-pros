"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import Link from "next/link";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  source_language: string;
  target_language: string;
  page_count: number;
  turnaround: string;
  price_cents: number;
  status: string;
  created_at: string;
  notes: string | null;
  completed_file_url: string | null;
}

export default function AssignedOrdersPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadingOrderId, setUploadingOrderId] = useState<string | null>(null);
  const [completingOrderId, setCompletingOrderId] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    checkUser();
    fetchOrders();
  }, []);

  async function checkUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      router.push("/auth/login");
    } else {
      setUser(user);
    }
  }

  async function fetchOrders() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("assigned_to", user.id)
        .in("status", ["in_progress", "completed"])
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching orders:", error);
        setError("Failed to load orders");
      } else {
        setOrders(data as Order[]);
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to load orders");
    } finally {
      setLoading(false);
    }
  }

  async function handleFileUpload(orderId: string, file: File) {
    if (!file) return;

    if (file.type !== "application/pdf") {
      setError("Only PDF files are allowed");
      return;
    }

    setUploadingOrderId(orderId);
    setError("");

    try {
      const formData = new FormData();
      formData.append("orderId", orderId);
      formData.append("file", file);

      const response = await fetch("/api/orders/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Upload failed");
      }

      // Refresh orders list
      await fetchOrders();
    } catch (err: any) {
      console.error("Upload error:", err);
      setError(err.message || "Failed to upload file");
    } finally {
      setUploadingOrderId(null);
    }
  }

  async function handleCompleteOrder(orderId: string) {
    if (!confirm("Are you sure you want to mark this order as completed?")) {
      return;
    }

    setCompletingOrderId(orderId);
    setError("");

    try {
      const response = await fetch("/api/orders/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to complete order");
      }

      // Refresh orders list
      await fetchOrders();
    } catch (err: any) {
      console.error("Complete error:", err);
      setError(err.message || "Failed to complete order");
    } finally {
      setCompletingOrderId(null);
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/auth/login");
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-primary">My Assignments</h1>
              <p className="text-sm text-gray-600 mt-1">
                {user?.email}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all"
              >
                ← Back to Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-600 mb-4">You have no assigned orders.</p>
            <Link
              href="/dashboard"
              className="text-accent hover:underline font-medium"
            >
              Browse available orders →
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                {/* Order Header */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-primary">
                        Order #{order.id.slice(0, 8)}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {order.source_language} → {order.target_language} •{" "}
                        {order.page_count} page{order.page_count !== 1 ? "s" : ""}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 text-sm font-medium rounded-full ${
                        order.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : order.turnaround === "rush"
                          ? "bg-red-100 text-red-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {order.status === "completed"
                        ? "Completed"
                        : order.turnaround === "rush"
                        ? "Rush (24-48h)"
                        : "Standard (3-5d)"}
                    </span>
                  </div>
                </div>

                {/* Order Details */}
                <div className="px-6 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Customer Information
                      </h4>
                      <p className="text-sm text-gray-900">
                        {order.customer_name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {order.customer_email}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Order Details
                      </h4>
                      <p className="text-sm text-gray-900">
                        Price: ${(order.price_cents / 100).toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-600">
                        Created:{" "}
                        {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {order.notes && (
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Customer Notes
                      </h4>
                      <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                        {order.notes}
                      </p>
                    </div>
                  )}

                  {/* Upload Section */}
                  {order.status !== "completed" && (
                    <div className="border-t border-gray-200 pt-6">
                      <h4 className="text-sm font-medium text-gray-700 mb-3">
                        Upload Completed Translation
                      </h4>

                      {order.completed_file_url ? (
                        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <svg
                              className="w-5 h-5 text-green-600"
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
                            <span className="text-sm text-green-800">
                              File uploaded successfully
                            </span>
                          </div>
                          <a
                            href={order.completed_file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-accent hover:underline"
                          >
                            View File
                          </a>
                        </div>
                      ) : (
                        <div className="mb-4">
                          <label className="block">
                            <input
                              type="file"
                              accept="application/pdf"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  handleFileUpload(order.id, file);
                                }
                              }}
                              disabled={uploadingOrderId === order.id}
                              className="block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-lg file:border-0
                                file:text-sm file:font-semibold
                                file:bg-accent file:text-white
                                file:cursor-pointer
                                hover:file:bg-accent/90
                                disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                          </label>
                          {uploadingOrderId === order.id && (
                            <p className="text-sm text-gray-600 mt-2">
                              Uploading...
                            </p>
                          )}
                        </div>
                      )}

                      {/* Complete Button */}
                      {order.completed_file_url && (
                        <button
                          onClick={() => handleCompleteOrder(order.id)}
                          disabled={completingOrderId === order.id}
                          className="w-full px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {completingOrderId === order.id
                            ? "Marking as Completed..."
                            : "Mark as Completed"}
                        </button>
                      )}
                    </div>
                  )}

                  {/* Completed Status */}
                  {order.status === "completed" && (
                    <div className="border-t border-gray-200 pt-6">
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <svg
                            className="w-5 h-5 text-green-600"
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
                          <span className="text-sm font-medium text-green-800">
                            Order Completed
                          </span>
                        </div>
                        {order.completed_file_url && (
                          <a
                            href={order.completed_file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-accent hover:underline"
                          >
                            Download Completed Translation →
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
