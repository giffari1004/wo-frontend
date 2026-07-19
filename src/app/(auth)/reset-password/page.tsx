"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AxiosError } from "axios";
import {
  KeyRound,
  Lock,
  Shield,
  Eye,
  EyeOff,
  Check,
  History,
  ArrowLeft,
  Loader2,
} from "lucide-react";

import { api } from "@/lib/api";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, "Password baru wajib diisi")
      .min(8, "Password minimal 8 karakter dengan kombinasi huruf dan angka")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\S]+$/,
        "Password minimal 8 karakter dengan kombinasi huruf dan angka",
      ),
    confirmPassword: z.string().min(1, "Konfirmasi password wajib diisi"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password dan konfirmasi password tidak cocok",
    path: ["confirmPassword"],
  });

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [viewState, setViewState] = useState<"form" | "success" | "invalid">(
    "form",
  );
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [generalError, setGeneralError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const passwordValue = watch("password", "");

  useEffect(() => {
    if (!token) {
      setViewState("invalid");
    }
  }, [token]);

  // Evaluate password strength metrics
  const hasMinLength = passwordValue.length >= 8;
  const hasLetter = /[A-Za-z]/.test(passwordValue);
  const hasNumber = /\d/.test(passwordValue);
  const hasMixedCase =
    /[a-z]/.test(passwordValue) && /[A-Z]/.test(passwordValue);

  // Compute absolute level tags
  let strengthLevel: "empty" | "weak" | "medium" | "strong" = "empty";
  if (passwordValue.length > 0) {
    if (!hasMinLength || !hasLetter || !hasNumber) {
      strengthLevel = "weak";
    } else if (hasMinLength && hasLetter && hasNumber && hasMixedCase) {
      strengthLevel = "strong";
    } else {
      strengthLevel = "medium";
    }
  }

  const onSubmit = async (data: ResetPasswordValues) => {
    if (!token) {
      setViewState("invalid");
      return;
    }

    setGeneralError(null);
    try {
      await api.post("/auth/reset-password", {
        token,
        password: data.password,
      });
      setViewState("success");
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        const status = error.response.status;
        if (status === 400 || status === 410) {
          setViewState("invalid");
          return;
        }
      }
      setGeneralError("Terjadi kesalahan, silakan coba lagi");
    }
  };

  // ── STATE 2: SUCCESS VIEW (CENTER-ALIGNED)
  if (viewState === "success") {
    return (
      <div className="flex flex-col items-center justify-center text-center w-full">
        <div className="h-20 w-20 rounded-full bg-accent/15 flex items-center justify-center mx-auto mb-6">
          <div className="h-14 w-14 rounded-full bg-accent flex items-center justify-center">
            <Check className="h-6 w-6 text-white" />
          </div>
        </div>

        <h1 className="font-serif text-2xl font-bold text-primary mb-3">
          Password Berhasil Diperbarui
        </h1>

        <p className="text-sm text-muted-foreground leading-relaxed mb-8 max-w-[340px]">
          Password Anda telah berhasil diubah. Silakan masuk kembali menggunakan
          password baru Anda.
        </p>

        <Button
          asChild
          className="w-full rounded-full bg-primary hover:bg-primary/90 text-primary-foreground h-11 transition-colors font-medium"
        >
          <Link href="/login">Masuk Sekarang</Link>
        </Button>
      </div>
    );
  }

  // ── STATE 3: INVALID / EXPIRED VIEW (CENTER-ALIGNED)
  if (viewState === "invalid") {
    return (
      <div className="flex flex-col items-center justify-center text-center w-full">
        <div className="h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
          <History className="h-6 w-6 text-primary" />
        </div>

        <h1 className="font-serif text-2xl font-bold text-primary mb-3">
          Link Sudah Tidak Berlaku
        </h1>

        <p className="text-sm text-muted-foreground leading-relaxed mb-8 max-w-[340px]">
          Link reset password ini sudah kedaluwarsa atau telah digunakan
          sebelumnya. Silakan ajukan permintaan baru.
        </p>

        <Button
          asChild
          className="w-full rounded-full bg-primary hover:bg-primary/90 text-primary-foreground h-11 transition-colors font-medium mb-6"
        >
          <Link href="/forgot-password">Kirim Ulang Link Reset</Link>
        </Button>

        <Link
          href="/login"
          className="flex items-center gap-2 text-accent font-semibold text-sm hover:underline mt-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke halaman Login
        </Link>
      </div>
    );
  }

  // ── STATE 1: FORM VIEW (LEFT-ALIGNED)
  return (
    <div className="w-full text-left">
      <div className="h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center mb-6">
        <KeyRound className="h-6 w-6 text-primary" />
      </div>

      <h1 className="font-serif text-3xl font-bold text-primary mb-2">
        Atur Ulang Password
      </h1>

      <p className="text-sm text-muted-foreground mb-8">
        Buat password baru untuk akun Anda
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {generalError && (
          <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
            {generalError}
          </div>
        )}

        {/* Password Input Block */}
        <div className="space-y-2">
          <Label
            htmlFor="password"
            className="text-xs font-semibold tracking-wide text-muted-foreground uppercase block"
          >
            PASSWORD BARU
          </Label>
          <div className="flex items-center gap-3 border-b border-border focus-within:border-primary transition-colors relative">
            <Lock className="h-5 w-5 text-muted-foreground shrink-0" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className="bg-transparent border-0 rounded-none focus-visible:ring-0 px-0 shadow-none h-10 w-full pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-0 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          <p className="text-xs text-muted-foreground italic mt-1">
            Minimal 8 karakter, kombinasi huruf dan angka
          </p>

          {/* Mutually Exclusive 3-Segment Password Strength Indicator */}
          <div className="flex items-center gap-2 pt-2">
            <div
              className={cn(
                "flex-1 h-1 rounded-full transition-colors duration-300",
                strengthLevel === "weak"
                  ? "bg-red-400"
                  : strengthLevel === "medium"
                    ? "bg-accent"
                    : strengthLevel === "strong"
                      ? "bg-emerald-500"
                      : "bg-border",
              )}
            />
            <div
              className={cn(
                "flex-1 h-1 rounded-full transition-colors duration-300",
                strengthLevel === "medium"
                  ? "bg-accent"
                  : strengthLevel === "strong"
                    ? "bg-emerald-500"
                    : "bg-border",
              )}
            />
            <div
              className={cn(
                "flex-1 h-1 rounded-full transition-colors duration-300",
                strengthLevel === "strong" ? "bg-emerald-500" : "bg-border",
              )}
            />
          </div>

          {errors.password && (
            <p className="text-red-600 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password Input Block */}
        <div className="space-y-2">
          <Label
            htmlFor="confirmPassword"
            className="text-xs font-semibold tracking-wide text-muted-foreground uppercase block"
          >
            KONFIRMASI PASSWORD BARU
          </Label>
          <div className="flex items-center gap-3 border-b border-border focus-within:border-primary transition-colors relative">
            <Shield className="h-5 w-5 text-muted-foreground shrink-0" />
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword")}
              className="bg-transparent border-0 rounded-none focus-visible:ring-0 px-0 shadow-none h-10 w-full pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-0 text-muted-foreground hover:text-foreground transition-colors"
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

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-full bg-primary hover:bg-primary/90 text-primary-foreground h-11 transition-colors font-medium mt-4"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Menyimpan...
            </>
          ) : (
            "Simpan Password Baru"
          )}
        </Button>
      </form>

      <div className="mt-8">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-accent font-semibold text-sm hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke halaman Login
        </Link>
      </div>
    </div>
  );
}
