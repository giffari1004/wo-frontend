import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  XCircle,
  Plus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SelectPackageButton } from "../../components/SelectPackageButton";

// --- Data Types & Mock Data ---
interface PackageFeature {
  text: string;
  included: boolean;
}

interface PackageTier {
  id: string;
  name: string;
  description: string;
  price: string;
  features: PackageFeature[];
  isPopular?: boolean;
}

const PACKAGES: PackageTier[] = [
  {
    id: "cm123silver1234567890123",
    name: "Silver",
    description: "Untuk perayaan intim dan elegan.",
    price: "IDR 50M",
    features: [
      { text: "Venue Standard", included: true },
      { text: "Catering 100 Pax", included: true },
      { text: "MUA & Attire Basic", included: true },
      { text: "Dekorasi Premium", included: false },
    ],
  },
  {
    id: "cm123gold123456789012345",
    name: "Gold",
    description: "Pilihan seimbang untuk kemewahan modern.",
    price: "IDR 100M",
    isPopular: true,
    features: [
      { text: "Venue Premium", included: true },
      { text: "Catering 300 Pax", included: true },
      { text: "MUA & Attire Premium", included: true },
      { text: "Dekorasi Custom Mid-tier", included: true },
    ],
  },
  {
    id: "cm123platinum12345678901",
    name: "Platinum",
    description: "Pengalaman tak terlupakan tanpa kompromi.",
    price: "IDR 200M",
    features: [
      { text: "Venue Luxury Exclusive", included: true },
      { text: "Catering 500+ Pax", included: true },
      { text: "MUA Top Tier", included: true },
      { text: "Full Custom Luxury Decor", included: true },
    ],
  },
];

const TESTIMONIALS = [
  {
    name: "SARAH & DIMAS",
    meta: "Paket Platinum, 2023",
    quote:
      "Janji Seiring benar-benar mewujudkan pernikahan impian kami. Timnya sangat profesional dan detail-oriented. Kami bisa menikmati hari H tanpa stres sedikitpun.",
  },
  {
    name: "AMANDA & RIO",
    meta: "Paket Gold, 2024",
    quote:
      "Elegan, terstruktur, dan sangat memahami visi kami. Dekorasi dan pilihan vendor dari mereka sangat luar biasa. Sangat direkomendasikan untuk pasangan yang sibuk.",
  },
  {
    name: "CHELSEA & KEVIN",
    meta: "Paket Gold, 2023",
    quote:
      "Pendekatan mereka sangat personal. Mereka mendengarkan apa yang kami inginkan dan mengeksekusinya dengan sentuhan kemewahan yang tidak berlebihan. Sempurna.",
  },
];

