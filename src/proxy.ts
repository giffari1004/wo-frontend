import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_COOKIE_NAMES } from "@/lib/auth-constants";

export function proxy(req: NextRequest) {
  const token = req.cookies.get(AUTH_COOKIE_NAMES.token)?.value;
  const role = req.cookies.get(AUTH_COOKIE_NAMES.role)?.value;
  const path = req.nextUrl.pathname;

  const isProtectedRoute =
    path.startsWith("/dashboard") ||
    path.startsWith("/order") ||
    path.startsWith("/admin");

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (path.startsWith("/admin") && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/order/:path*", "/admin/:path*"],
};
