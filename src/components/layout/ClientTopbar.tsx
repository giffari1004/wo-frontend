"use client";

import { usePathname } from "next/navigation";
import { Topbar } from "./Topbar";

const titleMap: Record<string, string> = {
  "/dashboard": "Overview",
  "/dashboard/payments": "Pembayaran",
  "/dashboard/invoices": "Invoice",
  "/dashboard/vendors": "Vendor & Paket Terpilih",
  "/dashboard/rsvp": "RSVP",
  "/dashboard/requests": "Request Khusus",
  "/dashboard/reschedule": "Reschedule",
  "/dashboard/notifications": "Notifikasi",
  "/dashboard/profile": "Profil Akun",
};

interface ClientTopbarProps {
  userName: string;
  notificationCount?: number;
  onLogout?: () => void;
}

export function ClientTopbar({ userName, notificationCount, onLogout }: ClientTopbarProps) {
  const pathname = usePathname();
  const title = titleMap[pathname ?? ""] ?? "Dashboard";

  return (
    <Topbar
      title={title}
      userName={userName}
      userRole="Client"
      notificationCount={notificationCount}
      profileHref="/dashboard/profile"
      onLogout={onLogout}
    />
  );
}
