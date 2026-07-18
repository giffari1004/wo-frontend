import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const role = req.cookies.get("role")?.value;
  const path = req.nextUrl.pathname;

  if (
    path.startsWith("/dashboard") ||
    path.startsWith("/order") ||
    path.startsWith("/admin")
  ) {
    if (!token) return NextResponse.redirect(new URL("/login", req.url));
  }
  if (path.startsWith("/admin") && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/order/:path*", "/admin/:path*"],
};
