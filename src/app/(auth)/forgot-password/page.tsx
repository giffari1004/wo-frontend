"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { KeyRound, Mail, MailCheck, ArrowLeft, Loader2 } from "lucide-react";

import { api } from "@/lib/api";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const forgotPasswordSchema = z.object({
  email: z.string().min(1, "Email wajib diisi").email("Email tidak valid"),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [submittedEmail, setSubmittedEmail] = useState<string>("");
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState<number>(0);
  const [isResending, setIsResending] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (cooldown > 0) {
      timer = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

  const onSubmit = async (data: ForgotPasswordValues) => {
    setGeneralError(null);
    try {
      await api.post("/auth/forgot-password", { email: data.email });
      setSubmittedEmail(data.email);
      setIsSubmitted(true);
    } catch (error) {
      // Generic error message for security reasons
      setGeneralError("Terjadi kesalahan, silakan coba lagi");
    }
  };

  const handleResend = async () => {
    if (cooldown > 0 || isResending) return;
    setIsResending(true);
    try {
      await api.post("/auth/forgot-password", { email: submittedEmail });
      setCooldown(30);
    } catch (error) {
      // Fail silently or handle generically to maintain security posture
    } finally {
      setIsResending(false);
    }
  };

  // ── STATE 2: SUCCESS STATE (CENTER-ALIGNED)
  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center text-center w-full">
        <div className="h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
          <MailCheck className="h-6 w-6 text-accent" />
        </div>

        <h1 className="font-serif text-2xl font-bold text-primary mb-3">
          Periksa Email Anda
        </h1>

        <p className="text-sm text-muted-foreground leading-relaxed mb-8 max-w-85">
          Kami telah mengirimkan link reset password ke email Anda. Link berlaku
          selama beberapa saat dan hanya dapat digunakan satu kali.
        </p>

        <Button
          onClick={handleResend}
          disabled={cooldown > 0 || isResending}
          variant="outline"
          className="w-full rounded-full border-accent text-accent hover:bg-accent/10 h-11 mb-6"
        >
          {isResending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Mengirim...
            </>
          ) : cooldown > 0 ? (
            `Kirim Ulang (${cooldown}s)`
          ) : (
            "Kirim Ulang Email"
          )}
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

  // ── STATE 1: FORM STATE (LEFT-ALIGNED)
  return (
    <div className="w-full text-left">
      <div className="h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center mb-6">
        <KeyRound className="h-6 w-6 text-accent" />
      </div>

      <h1 className="font-serif text-3xl font-bold text-primary mb-2">
        Lupa Password?
      </h1>

      <p className="text-sm text-muted-foreground mb-8">
        Masukkan email terdaftar Anda, kami akan kirimkan link untuk mengatur
        ulang password
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {generalError && (
          <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
            {generalError}
          </div>
        )}

        <div className="space-y-2">
          <Label
            htmlFor="email"
            className="text-sm font-semibold text-foreground block"
          >
            Alamat Email
          </Label>
          <div className="flex items-center gap-3 border-b border-border focus-within:border-primary transition-colors">
            <Mail className="h-5 w-5 text-muted-foreground shrink-0" />
            <Input
              id="email"
              type="email"
              placeholder="nama@email.com"
              {...register("email")}
              className="bg-transparent border-0 rounded-none focus-visible:ring-0 px-0 shadow-none h-10 w-full"
            />
          </div>
          {errors.email && (
            <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-full bg-primary hover:bg-primary/90 text-primary-foreground h-11 transition-colors font-medium mt-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Mengirim...
            </>
          ) : (
            "Kirim Link Reset"
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
