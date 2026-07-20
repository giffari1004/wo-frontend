import Link from "next/link";
import { cookies } from "next/headers";

import { AUTH_COOKIE_NAMES, type UserRole } from "@/lib/auth-constants";
import { NavAuthArea } from "./_components/NavAuthArea";
import { MobileNav } from "./_components/MobileNav";

interface PublicLayoutProps {
  children: React.ReactNode;
}

const NAV_LINKS = [
  { name: "PAKET", href: "/#paket" },
  { name: "VENDOR", href: "/#vendor" },
  { name: "TESTIMONI", href: "/#testimoni" },
  { name: "KONTAK", href: "/#kontak" },
];

export default async function PublicLayout({ children }: PublicLayoutProps) {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAMES.token)?.value ?? null;
  const role =
    (cookieStore.get(AUTH_COOKIE_NAMES.role)?.value as UserRole | undefined) ??
    null;
  const userName = cookieStore.get(AUTH_COOKIE_NAMES.name)?.value ?? null;
  const isLoggedIn = Boolean(token);

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
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium tracking-wide text-foreground/70 hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Area — Avatar+dropdown kalau login, tombol LOGIN kalau belum */}
          <div className="hidden md:block">
            <NavAuthArea
              isLoggedIn={isLoggedIn}
              userName={userName}
              userRole={role}
            />
          </div>

          {/* Mobile: hamburger + panel, termasuk versi mobile dari auth area */}
          <MobileNav
            navLinks={NAV_LINKS}
            isLoggedIn={isLoggedIn}
            userName={userName}
            userRole={role}
          />
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
