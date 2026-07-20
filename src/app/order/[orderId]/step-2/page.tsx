// NOTE: requires shadcn Collapsible — if not yet installed, run:
//   npx shadcn@latest add collapsible
"use client";

import React, { useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  MapPin,
  Star,
  Check,
  Sparkles,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";

// MOCK DATA — Eventually fetch this from the order's saved Step 1 selection via API
const STEP1_CONTEXT = {
  date: "14 Feb 2027",
  venue: "Bali Ballroom",
  estimatedBasePrice: "Rp 150.000.000",
};

interface MuaVendor {
  id: string;
  name: string;
  rating: number;
  description: string;
  imageUrl: string;
  isAvailable: boolean;
  isUpgrade: boolean;
  upgradeFee?: number;
}

// MOCK DATA — default package MUA vendor options
const DEFAULT_VENDORS: MuaVendor[] = [
  {
    id: "mua-glow-by-sarah",
    name: "Glow by Sarah",
    rating: 4.9,
    description:
      'Specialist in "glass skin" and sophisticated romantic looks for luxury destination weddings.',
    imageUrl: "/images/mua-glow-by-sarah.jpg",
    isAvailable: true,
    isUpgrade: false,
  },
  {
    id: "mua-ayu-lestari",
    name: "Ayu Lestari Makeup",
    rating: 4.8,
    description:
      "Expert in traditional-modern fusion makeup with 10+ years experience in the Bali wedding industry.",
    imageUrl: "/images/mua-ayu-lestari.jpg",
    isAvailable: true,
    isUpgrade: false,
  },
  {
    id: "mua-atelier-blush",
    name: "Atelier Blush",
    rating: 4.9,
    description:
      "Parisian-trained makeup artists specializing in timeless, natural elegance for grand celebrations.",
    imageUrl: "/images/mua-atelier-blush.jpg",
    isAvailable: true,
    isUpgrade: false,
  },
];

// MOCK DATA — upgrade MUA vendor options (additional fee on top of base package)
const UPGRADE_VENDORS: MuaVendor[] = [
  {
    id: "mua-signature-diana",
    name: "Signature MUA by Diana",
    rating: 5.0,
    description:
      "Celebrity-favorite artist known for editorial-inspired bridal looks and flawless airbrush finishing.",
    imageUrl: "/images/mua-signature-diana.jpg",
    isAvailable: true,
    isUpgrade: true,
    upgradeFee: 3500000,
  },
  {
    id: "mua-luna-beauty",
    name: "Luna Beauty House",
    rating: 4.9,
    description:
      "Renowned for soft Korean-inspired glam and meticulous long-lasting application for tropical climates.",
    imageUrl: "/images/mua-luna-beauty.jpg",
    isAvailable: true,
    isUpgrade: true,
    upgradeFee: 2750000,
  },
];

interface SelectedVendor {
  id: string;
  isUpgrade: boolean;
  upgradeFee?: number;
}

// Detects client-side mount without calling setState in an effect.
// getServerSnapshot() returns false during SSR/first paint; getSnapshot()
// returns true once running on the client. No subscription needed since this
// value never changes after mount, hence the no-op subscribe.
const emptySubscribe = () => () => {};
function useHasMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

function formatRupiah(amount: number): string {
  return `Rp ${amount.toLocaleString("id-ID")}`;
}

export default function OrderStep2Page() {
  const router = useRouter();
  const params = useParams();
  const orderId = params?.orderId as string;

  const [selectedVendor, setSelectedVendor] = useState<SelectedVendor | null>(
    null,
  );
  const mounted = useHasMounted();

  const handleSelectVendor = (vendor: MuaVendor) => {
    if (!vendor.isAvailable) return;
    setSelectedVendor({
      id: vendor.id,
      isUpgrade: vendor.isUpgrade,
      upgradeFee: vendor.upgradeFee,
    });
  };

  const handlePrevStep = () => {
    router.push(`/order/${orderId}/step-1`);
  };

  const handleNextStep = () => {
    if (selectedVendor) {
      router.push(`/order/${orderId}/step-3`);
    }
  };

  const basePriceNumeric = 150000000;
  const totalPriceNumeric =
    basePriceNumeric +
    (selectedVendor?.isUpgrade ? (selectedVendor.upgradeFee ?? 0) : 0);

  const renderVendorCard = (vendor: MuaVendor) => {
    const isSelected = selectedVendor?.id === vendor.id;

    return (
      <div
        key={vendor.id}
        onClick={() => handleSelectVendor(vendor)}
        className={cn(
          "rounded-xl border bg-background overflow-hidden cursor-pointer transition-all hover:shadow-md",
          isSelected
            ? "border-accent ring-1 ring-accent shadow-md"
            : "border-border",
        )}
      >
        {/* Photo Frame */}
        <div className="relative w-full aspect-[4/3] bg-muted">
          <Image
            src={vendor.imageUrl}
            alt={vendor.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />

          {vendor.isUpgrade ? (
            <span className="absolute top-3 left-3 bg-accent text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
              +{formatRupiah(vendor.upgradeFee ?? 0)}
            </span>
          ) : (
            <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
              TERSEDIA
            </span>
          )}

          {isSelected && (
            <div className="absolute top-3 right-3 h-6 w-6 rounded-full bg-accent/20 flex items-center justify-center">
              <Check className="h-4 w-4 text-accent" />
            </div>
          )}
        </div>

        {/* Content Block */}
        <div className="p-5 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-serif text-lg text-primary font-semibold truncate">
              {vendor.name}
            </h3>
            <div className="flex items-center gap-1 shrink-0">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span className="text-sm font-semibold text-foreground">
                {vendor.rating}
              </span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2">
            {vendor.description}
          </p>

          <div className="flex items-center justify-between pt-2 border-t border-border/60 mt-2">
            <span className="text-xs font-bold text-foreground">
              {vendor.isUpgrade ? "Upgrade Vendor" : "Termasuk Paket"}
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                // TODO: open portfolio lightbox
              }}
              className="text-xs font-semibold text-accent hover:underline"
            >
              Lihat Portfolio
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full space-y-8">
      {/* Heading */}
      <h1 className="font-serif text-2xl font-bold text-primary">
        Pilih Vendor Make Up Artist (MUA)
      </h1>

      {/* Context Summary Chip */}
      <div className="inline-flex items-center gap-3 rounded-full border border-border bg-background px-5 py-2.5">
        <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
        <span className="text-sm font-medium text-foreground">
          {STEP1_CONTEXT.date}
        </span>
        <span className="w-1 h-1 rounded-full bg-border shrink-0" />
        <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
        <span className="text-sm font-medium text-foreground">
          {STEP1_CONTEXT.venue}
        </span>
        <Link
          href={`/order/${orderId}/step-1`}
          className="text-accent font-semibold text-sm hover:underline ml-2"
        >
          Ubah
        </Link>
      </div>

      {/* Default Package Vendor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {DEFAULT_VENDORS.map(renderVendorCard)}
      </div>

      {/* Upgrade Vendor Collapsible Section */}
      <Collapsible>
        <CollapsibleTrigger className="w-full rounded-xl border border-border bg-muted/40 px-5 py-4 flex items-center justify-between cursor-pointer">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-foreground">
              Ingin Vendor Lain? Upgrade Vendor
            </span>
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform data-[state=open]:rotate-180" />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            {UPGRADE_VENDORS.map(renderVendorCard)}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* ── FIXED LAYOUT BOTTOM ACTION FOOTER PORTAL CONTENT ── */}
      {mounted &&
        createPortal(
          <div className="flex h-20 items-center justify-between w-full">
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">
                ESTIMASI TOTAL
              </span>
              <span className="text-lg font-serif font-bold text-primary">
                {formatRupiah(totalPriceNumeric)}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevStep}
                className="rounded-full border-border text-foreground font-medium px-5 h-11 text-sm inline-flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Kembali
              </Button>

              <Button
                type="button"
                onClick={handleNextStep}
                disabled={!selectedVendor}
                className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-6 h-11 text-sm inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Lanjut ke Fotografer
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>,
          document.getElementById("step-actions-slot")!,
        )}
    </div>
  );
}
