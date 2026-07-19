import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  BadgeCheck,
  Users,
  ArrowRight,
  ArrowUpRight,
  Landmark,
  Sparkles,
  Camera,
  Flower2,
  UtensilsCrossed,
  Info,
  Plus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface VendorInfo {
  category: "Gedung" | "MUA" | "Fotografer" | "Dekorasi" | "Catering";
  vendorSummary: string;
}

interface PackageDetails {
  id: string;
  name: string;
  isPopular: boolean;
  heroImage: string;
  price: string;
  guestCapacity: string;
  description: string;
  vendors: VendorInfo[];
}

const PACKAGES: PackageDetails[] = [
  {
    id: "silver",
    name: "Silver",
    isPopular: false,
    heroImage: "/images/paket-silver-hero.jpg",
    price: "Rp 50.000.000",
    guestCapacity: "Hingga 150 tamu",
    description:
      "Kombinasi ideal untuk perayaan yang hangat, intim, dan tetap elegan. Paket Silver menyediakan semua kebutuhan esensial pernikahan dengan kualitas terbaik tanpa mengorbankan keindahan momen berharga Anda. Dipandu oleh tim profesional untuk memastikan acara berjalan lancar.",
    vendors: [
      {
        category: "Gedung",
        vendorSummary:
          "Standard Hall - Akses penuh 8 jam, fasilitas pencahayaan standar & AC lengkap.",
      },
      {
        category: "MUA",
        vendorSummary:
          "Grace Makeup - Rias pengantin premium untuk akad dan resepsi, tanpa retouch.",
      },
      {
        category: "Fotografer",
        vendorSummary:
          "Kilas Memori - 1 fotografer, 1 videografer, penyerahan seluruh file digital terkurasi.",
      },
      {
        category: "Dekorasi",
        vendorSummary:
          "Indah Dekor - Pelaminan minimalis modern dengan kombinasi bunga artificial 70%.",
      },
      {
        category: "Catering",
        vendorSummary:
          "Rasa Utama - Hidangan prasmanan untuk 150 pax dengan pilihan menu nusantara populer.",
      },
    ],
  },
  {
    id: "gold",
    name: "Gold",
    isPopular: true,
    heroImage: "/images/paket-gold-hero.jpg",
    price: "Rp 100.000.000",
    guestCapacity: "Hingga 300 tamu",
    description:
      "Keseimbangan sempurna antara kemewahan dan kepraktisan. Paket Gold dirancang khusus untuk pasangan yang menginginkan perayaan elegan dengan vendor-vendor premium pilihan kami. Pengalaman perencana pernikahan yang mulus dan bebas stres, memastikan momen berharga Anda tak terlupakan.",
    vendors: [
      {
        category: "Gedung",
        vendorSummary:
          "Bali Ballroom - Akses penuh 12 jam, termasuk penggunaan ruang rias VIP khusus.",
      },
      {
        category: "MUA",
        vendorSummary:
          "Sarah Beauty - Rias pengantin eksklusif untuk akad & resepsi, termasuk retouch 1x.",
      },
      {
        category: "Fotografer",
        vendorSummary:
          "Lensa Abadi - 2 fotografer profesional, 1 videografer, cetak album fisik eksklusif.",
      },
      {
        category: "Dekorasi",
        vendorSummary:
          "Mekar Sari - Pelaminan mewah elegan, rangkaian bunga segar 80%, dekorasi seluruh area.",
      },
      {
        category: "Catering",
        vendorSummary:
          "Sajian Nusantara - Buffet 300 pax, 3 pilihan menu gubukan premium, serta hidangan penutup.",
      },
    ],
  },
  {
    id: "platinum",
    name: "Platinum",
    isPopular: false,
    heroImage: "/images/paket-platinum-hero.jpg",
    price: "Rp 200.000.000",
    guestCapacity: "Lebih dari 500 tamu",
    description:
      "Kemewahan mutlak tanpa kompromi untuk hari paling istimewa Anda. Paket Platinum menawarkan pelayanan lengkap kelas atas dengan jajaran vendor legendaris, dirancang khusus untuk menciptakan perayaan megah berskala besar yang spektakuler, penuh kemegahan, dan mengagumkan.",
    vendors: [
      {
        category: "Gedung",
        vendorSummary:
          "Luxury Grand Ballroom - Hotel Bintang 5, akses 12 jam, kapasitas luas & 2 ruang VIP.",
      },
      {
        category: "MUA",
        vendorSummary:
          "Royal Glam MUA - Rias pengantin mahakarya oleh MUA Top Tier nasional, unlimited retouch.",
      },
      {
        category: "Fotografer",
        vendorSummary:
          "Epic Moments - Full team dokumentasi cinematic, liputan drone udara, 2 edisi album premium.",
      },
      {
        category: "Dekorasi",
        vendorSummary:
          "Flora Agung - Full custom luxury decor thematic, 100% fresh flowers kualitas impor pilihan.",
      },
      {
        category: "Catering",
        vendorSummary:
          "Bintang Kuliner - Premium buffet 500+ pax, 5 gubukan internasional, live cooking station.",
      },
    ],
  },
];

