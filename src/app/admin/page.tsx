import React from "react";
import Link from "next/link";
import {
  Wallet,
  CalendarCheck,
  Clock3,
  CheckCircle2,
  TrendingUp,
  CalendarClock,
  UtensilsCrossed,
  ChevronDown,
} from "lucide-react";
import { AreaChart, Area, XAxis, ResponsiveContainer, Tooltip } from "recharts";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DateRangeFilterTabs } from "./_components/DateRangeFilterTabs";

// ── MOCK DATA FOR REVENUE TREND ──
const REVENUE_DATA = [
  { month: "Jan", revenue: 180000000 },
  { month: "Feb", revenue: 195000000 },
  { month: "Mar", revenue: 310000000 },
  { month: "Apr", revenue: 405000000 },
  { month: "Mei", revenue: 420000000 },
  { month: "Jun", revenue: 450000000 },
];

// ── MOCK DATA FOR ORDER STATUS BREAKDOWN ──
// Maps to backend OrderStatus enum: COMPLETED, IN_PREPARATION, FULLY_PAID, DP_REVIEW, and combination for Lainnya
const ORDER_STATUSES = [
  { label: "Selesai", count: 15, percentage: 28, colorClass: "bg-primary" },
  { label: "Persiapan", count: 12, percentage: 22, colorClass: "bg-accent" },
  { label: "Lunas", count: 10, percentage: 18, colorClass: "bg-primary" },
  {
    label: "Menunggu Verifikasi",
    count: 8,
    percentage: 15,
    colorClass: "bg-accent",
  },
  {
    label: "Lainnya",
    count: 7,
    percentage: 17,
    colorClass: "bg-muted-foreground/40",
  },
];

// ── MOCK DATA FOR UPCOMING WEDDINGS ──
const UPCOMING_WEDDINGS = [
  {
    id: "ord-1",
    date: "15 Jun 2024",
    client: "Andra & Bella",
    venue: "The Ritz-Carlton",
    progress: 85,
    progressColor: "bg-emerald-500",
  },
  {
    id: "ord-2",
    date: "22 Jun 2024",
    client: "Dimas & Citra",
    venue: "Fairmont Jakarta",
    progress: 65,
    progressColor: "bg-accent",
  },
  {
    id: "ord-3",
    date: "29 Jun 2024",
    client: "Fajar & Gista",
    venue: "Four Seasons",
    progress: 40,
    progressColor: "bg-accent",
  },
];

// ── MOCK DATA FOR ACTION ITEMS PANEL ──
const ACTION_ITEMS = [
  {
    title: "3 Pembayaran Menunggu",
    description: "Segera verifikasi bukti transfer DP dari Client.",
    icon: Wallet,
    href: "/admin/payments",
  },
  {
    title: "1 Pengajuan Reschedule",
    description: "Client Andre & Sarah meminta perubahan tanggal.",
    icon: CalendarClock,
    href: "/admin/orders",
  },
  {
    title: "2 Konfirmasi Catering",
    description: "Vendor memerlukan konfirmasi final menu minggu ini.",
    icon: UtensilsCrossed,
    href: "/admin/vendors",
  },
];

