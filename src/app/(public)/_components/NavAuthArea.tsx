"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, LayoutDashboard } from "lucide-react";

import { clearSession } from "@/lib/auth";
import type { UserRole } from "@/lib/auth-constants";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavAuthAreaProps {
  isLoggedIn: boolean;
  userName: string | null;
  userRole: UserRole | null;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function NavAuthArea({
  isLoggedIn,
  userName,
  userRole,
}: NavAuthAreaProps) {
  const router = useRouter();

  const handleLogout = () => {
    clearSession();
    router.push("/");
    router.refresh(); // supaya layout (Server Component) baca ulang cookie yang sudah kosong
  };

  if (!isLoggedIn || !userName) {
    return (
      <Button
        asChild
        className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold tracking-wider px-6 h-10 uppercase"
      >
        <Link href="/login">LOGIN</Link>
      </Button>
    );
  }

  const dashboardHref = userRole === "ADMIN" ? "/admin" : "/dashboard";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 outline-none">
        <Avatar className="h-9 w-9">
          <AvatarFallback className="bg-primary text-xs text-primary-foreground">
            {getInitials(userName)}
          </AvatarFallback>
        </Avatar>
        <span className="hidden text-sm font-medium text-foreground lg:inline">
          {userName}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href={dashboardHref} className="flex items-center gap-2">
            <LayoutDashboard className="h-4 w-4" />
            Dashboard Saya
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogout}
          className="flex items-center gap-2 text-destructive"
        >
          <LogOut className="h-4 w-4" />
          Keluar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
