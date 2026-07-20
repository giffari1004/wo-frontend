"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  ShoppingBag,
} from "lucide-react";

import { api } from "@/lib/api";
import { setSession, getRedirectPathForRole } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const registerSchema = z
  .object({
    fullName: z.string().min(3, { message: "Nama lengkap wajib diisi" }),
    email: z
      .string()
      .min(1, { message: "Email wajib diisi" })
      .email({ message: "Email tidak valid" }),
    phone: z
      .string()
      .regex(/^08[0-9]{8,11}$/, { message: "Nomor HP tidak valid" }),
    password: z
      .string()
      .min(8, { message: "Password minimal 8 karakter" })
      .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\S]{8,}$/, {
        message: "Password minimal 8 karakter dengan kombinasi huruf dan angka",
      }),
    confirmPassword: z
      .string()
      .min(1, { message: "Konfirmasi password wajib diisi" }),
    agreedToTerms: z.boolean().refine((val) => val === true, {
      message: "Anda harus menyetujui Syarat & Ketentuan",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password dan konfirmasi password tidak cocok",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

const getPasswordStrength = (
  pass: string,
): { score: number; color: string } => {
  if (!pass) return { score: 0, color: "" };
  const hasMinLength = pass.length >= 8;
  const hasLetterAndNum = /[A-Za-z]/.test(pass) && /\d/.test(pass);

  if (!hasMinLength || !hasLetterAndNum) {
    return { score: 1, color: "bg-red-400" };
  }

  const hasUpper = /[A-Z]/.test(pass);
  const hasSpecial = /[^A-Za-z0-9]/.test(pass);

  if (hasUpper || hasSpecial) {
    return { score: 3, color: "bg-emerald-500" };
  }

  return { score: 2, color: "bg-accent" };
};

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const packageParam = searchParams.get("package");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      agreedToTerms: false,
    },
  });

  const currentPassword = watch("password", "");
  const agreedToTerms = watch("agreedToTerms", false);
  const strength = getPasswordStrength(currentPassword);

  const onSubmit = async (data: RegisterFormValues) => {
    setErrorMsg(null);
    try {
      const response = await api.post("/auth/register", {
        name: data.fullName,
        email: data.email,
        phone: data.phone,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });

      // Bentuk response asli backend: { success, message, data: { user, token } }
      const { user, token } = response.data.data;
      setSession(token, user.role, user.name);

      // Kalau register dipicu dari flow pilih paket (?package=gold), lanjutkan
      // ke pemesanan alih-alih ke dashboard kosong.
      if (packageParam) {
        router.push(`/order/new?package=${packageParam}`);
      } else {
        router.push(getRedirectPathForRole(user.role));
      }
    } catch (error: unknown) {
      console.error("Registration error:", error);
      const axiosError = error as {
        response?: { status?: number; data?: { message?: string } };
      };
      if (axiosError.response?.status === 400) {
        setErrorMsg(
          axiosError.response.data?.message ||
            "Email atau nomor HP sudah terdaftar",
        );
      } else {
        setErrorMsg("Terjadi kesalahan, silakan coba lagi nanti");
      }
    }
  };

  const inputStyle =
    "bg-transparent border-0 rounded-none focus-visible:ring-0 px-0 shadow-none h-10 w-full placeholder:text-muted-foreground/60 text-foreground";
  const fieldContainerStyle =
    "flex items-center gap-3 border-b border-border focus-within:border-primary transition-colors";

  return (
    <div className="space-y-6">
      {/* Headings */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-primary tracking-wide mb-2">
          Buat Akun Baru
        </h1>
        <p className="text-sm text-muted-foreground">
          Daftar untuk mulai merencanakan pernikahan impian Anda
        </p>
      </div>

      {/* Conditional Package Banner */}
      {packageParam && (
        <div className="flex items-start gap-3 bg-accent/10 border border-accent/30 rounded-lg p-4 transition-all">
          <ShoppingBag className="h-5 w-5 text-accent shrink-0 mt-0.5" />
          <p className="text-sm text-foreground">
            Anda memilih{" "}
            <span className="text-accent font-semibold">
              {packageParam.charAt(0).toUpperCase() + packageParam.slice(1)}
            </span>{" "}
            — lanjutkan pendaftaran untuk melanjutkan pemesanan.
          </p>
        </div>
      )}

      {/* Form Content */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Full Name Field */}
        <div className="space-y-1">
          <div className={fieldContainerStyle}>
            <User className="h-5 w-5 text-muted-foreground shrink-0" />
            <Input
              type="text"
              placeholder="Nama Lengkap"
              className={inputStyle}
              {...register("fullName")}
            />
          </div>
          {errors.fullName && (
            <p className="text-red-600 text-xs mt-1">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-1">
          <div className={fieldContainerStyle}>
            <Mail className="h-5 w-5 text-muted-foreground shrink-0" />
            <Input
              type="email"
              placeholder="Email"
              className={inputStyle}
              {...register("email")}
            />
          </div>
          {errors.email && (
            <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Phone Field */}
        <div className="space-y-1">
          <div className={fieldContainerStyle}>
            <Phone className="h-5 w-5 text-muted-foreground shrink-0" />
            <Input
              type="text"
              placeholder="081234567890"
              className={inputStyle}
              {...register("phone")}
            />
          </div>
          {errors.phone && (
            <p className="text-red-600 text-xs mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <div className={cn(fieldContainerStyle, "relative")}>
            <Lock className="h-5 w-5 text-muted-foreground shrink-0" />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={cn(inputStyle, "pr-10")}
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
              aria-label={
                showPassword ? "Sembunyikan password" : "Tampilkan password"
              }
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Helper & Strength Bar Container */}
          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground">
              Minimal 8 karakter, kombinasi huruf dan angka
            </p>
            <div className="flex gap-1.5 w-full">
              {[1, 2, 3].map((index) => (
                <div
                  key={index}
                  className={cn(
                    "flex-1 h-1 rounded-full transition-colors duration-300",
                    index <= strength.score ? strength.color : "bg-border",
                  )}
                />
              ))}
            </div>
          </div>
          {errors.password && (
            <p className="text-red-600 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-1">
          <div className={cn(fieldContainerStyle, "relative")}>
            <Lock className="h-5 w-5 text-muted-foreground shrink-0" />
            <Input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Konfirmasi Password"
              className={cn(inputStyle, "pr-10")}
              {...register("confirmPassword")}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
              aria-label={
                showConfirmPassword
                  ? "Sembunyikan konfirmasi password"
                  : "Tampilkan konfirmasi password"
              }
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-600 text-xs mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Terms and Conditions Checkbox */}
        <div className="space-y-1 pt-2">
          <div className="flex items-start space-x-2.5">
            <div className="mt-0.5">
              <Controller
                name="agreedToTerms"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    id="agreedToTerms"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>
            <Label
              htmlFor="agreedToTerms"
              className="text-sm text-muted-foreground font-normal leading-normal cursor-pointer select-none"
            >
              Saya menyetujui{" "}
              <Link
                href="/terms"
                className="text-accent underline hover:text-accent/90"
              >
                Syarat & Ketentuan
              </Link>{" "}
              serta{" "}
              <Link
                href="/privacy"
                className="text-accent underline hover:text-accent/90"
              >
                Kebijakan Privasi
              </Link>
            </Label>
          </div>
          {errors.agreedToTerms && (
            <p className="text-red-600 text-xs mt-1">
              {errors.agreedToTerms.message}
            </p>
          )}
        </div>

        {/* General Form Error Alert */}
        {errorMsg && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm text-center font-medium">
            {errorMsg}
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting || !agreedToTerms}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-md h-12 transition-colors mt-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Mendaftar...
            </>
          ) : (
            "Daftar"
          )}
        </Button>
      </form>

      {/* Divider */}
      <div className="flex items-center my-6">
        <div className="flex-1 border-t border-border"></div>
        <span className="px-3 text-sm text-muted-foreground bg-transparent">
          atau
        </span>
        <div className="flex-1 border-t border-border"></div>
      </div>

      {/* Bottom Login Link */}
      <div className="text-sm text-muted-foreground">
        Sudah punya akun?{" "}
        <Link
          href="/login"
          className="text-accent hover:text-accent/90 font-semibold transition-colors"
        >
          Masuk di sini
        </Link>
      </div>
    </div>
  );
}
