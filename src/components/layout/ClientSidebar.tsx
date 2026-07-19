import {
  LayoutDashboard,
  CreditCard,
  FileText,
  Store,
  Users,
  MessageSquareText,
  CalendarClock,
  Bell,
  UserCircle,
} from "lucide-react";
import { Sidebar, type NavItem } from "./Sidebar";

export const clientNavItems: NavItem[] = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Pembayaran", href: "/dashboard/payments", icon: CreditCard },
  { label: "Invoice", href: "/dashboard/invoices", icon: FileText },
  { label: "Vendor & Paket", href: "/dashboard/vendors", icon: Store },
  { label: "RSVP", href: "/dashboard/rsvp", icon: Users },
  { label: "Request Khusus", href: "/dashboard/requests", icon: MessageSquareText },
  { label: "Reschedule", href: "/dashboard/reschedule", icon: CalendarClock },
  { label: "Notifikasi", href: "/dashboard/notifications", icon: Bell },
  { label: "Profil Akun", href: "/dashboard/profile", icon: UserCircle },
];

export function ClientSidebar() {
  return <Sidebar navItems={clientNavItems} logoHref="/dashboard" />;
}
