"use client";

import { Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface TopbarProps {
  title: string;
  userName: string;
  userRole?: string;
  notificationCount?: number;
  profileHref?: string;
  onLogout?: () => void;
}

export function Topbar({
  title,
  userName,
  userRole,
  notificationCount = 0,
  profileHref = "/dashboard/profile",
  onLogout,
}: TopbarProps) {
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-border bg-background/95 px-6 backdrop-blur">
      <h1 className="font-serif text-xl text-primary">{title}</h1>

      <div className="flex items-center gap-4">
        <button
          type="button"
          className="relative rounded-full p-2 transition-colors hover:bg-muted"
          aria-label="Notifikasi"
        >
          <Bell className="h-5 w-5 text-muted-foreground" />
          {notificationCount > 0 && (
            <Badge className="absolute -right-1 -top-1 h-4 min-w-4 justify-center bg-accent px-1 text-[10px] text-white">
              {notificationCount > 9 ? "9+" : notificationCount}
            </Badge>
          )}
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 outline-none">
            <Avatar className="h-8 w-8">
              <AvatarImage src="" alt={userName} />
              <AvatarFallback className="bg-primary text-xs text-primary-foreground">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="hidden text-left sm:block">
              <p className="text-sm font-medium leading-none">{userName}</p>
              {userRole && <p className="text-xs text-muted-foreground">{userRole}</p>}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <a href={profileHref}>Profil Akun</a>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onLogout} className="text-destructive">
              Keluar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
