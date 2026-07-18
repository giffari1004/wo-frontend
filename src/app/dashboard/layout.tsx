"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import {
  ClientSidebar,
  clientNavItems,
} from "@/components/layout/ClientSidebar";
import { ClientTopbar } from "@/components/layout/ClientTopbar";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const pathname = usePathname();

  // TODO: Replace placeholders with real session/auth data from Zustand store or server session context
  const mockUser = {
    name: "Andra Pratama",
    unreadNotifications: 3,
  };

  const toggleMobileDrawer = () => setIsMobileDrawerOpen((prev) => !prev);

  return (
    <div className="flex min-h-screen bg-background text-foreground antialiased">
      {/* ── Desktop Fixed Sidebar ────────────────────────────────────── */}
      <ClientSidebar />

      {/* ── Main Viewport Content Area ───────────────────────────────── */}
      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <div className="sticky top-0 z-40 bg-background">
          {/* Mobile-only top bar with hamburger trigger */}
          <div className="flex h-16 w-full items-center justify-between border-b border-border px-4 md:hidden">
            <Link
              href="/dashboard"
              className="font-serif text-xl font-semibold tracking-wide text-primary"
            >
              Janji Seiring
            </Link>
            <button
              type="button"
              onClick={toggleMobileDrawer}
              className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground focus:outline-none"
              aria-label="Buka menu navigasi"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Desktop topbar (auto-hides its own title per pathname) */}
          <div className="hidden md:block">
            <ClientTopbar
              userName={mockUser.name}
              notificationCount={mockUser.unreadNotifications}
            />
          </div>
        </div>

        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="mx-auto w-full max-w-6xl">{children}</div>
        </main>
      </div>

      {/* ── Mobile Drawer Backdrop ───────────────────────────────────── */}
      {isMobileDrawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm md:hidden"
          onClick={toggleMobileDrawer}
          aria-hidden="true"
        />
      )}

      {/* ── Mobile Drawer Panel — reuses clientNavItems, single source of truth ── */}
      <aside
        className={cn(
          "fixed bottom-0 left-0 top-0 z-50 w-64 transform border-r border-border bg-background p-6 shadow-xl transition-transform duration-300 ease-in-out md:hidden",
          isMobileDrawerOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="mb-8 flex items-center justify-between">
          <span className="font-serif text-xl font-semibold tracking-wide text-primary">
            Janji Seiring
          </span>
          <button
            type="button"
            onClick={toggleMobileDrawer}
            className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground focus:outline-none"
            aria-label="Tutup menu navigasi"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="space-y-1">
          {clientNavItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={toggleMobileDrawer}
                className={cn(
                  "flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </div>
  );
}
