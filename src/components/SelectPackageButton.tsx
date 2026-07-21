"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getToken } from "@/lib/auth"; // Helper auth Anda

interface SelectPackageButtonProps {
  tierId: string;
  tierName: string;
  isPopular?: boolean;
}

export function SelectPackageButton({
  tierId,
  tierName,
  isPopular,
}: SelectPackageButtonProps) {
  const router = useRouter();

  const handleSelectPackage = () => {
    // Pengecekan token dilakukan secara instan saat tombol diklik
    const token = getToken();

    if (token) {
      // Jika sudah login -> Ke /order/new untuk generate orderId
      router.push(`/order/new?package=${tierId}`);
    } else {
      // Jika belum login -> Ke /register
      router.push(`/register?package=${tierId}`);
    }
  };

  return (
    <Button
      onClick={handleSelectPackage}
      variant={isPopular ? "default" : "outline"}
      className={`w-full rounded-full h-11 transition-colors font-medium tracking-wide ${
        isPopular
          ? "bg-primary hover:bg-primary/90 text-primary-foreground"
          : "border-accent text-accent hover:bg-accent/10"
      }`}
    >
      Pilih {tierName}
    </Button>
  );
}
