import { HTMLAttributes, KeyboardEvent } from "react";
import Image from "next/image";
import { Star, Pencil, Trash2, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type VendorCategoryType =
  | "VENUE"
  | "MUA"
  | "PHOTOGRAPHER"
  | "DECORATION"
  | "CATERING";

export interface VendorCardProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onSelect"
> {
  name: string;
  imageUrl: string;
  category: VendorCategoryType;
  rating?: number;
  description?: string;
  isAvailable?: boolean;
  isSelected?: boolean;
  upgradeFee?: number;
  mode?: "select" | "manage";
  onSelect?: () => void;
  onViewPortfolio?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

const CATEGORY_LABELS: Record<VendorCategoryType, string> = {
  VENUE: "Gedung",
  MUA: "MUA",
  PHOTOGRAPHER: "Fotografer",
  DECORATION: "Dekorasi",
  CATERING: "Catering",
};

export default function VendorCard({
  name,
  imageUrl,
  category,
  rating = 0,
  description,
  isAvailable = true,
  isSelected = false,
  upgradeFee,
  mode = "select",
  onSelect,
  onViewPortfolio,
  onEdit,
  onDelete,
  className,
  ...props
}: VendorCardProps) {
  const isSelectMode = mode === "select";
  const canSelect = isSelectMode && isAvailable;

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!canSelect || !onSelect) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect();
    }
  };

  // Simplified star rating generator capped at 5 stars
  const renderStars = () => {
    const roundedRating = Math.min(5, Math.max(0, Math.round(rating)));
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={cn(
          "h-4 w-4",
          i < roundedRating
            ? "fill-amber-400 text-amber-400"
            : "text-muted-foreground/30",
        )}
      />
    ));
  };

  return (
    <Card
      role={isSelectMode ? "button" : undefined}
      tabIndex={canSelect ? 0 : -1}
      onClick={canSelect ? onSelect : undefined}
      onKeyDown={handleKeyDown}
      className={cn(
        "group relative flex flex-col overflow-hidden bg-background transition-all duration-300 focus:outline-none",
        isSelectMode && isAvailable && "cursor-pointer hover:shadow-md",
        isSelectMode && !isAvailable && "cursor-not-allowed opacity-70",
        isSelectMode && isSelected && "ring-2 ring-accent border-transparent",
        className,
      )}
      {...props}
    >
      {/* ── Visual Frame Area ────────────────────────────────────────── */}
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={cn(
            "object-cover transition-transform duration-500 group-hover:scale-105",
            !isAvailable && isSelectMode && "grayscale opacity-50",
          )}
        />

        {/* Navy Gradient Overlay for Content Protection */}
        <div className="absolute inset-0 bg-linear-to-t from-foreground/20 via-transparent to-transparent" />

        {/* Top-Left: Upgrade Fee / Price Badge */}
        {upgradeFee && upgradeFee > 0 && (
          <div className="absolute left-3 top-3 z-10">
            <Badge className="bg-accent text-white hover:bg-accent border-none px-2 py-0.5 text-xs font-semibold shadow-sm">
              +{formatRupiah(upgradeFee)}
            </Badge>
          </div>
        )}

        {/* Top-Right: Selection Checkmark Badge */}
        {isSelectMode && isSelected && (
          <div className="absolute right-3 top-3 z-10 animate-in fade-in zoom-in-75 duration-200">
            <CheckCircle2 className="h-6 w-6 fill-white text-accent shadow-sm rounded-full" />
          </div>
        )}

        {/* Top-Right: Administrative CRUD Tool Box */}
        {!isSelectMode && (
          <div className="absolute right-3 top-3 z-10 flex items-center gap-1.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.();
              }}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-foreground shadow-sm transition-colors hover:bg-muted hover:text-primary"
              aria-label="Ubah vendor"
            >
              <Pencil className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.();
              }}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-foreground shadow-sm transition-colors hover:bg-red-50 hover:text-red-600"
              aria-label="Hapus vendor"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

        {/* Centered Overlay: Unavailable Alert Banner */}
        {isSelectMode && !isAvailable && (
          <div className="absolute inset-0 flex items-center justify-center bg-foreground/30 backdrop-blur-[1px]">
            <Badge className="bg-red-600 text-white hover:bg-red-600 border-none px-3 py-1 font-medium tracking-wide shadow-sm">
              Tidak Tersedia
            </Badge>
          </div>
        )}
      </div>

      {/* ── Information Content Area ─────────────────────────────────── */}
      <CardContent className="flex flex-1 flex-col p-4">
        {/* Category Badge Tag & Active Status Badge (Management Mode) */}
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-xs font-medium tracking-wider text-accent uppercase">
            {CATEGORY_LABELS[category]}
          </span>
          {!isSelectMode && (
            <Badge
              variant="outline"
              className={cn(
                "text-[10px] px-1.5 py-0.5 rounded font-sans font-medium tracking-wide",
                isAvailable
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : "bg-muted text-muted-foreground border-border",
              )}
            >
              {isAvailable ? "Aktif" : "Nonaktif"}
            </Badge>
          )}
        </div>

        {/* Vendor Name */}
        <h3 className="font-serif text-lg font-semibold leading-snug text-primary mb-1">
          {name}
        </h3>

        {/* Star Evaluation Matrix */}
        <div className="flex items-center gap-1 mb-2.5">
          <div className="flex items-center">{renderStars()}</div>
          {rating > 0 && (
            <span className="text-xs font-medium text-muted-foreground ml-1">
              ({rating.toFixed(1)})
            </span>
          )}
        </div>

        {/* Description Snippet */}
        {description && (
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4 flex-1">
            {description}
          </p>
        )}

        {/* Action Controls Row */}
        {onViewPortfolio && (
          <div className="mt-auto pt-2 border-t border-border flex items-center justify-between">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onViewPortfolio();
              }}
              className="text-xs font-semibold text-primary underline-offset-4 hover:underline transition-all"
            >
              Lihat Portfolio
            </button>
            {isSelectMode && isAvailable && (
              <span className="text-xs font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {isSelected ? "Terpilih" : "Pilih Vendor →"}
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
