import { HTMLAttributes } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type StatusVariant =
  // Order Status
  | "DRAFT"
  | "PENDING_PAYMENT"
  | "DP_REVIEW"
  | "IN_PREPARATION"
  | "FULLY_PAID"
  | "COMPLETED"
  | "CANCELLED"
  // Payment Status
  | "PENDING_UPLOAD"
  | "WAITING_VERIFICATION"
  | "APPROVED"
  | "REJECTED"
  // Request Status
  | "PENDING"
  | "RESPONDED"
  // RSVP Attendance
  | "HADIR"
  | "TIDAK_HADIR";

type StatusTone = "neutral" | "gold" | "success" | "danger";

interface StatusConfig {
  label: string;
  tone: StatusTone;
}

const STATUS_MAP: Record<StatusVariant, StatusConfig> = {
  // Order Status Mapping
  DRAFT: { label: "Draft", tone: "neutral" },
  PENDING_PAYMENT: { label: "Menunggu Pembayaran", tone: "neutral" },
  DP_REVIEW: { label: "Menunggu Verifikasi DP", tone: "gold" },
  IN_PREPARATION: { label: "Dalam Persiapan", tone: "gold" },
  FULLY_PAID: { label: "Lunas", tone: "success" },
  COMPLETED: { label: "Selesai", tone: "success" },
  CANCELLED: { label: "Dibatalkan", tone: "danger" },

  // Payment Status Mapping
  PENDING_UPLOAD: { label: "Belum Dibayar", tone: "neutral" },
  WAITING_VERIFICATION: { label: "Menunggu Verifikasi", tone: "neutral" },
  APPROVED: { label: "Disetujui", tone: "success" },
  REJECTED: { label: "Ditolak", tone: "danger" },

  // Request Status Mapping
  PENDING: { label: "Menunggu", tone: "neutral" },
  RESPONDED: { label: "Ditanggapi", tone: "gold" },

  // RSVP Attendance Mapping
  HADIR: { label: "Hadir", tone: "success" },
  TIDAK_HADIR: { label: "Tidak Hadir", tone: "danger" },
};

const TONE_CLASSES: Record<StatusTone, { badge: string; dot: string }> = {
  neutral: {
    badge: "bg-muted text-muted-foreground hover:bg-muted border-transparent",
    dot: "bg-muted-foreground",
  },
  gold: {
    badge: "bg-accent/10 text-accent hover:bg-accent/10 border-transparent",
    dot: "bg-accent",
  },
  success: {
    badge:
      "bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border-transparent",
    dot: "bg-emerald-500",
  },
  danger: {
    badge: "bg-red-50 text-red-700 hover:bg-red-50 border-transparent",
    dot: "bg-red-500",
  },
};

interface StatusBadgeProps extends HTMLAttributes<HTMLDivElement> {
  status: StatusVariant;
}

export default function StatusBadge({
  status,
  className,
  ...props
}: StatusBadgeProps) {
  // Fail-safe handling for unmapped status payloads
  const config = STATUS_MAP[status] || {
    label: String(status),
    tone: "neutral" as StatusTone,
  };

  const styles = TONE_CLASSES[config.tone];

  return (
    <Badge
      variant="outline"
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium tracking-wide transition-colors rounded-md",
        styles.badge,
        className,
      )}
      {...props}
    >
      {/* 6px leading indicator dot */}
      <span
        className={cn("h-1.5 w-1.5 rounded-full shrink-0", styles.dot)}
        aria-hidden="true"
      />
      <span>{config.label}</span>
    </Badge>
  );
}
