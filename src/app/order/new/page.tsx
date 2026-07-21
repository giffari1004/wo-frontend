"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { api } from "@/lib/api";

export default function NewOrderPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Ambil packageId dari query URL (misal: /order/new?package=cuid_gold_123)
  const packageId = searchParams.get("package");
  const isCreating = useRef(false);

  useEffect(() => {
    if (isCreating.current) return;
    isCreating.current = true;

    async function createDraft() {
      try {
        if (!packageId) {
          router.replace("/#paket");
          return;
        }

        // Body request sesuai dengan createOrderDraftSchema { packageId: string }
        const res = await api.post("/orders", { packageId });

        // Response format dari sendSuccess biasanya res.data.data
        const orderId = res.data?.data?.id;

        if (orderId) {
          // Redirect ke step-1 dengan orderId resmi dari DB
          router.replace(`/order/${orderId}/step-1`);
        } else {
          router.replace("/");
        }
      } catch (error) {
        console.error("Gagal membuat draft order:", error);
        router.replace("/");
      }
    }

    createDraft();
  }, [packageId, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <Loader2 className="h-8 w-8 animate-spin text-accent mb-2" />
      <p className="text-sm text-muted-foreground font-medium">
        Menyiapkan formulir pemesanan...
      </p>
    </div>
  );
}
