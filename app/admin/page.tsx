import Link from "next/link";
import { requireAdmin } from "@/lib/auth/admin";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import AdminNav from "@/components/admin/AdminNav";

export default async function AdminDashboard() {
  await requireAdmin();

  const supabase = await createServerSupabaseClient();

  // Get stats
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const [
    { count: totalOrders },
    { count: ordersLast30Days },
    { count: pendingOrders },
    { count: totalTranslators },
    { count: publicTranslators },
    { count: totalLeads },
    { count: totalCities },
  ] = await Promise.all([
    supabase.from("orders").select("*", { count: "exact", head: true }),
    supabase
      .from("orders")
      .select("*", { count: "exact", head: true })
      .gte("created_at", thirtyDaysAgo.toISOString()),
    supabase
      .from("orders")
      .select("*", { count: "exact", head: true })
      .eq("status", "paid"),
    supabase.from("translators").select("*", { count: "exact", head: true }),
    supabase
      .from("translators")
      .select("*", { count: "exact", head: true })
      .eq("is_public", true),
    supabase.from("leads").select("*", { count: "exact", head: true }),
    supabase.from("cities").select("*", { count: "exact", head: true }),
  ]);

  const stats = [
    {
      label: "Total Orders",
      value: totalOrders || 0,
      subtitle: `${ordersLast30Days || 0} in last 30 days`,
      color: "bg-blue-500",
    },
    {
      label: "Pending Assignment",
      value: pendingOrders || 0,
      subtitle: "Orders awaiting translator",
      color: "bg-yellow-500",
    },
    {
      label: "Total Translators",
      value: totalTranslators || 0,
      subtitle: `${publicTranslators || 0} public`,
      color: "bg-green-500",
    },
    {
      label: "Translator Leads",
      value: totalLeads || 0,
      subtitle: "Inquiries received",
      color: "bg-purple-500",
    },
    {
      label: "Cities",
      value: totalCities || 0,
      subtitle: "Listed cities",
      color: "bg-indigo-500",
    },
  ];

  const quickLinks = [
    { href: "/admin/orders", label: "Manage Orders", icon: "📋" },
    { href: "/admin/translators", label: "Manage Translators", icon: "👥" },
    { href: "/admin/leads", label: "Translator Leads", icon: "💬" },
    { href: "/admin/cities", label: "Manage Cities", icon: "🏙️" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <AdminNav />
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Manage orders, translators, leads, and cities
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-lg`} />
              </div>
              <div className="text-3xl font-bold text-primary mb-1">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-gray-700 mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-gray-500">{stat.subtitle}</div>
            </div>
          ))}
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold text-primary mb-4">
            Quick Actions
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {quickLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-accent hover:shadow-md transition-all flex items-center gap-4"
              >
                <span className="text-4xl">{link.icon}</span>
                <span className="text-lg font-semibold text-primary">
                  {link.label}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-accent hover:underline inline-flex items-center gap-2"
          >
            ← Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
