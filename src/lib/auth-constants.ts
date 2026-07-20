// File ini SENGAJA tidak diberi "use client" — isinya cuma constant & type
// biasa (bukan fungsi yang sentuh document/browser API), supaya aman
// diimpor baik dari Server Component maupun Client Component tanpa masalah
// resolusi module di RSC boundary.

export type UserRole = "CLIENT" | "ADMIN";

export const AUTH_COOKIE_NAMES = {
  token: "token",
  role: "role",
  name: "user_name",
} as const;
