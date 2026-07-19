import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface AuthLayoutProps {
  children: ReactNode;
  backgroundImageSrc?: string;
  tagline?: string;
}

export default function AuthLayout({
  children,
  backgroundImageSrc = "/images/login-foto.jpg",
  tagline = "Wujudkan hari bahagia Anda tanpa ribet",
}: AuthLayoutProps) {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[11fr_9fr]">
      {/* Left Side: Visual Showcase (Hidden on Mobile) */}
      <div className="relative hidden bg-muted lg:block">
        <Image
          src={backgroundImageSrc}
          alt="Janji Seiring Authentication Hero"
          fill
          priority
          className="object-cover"
          sizes="55vw"
        />

        {/* Navy Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-primary/90 via-primary/40 to-transparent" />

        {/* Branding (Top-Left) */}
        <div className="absolute left-10 top-10 z-10">
          <Link
            href="/"
            className="font-serif text-3xl font-semibold tracking-wide text-primary-foreground"
          >
            Janji Seiring
          </Link>
        </div>

        {/* Tagline (Bottom-Left) */}
        <div className="absolute bottom-16 left-10 right-10 z-10">
          <h1 className="max-w-xl font-serif text-4xl font-medium leading-tight text-primary-foreground drop-shadow-sm">
            {tagline}
          </h1>
        </div>
      </div>

      {/* Right Side: Form Container */}
      <div className="relative flex flex-col justify-center bg-background px-6 py-12 sm:px-8 lg:px-12">
        {/* Back to Home Navigation Link */}
        <div className="absolute left-6 top-8 sm:left-8 lg:left-12">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            <span>Kembali ke Beranda</span>
          </Link>
        </div>

        {/* Content Centering Area */}
        <div className="mx-auto w-full max-w-sm">{children}</div>
      </div>
    </div>
  );
}