const COMPARISON_ROWS = [
  {
    label: "Kapasitas Tamu",
    silver: "150 Orang",
    gold: "300 Orang",
    platinum: "500+ Orang",
  },
  {
    label: "Pilihan Venue",
    silver: "Standard",
    gold: "Premium (Ballroom)",
    platinum: "Luxury (Hotel Bintang 5)",
  },
  {
    label: "Tim Dokumentasi",
    silver: "1 Foto, 1 Video",
    gold: "2 Foto, 1 Video",
    platinum: "Full Team + Drone",
  },
  {
    label: "Dekorasi Bunga",
    silver: "Artificial 70%",
    gold: "Fresh Flower 80%",
    platinum: "Fresh Flower 100%",
  },
  {
    label: "Wedding Organizer",
    silver: "Hari H (4 Crew)",
    gold: "Full Planner (6 Crew)",
    platinum: "Full Planner (10 Crew)",
  },
];

const categoryIcons = {
  Gedung: Landmark,
  MUA: Sparkles,
  Fotografer: Camera,
  Dekorasi: Flower2,
  Catering: UtensilsCrossed,
};

export default function PackageDetailPage({
  params,
}: {
  params: { tier: string };
}) {
  const currentTier = params.tier.toLowerCase();
  const pkg = PACKAGES.find((p) => p.id === currentTier);

  if (!pkg) {
    notFound();
  }

  return (
    <div className="w-full pb-24 md:pb-12 bg-background">
      <div className="container mx-auto px-4 md:px-8 py-8 space-y-20">
        {/* ── 1. BREADCRUMB ── */}
        <nav className="text-xs text-muted-foreground flex items-center gap-2">
          <Link href="/" className="hover:text-primary transition-colors">
            Beranda
          </Link>
          <span>&gt;</span>
          <Link href="/#paket" className="hover:text-primary transition-colors">
            Paket
          </Link>
          <span>&gt;</span>
          <span className="text-foreground font-medium">Paket {pkg.name}</span>
        </nav>

        {/* ── 2. HERO SECTION ── */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-md bg-muted w-full">
            <Image
              src={pkg.heroImage}
              alt={`Ilustrasi Pernikahan ${pkg.name}`}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          <div className="space-y-6">
            {pkg.isPopular && (
              <div className="inline-flex items-center gap-1.5 bg-accent/10 text-accent rounded-full px-3 py-1 text-xs font-semibold">
                <BadgeCheck className="h-4 w-4" />
                <span>Most Popular</span>
              </div>
            )}

            <div className="space-y-2">
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary">
                Paket {pkg.name}
              </h1>
              <p className="font-serif text-xl text-primary font-semibold">
                Mulai dari {pkg.price}
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-5 w-5 text-accent shrink-0" />
              <span>{pkg.guestCapacity}</span>
            </div>

            <div className="border-t border-border" />

            <p className="text-sm text-muted-foreground leading-relaxed">
              {pkg.description}
            </p>

            <div className="pt-2 space-y-3">
              <Button
                asChild
                className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-8 h-12 inline-flex items-center gap-2"
              >
                <Link href={`/register?package=${pkg.id}`}>
                  Pilih Paket Ini
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <p className="text-xs text-muted-foreground italic block">
                *Silakan login terlebih dahulu untuk menyimpan preferensi dan
                memulai konsultasi.
              </p>
            </div>
          </div>
        </section>

        {/* ── 3. APA SAJA YANG ANDA DAPATKAN SECTION ── */}
        <section className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="font-serif text-3xl font-bold text-primary">
              Apa Saja yang Anda Dapatkan
            </h2>
            <p className="text-sm text-muted-foreground">
              Kurasi vendor premium untuk memastikan setiap detail pernikahan
              Anda sempurna.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pkg.vendors.map((vendor, index) => {
              const IconComponent = categoryIcons[vendor.category] || Landmark;
              return (
                <div
                  key={index}
                  className="bg-background rounded-xl border border-border p-6 flex flex-col justify-between space-y-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="space-y-4">
                    <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                      <IconComponent className="h-5 w-5 text-accent" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-serif text-lg text-primary font-semibold">
                        {vendor.category}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {vendor.vendorSummary}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Link
                      href="#"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-foreground hover:text-primary transition-colors uppercase tracking-wider"
                    >
                      Lihat Detail Vendor
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── 4. FLEKSIBILITAS UPGRADE CALLOUT ── */}
        <section>
          <div className="border-l-4 border-accent bg-background rounded-r-xl p-6 flex gap-4 items-start shadow-sm border border-border border-l-0">
            <Info className="h-5 w-5 text-accent shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-serif text-lg text-primary font-semibold">
                Fleksibilitas Upgrade
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Anda dapat melakukan upgrade pada vendor tertentu (misal:
                penambahan menu gubukan atau album foto ekstra) saat sesi
                konsultasi dengan perencana kami. Biaya tambahan akan
                disesuaikan secara transparan.
              </p>
            </div>
          </div>
        </section>

        {/* ── 5. BANDINGKAN PAKET COMPARISON TABLE ── */}
        <section className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="font-serif text-3xl font-bold text-primary">
              Bandingkan Paket
            </h2>
            <p className="text-sm text-muted-foreground">
              Temukan paket yang paling sesuai dengan kebutuhan perayaan Anda.
            </p>
          </div>

          <div className="w-full overflow-x-auto rounded-xl border border-border shadow-sm bg-background">
            <div className="min-w-3xl grid grid-cols-4 items-stretch text-center">
              {/* Header Titles */}
              <div className="text-left font-serif font-bold text-primary p-6 border-b border-border self-end text-sm">
                Fitur Utama
              </div>

              <div
                className={cn(
                  "p-6 border-b border-border flex flex-col justify-end items-center relative",
                  currentTier === "silver" ? "bg-accent/5" : "",
                )}
              >
                <span
                  className={cn(
                    "font-serif text-lg font-bold block",
                    currentTier === "silver"
                      ? "text-primary"
                      : "text-muted-foreground",
                  )}
                >
                  Silver
                </span>
              </div>

              <div
                className={cn(
                  "p-6 border-b border-border flex flex-col justify-end items-center relative",
                  currentTier === "gold" ? "bg-accent/5" : "",
                )}
              >
                {currentTier === "gold" && (
                  <span className="absolute top-2 bg-accent text-white text-[9px] font-bold px-2 py-0.5 rounded-full tracking-wider uppercase">
                    DISARANKAN
                  </span>
                )}
                <span
                  className={cn(
                    "font-serif text-lg font-bold block",
                    currentTier === "gold"
                      ? "text-primary"
                      : "text-muted-foreground",
                  )}
                >
                  Gold
                </span>
              </div>

              <div
                className={cn(
                  "p-6 border-b border-border flex flex-col justify-end items-center relative",
                  currentTier === "platinum" ? "bg-accent/5" : "",
                )}
              >
                {currentTier === "platinum" && (
                  <span className="absolute top-2 bg-accent text-white text-[9px] font-bold px-2 py-0.5 rounded-full tracking-wider uppercase">
                    DISARANKAN
                  </span>
                )}
                <span
                  className={cn(
                    "font-serif text-lg font-bold block",
                    currentTier === "platinum"
                      ? "text-primary"
                      : "text-muted-foreground",
                  )}
                >
                  Platinum
                </span>
              </div>

              {/* Matrix Rows Dynamic Binding Loop */}
              {COMPARISON_ROWS.map((row, idx) => (
                <React.Fragment key={idx}>
                  <div className="text-left text-sm font-medium text-foreground p-5 border-b border-border flex items-center bg-muted/20">
                    {row.label}
                  </div>
                  <div
                    className={cn(
                      "p-5 border-b border-border text-sm flex items-center justify-center",
                      currentTier === "silver"
                        ? "bg-accent/5 font-semibold text-primary"
                        : "text-muted-foreground",
                    )}
                  >
                    {row.silver}
                  </div>
                  <div
                    className={cn(
                      "p-5 border-b border-border text-sm flex items-center justify-center",
                      currentTier === "gold"
                        ? "bg-accent/5 font-semibold text-primary"
                        : "text-muted-foreground",
                    )}
                  >
                    {row.gold}
                  </div>
                  <div
                    className={cn(
                      "p-5 border-b border-border text-sm flex items-center justify-center",
                      currentTier === "platinum"
                        ? "bg-accent/5 font-semibold text-primary"
                        : "text-muted-foreground",
                    )}
                  >
                    {row.platinum}
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* ── 6. INSPIRASI PAKET PORTFOLIO PREVIEW ── */}
        <section className="space-y-8">
          <div className="space-y-2">
            <h2 className="font-serif text-2xl font-bold text-primary">
              Inspirasi Paket {pkg.name}
            </h2>
            <p className="text-sm text-muted-foreground">
              Momen indah dari pasangan yang memilih Paket {pkg.name}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Left Main Aspect Frame */}
            <div className="relative aspect-3/4 md:col-span-1 md:row-span-2 rounded-xl overflow-hidden shadow-sm bg-muted">
              <Image
                src={`/images/paket-${pkg.id}-1.jpg`}
                alt={`Inspirasi Galeri ${pkg.name} 1`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>

            {/* Top Right Mini Grid Frames */}
            <div className="relative aspect-4/3 rounded-xl overflow-hidden shadow-sm bg-muted">
              <Image
                src={`/images/paket-${pkg.id}-2.jpg`}
                alt={`Inspirasi Galeri ${pkg.name} 2`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="relative aspect-4/3 rounded-xl overflow-hidden shadow-sm bg-muted">
              <Image
                src={`/images/paket-${pkg.id}-3.jpg`}
                alt={`Inspirasi Galeri ${pkg.name} 3`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>

            {/* Bottom Panel Wide Spanning Container */}
            <div className="relative aspect-[16/9] md:col-span-2 rounded-xl overflow-hidden shadow-sm bg-muted">
              <Image
                src={`/images/paket-${pkg.id}-4.jpg`}
                alt={`Inspirasi Galeri ${pkg.name} 4`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 66vw"
              />
            </div>
          </div>
        </section>

        {/* ── 7. FAQ SECTION ── */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
          <div className="md:col-span-1 space-y-4">
            <h2 className="font-serif text-2xl font-bold text-primary">
              Pertanyaan Umum
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Informasi lebih lanjut mengenai Paket {pkg.name}.
            </p>
            <Link
              href="/#kontak"
              className="inline-flex items-center gap-1.5 text-accent font-semibold text-sm hover:underline"
            >
              Hubungi Kami
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="md:col-span-2">
            <Accordion type="single" collapsible className="space-y-4 w-full">
              <AccordionItem
                value="faq-1"
                className="rounded-xl border border-border bg-background px-6 transition-all duration-200"
              >
                <AccordionTrigger
                  hideChevron
                  className="group flex justify-between items-center py-4 text-left font-serif text-base font-semibold text-primary hover:no-underline"
                >
                  <span>Apakah bisa mengganti vendor dalam paket?</span>
                  <Plus className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 group-data-[state=open]:rotate-45" />
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pt-1 pb-5 border-t border-border/40 mt-1">
                  Tentu saja bisa. Anda dapat melakukan penyesuaian atau
                  penggantian mitra vendor yang terdaftar di dalam paket ini
                  saat memasuki langkah pemilihan vendor digital pada alur
                  pemesanan platform kami.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="faq-2"
                className="rounded-xl border border-border bg-background px-6 transition-all duration-200"
              >
                <AccordionTrigger
                  hideChevron
                  className="group flex justify-between items-center py-4 text-left font-serif text-base font-semibold text-primary hover:no-underline"
                >
                  <span>Bagaimana sistem pembayarannya?</span>
                  <Plus className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 group-data-[state=open]:rotate-45" />
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pt-1 pb-5 border-t border-border/40 mt-1">
                  Pembayaran dilakukan secara bertahap dimulai dari pembayaran
                  uang muka (DP) sebesar 50% untuk mengamankan tanggal acara.
                  Sisa pelunasan 50% dibayarkan sebelum hari pelaksanaan melalui
                  sistem transfer bank manual terverifikasi.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </div>

      {/* ── 8. MOBILE STICKY BOTTOM BAR ── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-background border-t border-border p-4 flex items-center justify-between gap-4 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground font-medium">
            Paket {pkg.name}
          </span>
          <span className="text-sm text-primary font-bold">{pkg.price}</span>
        </div>
        <Button
          asChild
          className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold px-5 h-10"
        >
          <Link href={`/register?package=${pkg.id}`}>Pilih Paket Ini</Link>
        </Button>
      </div>
    </div>
  );
}
