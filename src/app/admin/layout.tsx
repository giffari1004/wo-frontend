"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { AdminSidebar, adminNavItems } from "@/components/layout/AdminSidebar";
import { AdminTopbar } from "@/components/layout/AdminTopbar";
import { cn } from "@/lib/utils";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const pathname = usePathname();

  // TODO: Replace placeholders with real session/auth data from server session or auth store.
  // NOTE: Role-based access (user.role === "ADMIN") is enforced globally via middleware.ts,
  // so it is intentionally not duplicated here.
  const mockAdmin = {
    name: "Sarah Wijaya",
    unreadAlerts: 5,
  };

  const toggleMobileDrawer = () => setIsMobileDrawerOpen((prev) => !prev);

  return (
    <div className="flex min-h-screen bg-background text-foreground antialiased">
      {/* ── Desktop Fixed Sidebar ────────────────────────────────────── */}
      <AdminSidebar />

      {/* ── Main Workspace Content Column ────────────────────────────── */}
      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <div className="sticky top-0 z-40 bg-background">
          {/* Mobile-only top bar with hamburger trigger */}
          <div className="flex h-16 w-full items-center justify-between border-b border-border px-4 md:hidden">
            <Link
              href="/admin"
              className="font-serif text-xl font-semibold tracking-wide text-primary"
            >
              Janji Seiring{" "}
              <span className="ml-1 font-sans text-xs font-normal text-accent">
                Admin
              </span>
            </Link>
            <button
              type="button"
              onClick={toggleMobileDrawer}
              className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground focus:outline-none"
              aria-label="Buka menu navigasi admin"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          <div className="hidden md:block">
            <AdminTopbar
              userName={mockAdmin.name}
              notificationCount={mockAdmin.unreadAlerts}
            />
          </div>
        </div>

        {/* Full-width, no max-width — admin pages are data-dense (tables, charts) */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>

      {/* ── Mobile Drawer Backdrop ───────────────────────────────────── */}
      {isMobileDrawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm md:hidden"
          onClick={toggleMobileDrawer}
          aria-hidden="true"
        />
      )}

      {/* ── Mobile Drawer Panel — reuses adminNavItems, single source of truth ── */}
      <aside
        className={cn(
          "fixed bottom-0 left-0 top-0 z-50 w-64 transform border-r border-border bg-background p-6 shadow-xl transition-transform duration-300 ease-in-out md:hidden",
          isMobileDrawerOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="mb-8 flex items-center justify-between">
          <span className="font-serif text-xl font-semibold tracking-wide text-primary">
            Janji Seiring{" "}
            <span className="text-xs font-sans font-normal text-accent">
              Admin
            </span>
          </span>
          <button
            type="button"
            onClick={toggleMobileDrawer}
            className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground focus:outline-none"
            aria-label="Tutup menu navigasi admin"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="space-y-1">
          {adminNavItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={toggleMobileDrawer}
                className={cn(
                  "flex h-10 items-center justify-between rounded-md px-3 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <span className="flex items-center gap-3">
                  <Icon className="h-4 w-4 shrink-0" />
                  {item.label}
                </span>
                {item.tag && (
                  <span
                    className={cn(
                      "rounded border px-1.5 py-0.5 font-sans text-[10px] font-medium tracking-wide",
                      isActive
                        ? "border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground"
                        : "border-accent/30 bg-accent/10 text-accent",
                    )}
                  >
                    {item.tag}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </aside>
    </div>
  );
}
