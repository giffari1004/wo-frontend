"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface PublicLayoutProps {
  children: React.ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const navLinks = [
    { name: "PAKET", href: "/#paket" },
    { name: "VENDOR", href: "/#vendor" },
    { name: "TESTIMONI", href: "/#testimoni" },
    { name: "KONTAK", href: "/#kontak" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* ── NAVBAR ── */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-9 w-9 rounded-md bg-muted flex-shrink-0" />
            <span className="font-serif italic text-lg text-primary tracking-wide">
              Janji Seiring
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium tracking-wide text-foreground/70 hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Action Button */}
          <div className="hidden md:block">
            <Button
              asChild
              className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold tracking-wider px-6 h-10 uppercase"
            >
              <Link href="/login">LOGIN</Link>
            </Button>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors focus:outline-none"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        <div
          className={cn(
            "md:hidden w-full bg-background border-b border-border transition-all duration-300 ease-in-out overflow-hidden",
            isMobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <div className="px-4 pt-2 pb-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-medium tracking-wide text-foreground/70 hover:text-primary py-1 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Button
              asChild
              className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold tracking-wider w-full h-11 uppercase mt-2"
            >
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                LOGIN
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* ── MAIN CONTENT ── */}
      <main className="flex-1">{children}</main>

      {/* ── FOOTER ── */}
      <footer className="w-full bg-muted border-t border-border pt-16 pb-12 mt-auto">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
            {/* Column 1: Brand Info */}
            <div className="space-y-4">
              <h2 className="font-serif italic text-2xl text-primary">
                Janji Seiring
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                Menciptakan perayaan cinta yang elegan, terstruktur, dan tak
                terlupakan.
              </p>
              <div className="pt-4">
                <p className="text-xs text-muted-foreground">
                  &copy; 2024 Janji Seiring. Crafting Eternal Moments.
                </p>
              </div>
            </div>

            {/* Column 2: Menu */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold tracking-wide text-foreground uppercase">
                MENU
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Portfolio
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Planning Tools
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Informasi */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold tracking-wide text-foreground uppercase">
                INFORMASI
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Kantor Kami */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold tracking-wide text-foreground uppercase">
                KANTOR KAMI
              </h3>
              <div className="text-sm text-muted-foreground space-y-1 leading-relaxed">
                <p>Jl. Sudirman Kav. 50</p>
                <p>Jakarta Selatan, 12190</p>
                <p>Indonesia</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
