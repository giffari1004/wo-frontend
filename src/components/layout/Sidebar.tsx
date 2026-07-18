"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  /** Small label shown next to the item, e.g. "Fase 2" */
  tag?: string;
}

interface SidebarProps {
  navItems: NavItem[];
  /** Route the logo links back to (dashboard root or admin root) */
  logoHref: string;
  onLogout?: () => void;
}

export function Sidebar({ navItems, logoHref, onLogout }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:w-64 md:shrink-0 md:flex-col h-screen sticky top-0 border-r border-border bg-background">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-border">
        <Link
          href={logoHref}
          className="font-serif text-lg font-semibold tracking-wide text-primary"
        >
          Janji Seiring
        </Link>
      </div>

      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== logoHref && pathname?.startsWith(`${item.href}/`));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-md border-l-2 px-3 py-2.5 text-sm transition-colors",
                isActive
                  ? "border-l-accent bg-primary/10 font-medium text-primary"
                  : "border-l-transparent text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="flex-1">{item.label}</span>
              {item.tag && (
                <Badge
                  variant="outline"
                  className="border-accent px-1.5 py-0 text-[10px] leading-4 text-accent"
                >
                  {item.tag}
                </Badge>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-border p-3">
        <button
          type="button"
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-destructive"
        >
          <LogOut className="h-4 w-4" />
          Keluar
        </button>
      </div>
    </aside>
  );
}
