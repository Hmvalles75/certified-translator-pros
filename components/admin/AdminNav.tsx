"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminNav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/admin", label: "Dashboard", exact: true },
    { href: "/admin/orders", label: "Orders" },
    { href: "/admin/translators", label: "Translators" },
    { href: "/admin/leads", label: "Leads" },
    { href: "/admin/cities", label: "Cities" },
  ];

  const isActive = (href: string, exact?: boolean) => {
    if (exact) {
      return pathname === href;
    }
    return pathname?.startsWith(href);
  };

  return (
    <nav className="bg-primary shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="text-white font-bold text-xl hover:text-accent transition"
            >
              CTP Admin
            </Link>
            <div className="hidden md:flex gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    isActive(item.href, item.exact)
                      ? "bg-accent text-white"
                      : "text-white/80 hover:text-white hover:bg-primary/80"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-white/80 hover:text-white text-sm font-medium transition"
            >
              View Site
            </Link>
            <form action="/api/auth/logout" method="POST">
              <button
                type="submit"
                className="text-white/80 hover:text-white text-sm font-medium transition"
              >
                Logout
              </button>
            </form>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden pb-4">
          <div className="flex flex-wrap gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                  isActive(item.href, item.exact)
                    ? "bg-accent text-white"
                    : "text-white/80 hover:text-white hover:bg-primary/80"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