const FAQS = [
  {
    question: "Kapan waktu terbaik untuk mulai memesan layanan Janji Seiring?",
    answer:
      "Kami menyarankan untuk menghubungi kami setidaknya 6 hingga 12 bulan sebelum tanggal pernikahan Anda untuk memastikan ketersediaan tim kami dan vendor-vendor premium yang kami rekomendasikan.",
  },
  {
    question: "Bagaimana sistem pembayaran untuk paket pernikahan?",
    answer:
      "Sistem pembayaran kami menggunakan skema 50% Down Payment (DP) sebagai komitmen awal pemesanan jadwal. Sisa pelunasan 50% wajib diselesaikan sebelum hari pelaksanaan melalui transfer bank manual yang akan diverifikasi oleh admin kami.",
  },
  {
    question: "Apakah paket bisa disesuaikan (custom)?",
    answer:
      "Tentu saja. Anda dapat melakukan penyesuaian atau upgrade pada vendor individu di dalam paket yang dipilih agar sesuai kebutuhan. Opsi penyesuaian ini dapat diakses secara transparan pada langkah pemilihan vendor saat proses pemesanan berlangsung.",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* ── 1. HERO SECTION ── */}
      <section className="container mx-auto px-4 md:px-8 py-12 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Column Info */}
        <div className="space-y-6 max-w-xl">
          <span className="text-xs font-semibold tracking-widest text-accent uppercase block">
            PREMIUM WEDDING PLANNER
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight">
            Wujudkan Pernikahan Impian{" "}
            <span className="italic text-accent">Tanpa</span>{" "}
            <span className="italic text-accent">Ragu</span>.
          </h1>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            Perencanaan profesional untuk momen abadi Anda. Kami merangkai
            setiap detail dengan presisi dan keanggunan, memastikan hari
            istimewa Anda berjalan sempurna.
          </p>
          <div className="pt-2">
            <Button
              asChild
              className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-6 h-12 inline-flex items-center gap-2 group"
            >
              <Link href="#paket">
                Lihat Paket Pernikahan
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Right Column Image Component Showcase */}
        <div className="relative w-full aspect-4/3 md:aspect-square max-w-lg mx-auto flex items-center justify-center">
          {/* Layered Decorative Shadow Layout Backdrop */}
          <div className="absolute inset-0 bg-accent/10 rounded-2xl transform -rotate-3 transition-transform duration-300" />

          {/* Main Image Layer Wrapper */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-xl transform rotate-2 transition-transform duration-300">
            <Image
              src="/images/hero-wedding.jpg"
              alt="Pernikahan Impian Janji Seiring"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* ── 2. PACKAGE SECTION ── */}
      <section
        id="paket"
        className="container mx-auto px-4 md:px-8 py-20 bg-background"
      >
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary">
            Pilih Paket Pernikahan Impian Anda
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Kurasi layanan eksklusif yang dirancang untuk memenuhi visi dan
            kebutuhan perayaan Anda, dari yang intim hingga yang paling megah.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 items-stretch pt-4">
          {PACKAGES.map((tier) => (
            <div
              key={tier.id}
              className={`relative rounded-2xl border bg-background p-8 shadow-sm flex flex-col justify-between transition-all duration-300 ${
                tier.isPopular
                  ? "border-accent shadow-lg md:-mt-4 md:mb-4 z-10"
                  : "border-border"
              }`}
            >
              {tier.isPopular && (
                <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-accent text-white text-[10px] font-bold tracking-widest px-4 py-1 rounded-full shadow-sm uppercase whitespace-nowrap">
                  PALING POPULER
                </span>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-primary mb-1">
                    {tier.name}
                  </h3>
                  <p className="text-sm text-muted-foreground min-h-10">
                    {tier.description}
                  </p>
                </div>

                <div className="font-serif text-3xl md:text-4xl font-bold italic text-accent py-2">
                  {tier.price}
                </div>

                {/* Feature checklist details */}
                <ul className="space-y-3 pt-2">
                  {tier.features.map((feat, index) => (
                    <li
                      key={index}
                      className={`flex items-start gap-3 text-sm ${
                        feat.included
                          ? "text-foreground"
                          : "text-muted-foreground/50"
                      }`}
                    >
                      {feat.included ? (
                        <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="h-5 w-5 text-muted-foreground/40 shrink-0 mt-0.5" />
                      )}
                      <span className="leading-tight">{feat.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <SelectPackageButton
                  tierId={tier.id}
                  tierName={tier.name}
                  isPopular={tier.isPopular}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. PORTFOLIO SECTION ── */}
      <section
        id="vendor"
        className="container mx-auto px-4 md:px-8 py-20 bg-background"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-xl">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary">
              Momen Bahagia yang Telah Kami Wujudkan
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Sebuah galeri memori abadi. Dedikasi kami terlihat dalam setiap
              senyum dan keindahan visual yang kami ciptakan.
            </p>
          </div>
          <div className="shrink-0">
            <Link
              href="#"
              className="inline-flex items-center gap-1.5 text-accent text-sm font-semibold uppercase tracking-wide hover:underline transition-all"
            >
              Lihat Portfolio Lengkap
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Dynamic Asymmetric Grid Display Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:col-span-2">
            {/* Left Big Panel Frame */}
            <div className="relative aspect-4/5 md:aspect-3/4 md:row-span-2 rounded-xl overflow-hidden shadow-sm bg-muted">
              <Image
                src="/images/portfolio-1.png"
                alt="Dokumentasi Portofolio Janji Seiring 1"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Top Right Mini Frame Container */}
            <div className="relative aspect-4/2.5 rounded-xl overflow-hidden shadow-sm bg-muted">
              <Image
                src="/images/portfolio-2.png"
                alt="Dokumentasi Portofolio Janji Seiring 2"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
            </div>

            {/* Bottom Right Inner Frame Wrapper */}
            <div className="relative aspect-4/2.5 rounded-xl overflow-hidden shadow-sm bg-muted">
              <Image
                src="/images/portfolio-3.jpg"
                alt="Dokumentasi Portofolio Janji Seiring 3"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
            </div>
          </div>

          {/* Bottom Full Horizontal Panoramic View Cover */}
          <div className="relative aspect-video md:col-span-2 rounded-xl overflow-hidden shadow-sm bg-muted">
            <Image
              src="/images/portfolio-4.jpg"
              alt="Dokumentasi Portofolio Pemandangan Penuh"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
              sizes="100vw"
            />
          </div>
        </div>
      </section>

      {/* ── 4. TESTIMONIAL SECTION ── */}
      <section
        id="testimoni"
        className="w-full bg-accent/5 py-24 border-y border-border/50"
      >
        <div className="container mx-auto px-4 md:px-8 text-center">
          <div className="font-serif text-accent/30 text-7xl leading-none h-6 select-none pointer-events-none">
            &ldquo;
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mt-4 mb-16">
            Kisah Mereka Bersama Kami
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {TESTIMONIALS.map((testi, i) => (
              <div
                key={i}
                className="bg-background rounded-xl p-6 shadow-sm flex flex-col justify-between border border-border/40 hover:shadow-md transition-shadow duration-300"
              >
                <p className="text-sm italic text-foreground/80 leading-relaxed mb-6">
                  &ldquo;{testi.quote}&rdquo;
                </p>
                <div className="space-y-0.5 border-t border-border/40 pt-4">
                  <h4 className="text-xs font-semibold tracking-wide text-primary uppercase">
                    {testi.name}
                  </h4>
                  <p className="text-[11px] text-muted-foreground">
                    {testi.meta}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. FAQ SECTION ── */}
      <section
        id="kontak"
        className="container mx-auto px-4 md:px-8 py-20 max-w-4xl"
      >
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary">
            Pertanyaan yang Sering Diajukan
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-4 w-full">
          {FAQS.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`faq-${index}`}
              className="rounded-xl border border-border bg-background px-6 transition-all duration-200"
            >
              <AccordionTrigger
                hideChevron
                className="font-medium text-left text-foreground hover:text-primary py-4 hover:no-underline flex justify-between items-center group"
              >
                <span className="text-sm md:text-base font-semibold leading-snug">
                  {faq.question}
                </span>
                <Plus className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 group-data-[state=open]:rotate-45" />
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pt-1 pb-5 border-t border-border/40 mt-1">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
}
