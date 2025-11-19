import { createServerSupabaseClient, getUser } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  source_language: string;
  target_language: string;
  page_count: number;
  turnaround: string;
  price_cents: number;
  created_at: string;
  notes: string | null;
}

async function getUnassignedOrders(): Promise<Order[]> {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .in("status", ["pending", "paid"]) // Show both pending and paid orders for local testing
    .is("assigned_to", null)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching unassigned orders:", error);
    return [];
  }

  return data as Order[];
}

async function getAssignedOrdersCount(): Promise<number> {
  const supabase = await createServerSupabaseClient();
  const user = await getUser();

  if (!user) return 0;

  const { count } = await supabase
    .from("orders")
    .select("*", { count: "exact", head: true })
    .eq("assigned_to", user.id)
    .in("status", ["paid", "in_progress"]);

  return count || 0;
}

async function handleLogout() {
  "use server";
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
  redirect("/auth/login");
}

export default async function DashboardPage() {
  const user = await getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const orders = await getUnassignedOrders();
  const assignedCount = await getAssignedOrdersCount();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-primary">
                Translator Dashboard
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Welcome back, {user.email}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard/assigned"
                className="px-4 py-2 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition-all"
              >
                My Assignments ({assignedCount})
              </Link>
              <form action={handleLogout}>
                <button
                  type="submit"
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all"
                >
                  Logout
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-accent">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              Available Orders
            </h3>
            <p className="text-3xl font-bold text-primary">{orders.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              My Assignments
            </h3>
            <p className="text-3xl font-bold text-primary">{assignedCount}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              Quick Action
            </h3>
            <Link
              href="/dashboard/assigned"
              className="text-accent hover:underline font-medium"
            >
              View My Work →
            </Link>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-primary">
              Unassigned Orders
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Orders awaiting translator assignment
            </p>
          </div>

          {orders.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="text-gray-600">No unassigned orders at the moment.</p>
              <p className="text-sm text-gray-500 mt-2">
                Check back later for new translation requests!
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Languages
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pages
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Turnaround
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-mono text-gray-900">
                          {order.id.slice(0, 8)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <div className="font-medium text-gray-900">
                            {order.customer_name}
                          </div>
                          <div className="text-gray-500">
                            {order.customer_email}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">
                          {order.source_language} → {order.target_language}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">
                          {order.page_count}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            order.turnaround === "rush"
                              ? "bg-red-100 text-red-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {order.turnaround === "rush"
                            ? "Rush (24-48h)"
                            : "Standard (3-5d)"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(order.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <form action="/api/orders/assign" method="POST">
                          <input type="hidden" name="orderId" value={order.id} />
                          <button
                            type="submit"
                            className="px-4 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent/90 transition-all"
                          >
                            Assign to Me
                          </button>
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
