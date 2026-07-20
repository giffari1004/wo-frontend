"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, LogOut, LayoutDashboard } from "lucide-react";

import { clearSession } from "@/lib/auth";
import type { UserRole } from "@/lib/auth-constants";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface NavLink {
  name: string;
  href: string;
}

interface MobileNavProps {
  navLinks: NavLink[];
  isLoggedIn: boolean;
  userName: string | null;
  userRole: UserRole | null;
}

export function MobileNav({
  navLinks,
  isLoggedIn,
  userName,
  userRole,
}: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const dashboardHref = userRole === "ADMIN" ? "/admin" : "/dashboard";

  const handleLogout = () => {
    setIsOpen(false);
    clearSession();
    router.push("/");
    router.refresh();
  };

  return (
    <>
      <button
        type="button"
        className="p-2 text-foreground transition-colors hover:text-primary focus:outline-none md:hidden"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle Menu"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      <div
        className={cn(
          "w-full overflow-hidden border-b border-border bg-background transition-all duration-300 ease-in-out md:hidden",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="flex flex-col gap-4 px-4 pb-6 pt-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="py-1 text-sm font-medium tracking-wide text-foreground/70 transition-colors hover:text-primary"
            >
              {link.name}
            </Link>
          ))}

          {isLoggedIn && userName ? (
            <div className="mt-2 space-y-3 border-t border-border pt-4">
              <p className="text-sm font-semibold text-foreground">
                {userName}
              </p>
              <Link
                href={dashboardHref}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 py-1 text-sm font-medium text-foreground/70 transition-colors hover:text-primary"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard Saya
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-2 py-1 text-sm font-medium text-destructive"
              >
                <LogOut className="h-4 w-4" />
                Keluar
              </button>
            </div>
          ) : (
            <Button
              asChild
              className="mt-2 h-11 w-full rounded-full bg-primary text-xs font-semibold uppercase tracking-wider text-primary-foreground hover:bg-primary/90"
            >
              <Link href="/login" onClick={() => setIsOpen(false)}>
                LOGIN
              </Link>
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
