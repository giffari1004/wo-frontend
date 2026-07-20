"use client";

import { AUTH_COOKIE_NAMES, type UserRole } from "@/lib/auth-constants";

export { AUTH_COOKIE_NAMES, type UserRole };

const TOKEN_COOKIE = AUTH_COOKIE_NAMES.token;
const ROLE_COOKIE = AUTH_COOKIE_NAMES.role;
const NAME_COOKIE = AUTH_COOKIE_NAMES.name;
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 hari

/**
 * Simpan token, role, & nama setelah login/register berhasil.
 * Pakai cookie (bukan localStorage) karena middleware.ts (server-side,
 * Edge runtime) hanya bisa membaca cookie request, tidak bisa akses
 * localStorage sama sekali.
 */
export function setSession(token: string, role: UserRole, name: string) {
  document.cookie = `${TOKEN_COOKIE}=${encodeURIComponent(token)}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
  document.cookie = `${ROLE_COOKIE}=${role}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
  document.cookie = `${NAME_COOKIE}=${encodeURIComponent(name)}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
}

/** Hapus session — dipanggil saat logout. */
export function clearSession() {
  document.cookie = `${TOKEN_COOKIE}=; path=/; max-age=0`;
  document.cookie = `${ROLE_COOKIE}=; path=/; max-age=0`;
  document.cookie = `${NAME_COOKIE}=; path=/; max-age=0`;
}

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null; // guard untuk SSR
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export function getToken(): string | null {
  return readCookie(TOKEN_COOKIE);
}

export function getRole(): UserRole | null {
  return readCookie(ROLE_COOKIE) as UserRole | null;
}

export function getUserName(): string | null {
  return readCookie(NAME_COOKIE);
}

/** Redirect tujuan berdasarkan role — satu sumber kebenaran dipakai di
 * Login, Register (kalau auto-login), dan tempat lain yang butuh logic ini.
 * CLIENT diarahkan ke landing page ("/"), ADMIN ke "/admin". */
export function getRedirectPathForRole(role: UserRole): string {
  return role === "ADMIN" ? "/admin" : "/";
}
