import type { Metadata } from "next";
import { Providers } from "@/lib/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Janji Seiring — Wedding Organizer",
  description: "Wujudkan pernikahan impian Anda tanpa ribet.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // scroll-smooth belongs on <html> — it's the actual scrolling context for
    // anchor-link navigation (e.g. href="#paket"). Putting it on a nested
    // <div> has no effect since that div isn't what scrolls.
    <html lang="id" className="scroll-smooth">
      <body className="bg-background text-foreground antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
