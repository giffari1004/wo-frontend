"use client";

import { usePathname } from "next/navigation";
import { Topbar } from "./Topbar";

// Exact-match titles first.
const exactTitleMap: Record<string, string> = {
  "/admin": "Overview",
  "/admin/payments": "Verifikasi Pembayaran",
  "/admin/vendors": "Manajemen Vendor",
  "/admin/vendors/new": "Tambah Vendor",
  "/admin/packages": "Manajemen Paket",
  "/admin/calendar": "Kalender Admin",
  "/admin/orders": "Daftar Order",
  "/admin/clients": "Daftar Client",
  "/admin/reports/revenue": "Laporan Revenue",
  "/admin/reports/vendor-performance": "Laporan Performa Vendor",
  "/admin/settings": "Pengaturan Situs",
};

// Prefix fallback for dynamic segments, e.g. /admin/vendors/[id], /admin/orders/[id].
// Ordered from most specific to least specific.
const prefixTitleMap: [string, string][] = [
  ["/admin/vendors/", "Detail Vendor"],
  ["/admin/orders/", "Detail Order"],
  ["/admin/packages/", "Edit Paket"],
];

function resolveTitle(pathname: string | null): string {
  if (!pathname) return "Admin";
  if (exactTitleMap[pathname]) return exactTitleMap[pathname];

  const match = prefixTitleMap.find(([prefix]) => pathname.startsWith(prefix));
  return match?.[1] ?? "Admin";
}

interface AdminTopbarProps {
  userName: string;
  notificationCount?: number;
  onLogout?: () => void;
}

export function AdminTopbar({ userName, notificationCount, onLogout }: AdminTopbarProps) {
  const pathname = usePathname();
  const title = resolveTitle(pathname);

  return (
    <Topbar
      title={title}
      userName={userName}
      userRole="Admin"
      notificationCount={notificationCount}
      profileHref="/admin/settings"
      onLogout={onLogout}
    />
  );
}
