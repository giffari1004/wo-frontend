"use client";

import React, { useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { DayPicker } from "react-day-picker";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Users,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { id } from "date-fns/locale";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// MOCK DATA — Eventually fetch this from an API call using the orderId route param
const SELECTED_PACKAGE_CONTEXT = {
  name: "Paket Gold",
  capacity: "Hingga 300 tamu",
  estimatedBasePrice: "Rp 150.000.000",
};

const FULLY_BOOKED_DATES = [new Date(2024, 5, 19), new Date(2024, 5, 20)];

const VENUES = [
  {
    id: "venue-1",
    name: "The Grand Ballroom",
    location: "Sudirman, Jakarta Pusat",
    capacityText: "Kapasitas hingga 500 tamu",
    imageUrl: "/images/venue-grand-ballroom.jpg",
    isAvailable: true,
  },
  {
    id: "venue-2",
    name: "Emerald Garden",
    location: "Menteng, Jakarta Pusat",
    capacityText: "Kapasitas hingga 350 tamu",
    imageUrl: "/images/venue-emerald-garden.jpg",
    isAvailable: true,
  },
];

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

export default function OrderStep1Page() {
  const router = useRouter();
  const params = useParams();
  const orderId = params?.orderId as string;

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(2024, 5, 13),
  );
  const [selectedVenueId, setSelectedVenueId] = useState<string | undefined>(
    "venue-1",
  );
  const mounted = useHasMounted();

  const isDateDisabled = (date: Date) => {
    return FULLY_BOOKED_DATES.some(
      (bookedDate) =>
        bookedDate.getDate() === date.getDate() &&
        bookedDate.getMonth() === date.getMonth() &&
        bookedDate.getFullYear() === date.getFullYear(),
    );
  };

  const handleSaveDraft = async () => {
    // TODO: call api.patch to save draft state for this orderId
    console.log("Saving draft...", { selectedDate, selectedVenueId, orderId });
  };

  const handleNextStep = () => {
    if (selectedDate && selectedVenueId) {
      router.push(`/order/${orderId}/step-2`);
    }
  };

  return (
    <div className="w-full space-y-8">
      {/* Heading Block */}
      <div className="space-y-1">
        <h1 className="font-serif text-3xl font-bold text-primary">
          Pilih Tanggal & Gedung Pernikahan
        </h1>
        <p className="text-sm text-muted-foreground">
          {SELECTED_PACKAGE_CONTEXT.name} — {SELECTED_PACKAGE_CONTEXT.capacity}
        </p>
      </div>

      {/* Two Column Workspace Split */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* ── LEFT COLUMN: CALENDAR DATE PICKER ── */}
        <div className="space-y-4">
          <div className="bg-background rounded-2xl border border-border p-6 shadow-sm flex flex-col items-center">
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              locale={id}
              disabled={isDateDisabled}
              defaultMonth={new Date(2024, 5)}
              formatters={{
                formatWeekdayName: (date) => {
                  const days = [
                    "MIN",
                    "SEN",
                    "SEL",
                    "RAB",
                    "KAM",
                    "JUM",
                    "SAB",
                  ];
                  return days[date.getDay()];
                },
              }}
              classNames={{
                months: "w-full",
                month: "space-y-6 w-full",
                month_caption:
                  "flex justify-between items-center relative px-2 py-1",
                caption_label:
                  "text-base font-serif font-bold text-primary uppercase tracking-wide flex-1 text-center",
                nav: "flex items-center justify-between w-full absolute inset-0 pointer-events-none z-10",
                button_previous:
                  "h-8 w-8 bg-transparent p-0 opacity-70 hover:opacity-100 transition-opacity pointer-events-auto flex items-center justify-center",
                button_next:
                  "h-8 w-8 bg-transparent p-0 opacity-70 hover:opacity-100 transition-opacity pointer-events-auto flex items-center justify-center",
                month_grid: "w-full border-collapse space-y-1",
                weekdays:
                  "flex w-full justify-between mb-2 border-b border-border/40 pb-2",
                weekday:
                  "text-muted-foreground rounded-md w-9 font-semibold text-center text-xs uppercase tracking-wider flex-1",
                week: "flex w-full justify-between mt-1",
                // "day" is the grid cell (<td>); "day_button" is the interactive
                // element inside it. Modifier keys below (selected/disabled/
                // outside) land on the cell, so we reach into the child button
                // via [&>button] to actually color the visible element.
                day: "text-center text-sm p-0 relative flex-1 focus-within:relative focus-within:z-20",
                day_button:
                  "h-9 w-9 p-0 font-normal text-center mx-auto flex items-center justify-center rounded-md hover:bg-muted/80 transition-colors cursor-pointer text-foreground",
                selected:
                  "[&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:hover:bg-primary [&>button]:hover:text-primary-foreground [&>button]:font-semibold [&>button]:shadow-sm",
                disabled:
                  "[&>button]:text-muted-foreground/40 [&>button]:opacity-40 [&>button]:cursor-not-allowed [&>button]:hover:bg-transparent",
                outside:
                  "[&>button]:text-muted-foreground/20 [&>button]:opacity-30",
              }}
              components={{
                // v10 replaced separate IconLeft/IconRight slots with a single
                // Chevron component distinguished by the `orientation` prop.
                Chevron: ({ orientation, className, ...props }) =>
                  orientation === "left" ? (
                    <ChevronLeft
                      className={cn(
                        "h-5 w-5 text-muted-foreground hover:text-primary transition-colors",
                        className,
                      )}
                      {...props}
                    />
                  ) : (
                    <ChevronRight
                      className={cn(
                        "h-5 w-5 text-muted-foreground hover:text-primary transition-colors",
                        className,
                      )}
                      {...props}
                    />
                  ),
              }}
            />

            {/* Calendar Legend Indicators Row */}
            <div className="flex items-center gap-6 border-t border-border/50 w-full pt-4 mt-2 justify-center text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-primary block" />
                <span>Pilihan Anda</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-muted-foreground/30 block" />
                <span>Penuh</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN: VENUE CARDS LIST ── */}
        <div className="space-y-4">
          {VENUES.map((venue) => {
            const isSelected = selectedVenueId === venue.id;

            return (
              <div
                key={venue.id}
                onClick={() =>
                  venue.isAvailable && setSelectedVenueId(venue.id)
                }
                className={cn(
                  "rounded-xl border overflow-hidden transition-all flex flex-col md:flex-row group",
                  !venue.isAvailable
                    ? "opacity-60 cursor-not-allowed bg-muted/30 border-border"
                    : isSelected
                      ? "border-accent ring-1 ring-accent shadow-md bg-background cursor-pointer"
                      : "border-border bg-background cursor-pointer hover:shadow-md",
                )}
              >
                {/* Left Side: Photo View Frame */}
                <div className="relative w-full md:w-2/5 aspect-[4/3] shrink-0 bg-muted">
                  <Image
                    src={venue.imageUrl}
                    alt={venue.name}
                    fill
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>

                {/* Right Side: Meta Data Details Content Block */}
                <div className="p-5 flex flex-col justify-between flex-1 relative min-w-0">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-serif text-lg text-primary font-semibold leading-snug truncate">
                        {venue.name}
                      </h3>
                      <span
                        className={cn(
                          "text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full uppercase shrink-0 mt-0.5",
                          venue.isAvailable
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-muted text-muted-foreground",
                        )}
                      >
                        {venue.isAvailable ? "TERSEDIA" : "PENUH"}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 text-muted-foreground/70 shrink-0" />
                        <span className="truncate">{venue.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4 text-accent shrink-0" />
                        <span className="truncate">{venue.capacityText}</span>
                      </div>
                    </div>
                  </div>

                  {/* Absolute positioning mapping selector target loop validation UI inside single wrapper block */}
                  <div className="absolute bottom-4 right-4 mt-4 md:mt-0">
                    {isSelected ? (
                      <CheckCircle2 className="h-5 w-5 text-accent shrink-0" />
                    ) : (
                      <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/30 shrink-0" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── FIXED LAYOUT BOTTOM ACTION FOOTER PORTAL CONTENT ── */}
      {mounted &&
        createPortal(
          <div className="flex h-20 items-center justify-between w-full">
            {/* Price breakdown status visualization panel */}
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">
                ESTIMASI TOTAL
              </span>
              <span className="text-lg font-serif font-bold text-primary">
                {SELECTED_PACKAGE_CONTEXT.estimatedBasePrice}
              </span>
            </div>

            {/* Core submission execution button wrappers */}
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleSaveDraft}
                className="rounded-full border-border text-foreground font-medium px-5 h-11 text-sm hidden sm:inline-flex"
              >
                Simpan Sebagai Draft
              </Button>

              <Button
                type="button"
                onClick={handleNextStep}
                disabled={!selectedDate || !selectedVenueId}
                className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-6 h-11 text-sm inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Lanjut ke MUA
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>,
          document.getElementById("step-actions-slot")!,
        )}
    </div>
  );
}
