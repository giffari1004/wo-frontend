"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface OrderLayoutProps {
  children: ReactNode;
  params: {
    orderId: string;
  };
}

const STEPS = [
  { pathSegment: "step-1", label: "1. Tanggal & Lokasi", shortLabel: "Lokasi" },
  { pathSegment: "step-2", label: "2. MUA", shortLabel: "MUA" },
  { pathSegment: "step-3", label: "3. Fotografer", shortLabel: "Dokumentasi" },
  { pathSegment: "step-4", label: "4. Dekorasi", shortLabel: "Dekorasi" },
  { pathSegment: "step-5", label: "5. Catering", shortLabel: "Catering" },
  { pathSegment: "step-6", label: "6. Review", shortLabel: "Review" },
];

export default function OrderLayout({ children }: OrderLayoutProps) {
  const pathname = usePathname();

  const currentStepIndex = STEPS.findIndex((step) =>
    pathname.includes(step.pathSegment),
  );
  const activeIndex = currentStepIndex !== -1 ? currentStepIndex : 0;
  const displayStepNumber = activeIndex + 1;
  const progressPercent = ((activeIndex + 1) / STEPS.length) * 100;

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans antialiased">
      {/* ── Top Bar Header ──────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b border-border bg-background px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="font-serif text-2xl font-semibold tracking-wide text-primary"
        >
          Janji Seiring
        </Link>
        <Link
          href="/dashboard"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Simpan & Keluar
        </Link>
      </header>

      {/* ── Horizontal Stepper / Responsive Progress ───────────────────── */}
      <div className="w-full bg-background py-6 shadow-sm">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Desktop/Tablet Full Stepper (md breakpoint and up) */}
          <nav className="relative hidden md:block">
            <div
              className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-border"
              aria-hidden="true"
            />
            <div
              className="absolute left-0 top-1/2 h-0.5 -translate-y-1/2 bg-primary transition-all duration-300 ease-in-out"
              style={{ width: `${(activeIndex / (STEPS.length - 1)) * 100}%` }}
              aria-hidden="true"
            />

            <ol className="relative flex justify-between">
              {STEPS.map((step, idx) => {
                const isCompleted = idx < activeIndex;
                const isActive = idx === activeIndex;

                return (
                  <li
                    key={step.pathSegment}
                    className="flex flex-col items-center bg-background px-2"
                  >
                    <div
                      className={cn(
                        "relative z-10 flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-all duration-300",
                        isCompleted
                          ? "bg-primary text-primary-foreground"
                          : isActive
                            ? "bg-primary text-primary-foreground ring-4 ring-accent/30"
                            : "border-2 border-border bg-background text-muted-foreground",
                      )}
                    >
                      {isCompleted ? (
                        <Check className="h-4 w-4 stroke-[3]" />
                      ) : (
                        <span>{idx + 1}</span>
                      )}
                      {isActive && (
                        <div className="absolute -bottom-1 h-0.5 w-full rounded-full bg-accent" />
                      )}
                    </div>

                    <span
                      className={cn(
                        "absolute top-10 whitespace-nowrap text-xs font-medium tracking-wide transition-colors",
                        isActive
                          ? "font-bold text-primary"
                          : isCompleted
                            ? "text-foreground/80"
                            : "text-muted-foreground",
                      )}
                    >
                      {step.label}
                    </span>
                  </li>
                );
              })}
            </ol>
          </nav>

          {/* Mobile Linear Stepper Indicator (below md breakpoint) */}
          <div className="block md:hidden">
            <div className="mb-2 flex items-center justify-between text-sm font-medium text-primary">
              <span className="font-serif text-base font-semibold">
                {STEPS[activeIndex].shortLabel}
              </span>
              <span className="text-xs text-muted-foreground">
                Step {displayStepNumber} dari 6
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
              <div
                className="h-full rounded-full bg-primary transition-all duration-300 ease-in-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Content Area ───────────────────────────────────────────── */}
      {/* pb-28 reserves space so the fixed step-actions bar never obscures form content */}
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 pb-28 md:py-16">
        <div className="w-full">{children}</div>
      </main>

      {/* ── Sticky Bottom Bar Placeholder — each step page renders its own Back/Next buttons here ── */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background shadow-[0_-4px_12px_rgba(31,42,68,0.05)]">
        <div
          id="step-actions-slot"
          className="mx-auto h-20 w-full max-w-3xl px-4 md:px-0"
        />
      </footer>
    </div>
  );
}
