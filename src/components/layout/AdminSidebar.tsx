import {
  LayoutDashboard,
  CircleCheckBig,
  Store,
  UtensilsCrossed,
  Package,
  CalendarRange,
  ClipboardList,
  Users,
  BarChart3,
  Settings,
} from "lucide-react";
import { Sidebar, type NavItem } from "./Sidebar";

export const adminNavItems: NavItem[] = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Verifikasi Pembayaran", href: "/admin/payments", icon: CircleCheckBig },
  { label: "Vendor", href: "/admin/vendors", icon: Store },
  { label: "Menu Catering", href: "/admin/vendors/catering-menu", icon: UtensilsCrossed },
  { label: "Paket", href: "/admin/packages", icon: Package },
  { label: "Kalender", href: "/admin/calendar", icon: CalendarRange },
  { label: "Order", href: "/admin/orders", icon: ClipboardList },
  { label: "Client", href: "/admin/clients", icon: Users, tag: "Fase 2" },
  { label: "Laporan", href: "/admin/reports/revenue", icon: BarChart3, tag: "Fase 2" },
  { label: "Pengaturan Situs", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  return <Sidebar navItems={adminNavItems} logoHref="/admin" />;
}