export default function AdminOverviewPage() {
  return (
    <div className="space-y-6 w-full pb-8">
      {/* ── 1. DATE RANGE FILTER ROW (client component — only this part needs interactivity) ── */}
      <DateRangeFilterTabs />

      {/* ── 2. KPI CARDS ROW ── */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Card 1: Total Revenue */}
        <div className="rounded-xl border border-border bg-background p-5 flex flex-col justify-between shadow-sm relative overflow-hidden">
          <div className="flex items-start justify-between w-full">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Total Revenue
            </span>
            <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center text-primary shrink-0">
              <Wallet className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 space-y-1">
            <div className="text-2xl font-serif font-bold text-primary">
              Rp 450.000.000
            </div>
            <div className="flex items-center gap-1 text-xs text-emerald-600 font-medium pt-1">
              <TrendingUp className="h-3.5 w-3.5" />
              <span>+12% vs bulan lalu</span>
            </div>
          </div>
        </div>

        {/* Card 2: Order Aktif */}
        <div className="rounded-xl border border-border bg-background p-5 flex flex-col justify-between shadow-sm relative overflow-hidden">
          <div className="flex items-start justify-between w-full">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Order Aktif
            </span>
            <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center text-primary shrink-0">
              <CalendarCheck className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 space-y-0.5">
            <div className="text-2xl font-serif font-bold text-primary">24</div>
            <p className="text-xs text-muted-foreground pt-1">
              Pernikahan dalam proses
            </p>
          </div>
        </div>

        {/* Card 3: Menunggu Verifikasi (Highlighted Accent) */}
        <div className="rounded-xl border border-border border-l-4 border-l-accent bg-background p-5 flex flex-col justify-between shadow-sm relative overflow-hidden">
          <div className="flex items-start justify-between w-full">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Menunggu Verifikasi
            </span>
            <div className="h-9 w-9 rounded-lg bg-accent/10 flex items-center justify-center text-accent shrink-0">
              <Clock3 className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 space-y-0.5">
            <div className="text-2xl font-serif font-bold text-primary">8</div>
            <p className="text-xs text-accent font-medium pt-1">
              Membutuhkan perhatian segera
            </p>
          </div>
        </div>

        {/* Card 4: Order Selesai */}
        <div className="rounded-xl border border-border bg-background p-5 flex flex-col justify-between shadow-sm relative overflow-hidden">
          <div className="flex items-start justify-between w-full">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Order Selesai
            </span>
            <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center text-primary shrink-0">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 space-y-0.5">
            <div className="text-2xl font-serif font-bold text-primary">15</div>
            <p className="text-xs text-muted-foreground pt-1">
              Pernikahan sukses bulan ini
            </p>
          </div>
        </div>
      </div>

      {/* ── 3. MIDDLE ROW: REVENUE TREND & ORDER STATUS ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue Trend Chart Card Component Block */}
        <div className="lg:col-span-2 rounded-xl border border-border bg-background p-6 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between w-full mb-6">
            <h3 className="font-serif text-lg text-primary font-semibold">
              Revenue Trend
            </h3>
            <button
              type="button"
              className="text-xs border border-border rounded-full px-3 py-1.5 text-muted-foreground inline-flex items-center gap-1.5 bg-background hover:bg-muted/30 transition-colors"
            >
              6 Bulan Terakhir
              <ChevronDown className="h-3 w-3" />
            </button>
          </div>

          <div className="w-full h-[280px] pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={REVENUE_DATA}
                margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="hsl(var(--accent))"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="hsl(var(--accent))"
                      stopOpacity={0.0}
                    />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  dy={10}
                />
                <Tooltip
                  formatter={(value) => {
                    const numeric =
                      typeof value === "number" ? value : Number(value ?? 0);
                    return [`Rp ${numeric.toLocaleString("id-ID")}`, "Revenue"];
                  }}
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    borderRadius: "8px",
                    border: "1px solid hsl(var(--border))",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                  dot={{ r: 4, fill: "hsl(var(--primary))", strokeWidth: 0 }}
                  activeDot={{ r: 6 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Order Status Breakdown Display Side-Card */}
        <div className="rounded-xl border border-border bg-background p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-serif text-lg text-primary font-semibold mb-6">
              Order Status
            </h3>
            <div className="space-y-4">
              {ORDER_STATUSES.map((status, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between w-full text-sm">
                    <span className="font-medium text-foreground">
                      {status.label} ({status.count})
                    </span>
                    <span className="font-semibold text-foreground text-right">
                      {status.percentage}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-500",
                        status.colorClass,
                      )}
                      style={{ width: `${status.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── 4. BOTTOM ROW: UPCOMING WEDDINGS & NEED ACTION PANEL ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Side: Upcoming Weddings Grid Table Summary Display Frame */}
        <div className="lg:col-span-2 rounded-xl border border-border bg-background p-6 shadow-sm flex flex-col justify-between">
          <div className="w-full">
            <div className="flex items-center justify-between w-full mb-4">
              <h3 className="font-serif text-lg text-primary font-semibold">
                Pernikahan Mendatang
              </h3>
              <Link
                href="/admin/orders"
                className="text-accent text-sm font-semibold hover:underline transition-all"
              >
                Lihat Semua
              </Link>
            </div>

            <div className="w-full overflow-x-auto">
              <table className="w-full border-collapse text-left min-w-[500px]">
                <thead>
                  <tr className="bg-muted/40 border-b border-border">
                    <th className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide p-3 pl-4">
                      TANGGAL
                    </th>
                    <th className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide p-3">
                      NAMA CLIENT
                    </th>
                    <th className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide p-3">
                      GEDUNG
                    </th>
                    <th className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide p-3 max-w-[140px]">
                      PERSIAPAN
                    </th>
                    <th className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide p-3 pr-4 text-center">
                      AKSI
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {UPCOMING_WEDDINGS.map((row) => (
                    <tr
                      key={row.id}
                      className="hover:bg-muted/20 transition-colors"
                    >
                      <td className="p-4 pl-4 text-sm text-muted-foreground whitespace-nowrap">
                        {row.date}
                      </td>
                      <td className="p-4 text-sm font-bold text-foreground whitespace-nowrap">
                        {row.client}
                      </td>
                      <td className="p-4 text-sm text-muted-foreground whitespace-nowrap">
                        {row.venue}
                      </td>
                      <td className="p-4 text-sm whitespace-nowrap">
                        <div className="flex items-center gap-3 w-32">
                          <div className="h-1.5 flex-1 rounded-full bg-muted overflow-hidden">
                            <div
                              className={cn(
                                "h-full rounded-full",
                                row.progressColor,
                              )}
                              style={{ width: `${row.progress}%` }}
                            />
                          </div>
                          <span className="text-xs font-semibold text-muted-foreground shrink-0">
                            {row.progress}%
                          </span>
                        </div>
                      </td>
                      <td className="p-4 pr-4 text-center whitespace-nowrap">
                        <Link
                          href={`/admin/orders/${row.id}`}
                          className="text-xs text-accent font-semibold hover:underline"
                        >
                          Lihat
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Side: Need Action Operational Task Action Panel Column */}
        <div className="rounded-xl border border-border border-l-4 border-l-accent bg-background p-6 shadow-sm flex flex-col justify-between gap-6">
          <div className="space-y-4 w-full">
            <h3 className="font-serif text-lg text-primary font-semibold">
              Perlu Tindakan
            </h3>

            <div className="space-y-3 w-full">
              {ACTION_ITEMS.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={index}
                    href={item.href}
                    className="flex items-start gap-3 rounded-lg bg-muted/30 p-3 hover:bg-muted/50 transition-colors border border-transparent hover:border-border/40 group w-full block"
                  >
                    <div className="h-9 w-9 rounded-lg bg-background border border-border flex items-center justify-center text-primary group-hover:text-accent transition-colors shrink-0">
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <div className="space-y-0.5 min-w-0">
                      <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                        {item.title}
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="w-full">
            <Button
              asChild
              className="w-full rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium h-11 transition-colors text-sm"
            >
              <Link href="/admin/orders">
                {/* TODO: replace with a real task manager component route implementation if one gets added later */}
                Buka Task Manager
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
