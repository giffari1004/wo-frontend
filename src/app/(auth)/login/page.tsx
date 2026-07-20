"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";

import { api } from "@/lib/api";
import { setSession, getRedirectPathForRole } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email wajib diisi" })
    .email({ message: "Email tidak valid" }),
  password: z.string().min(8, { message: "Password minimal 8 karakter" }),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setErrorMsg(null);
    try {
      const response = await api.post("/auth/login", {
        email: data.email,
        password: data.password,
      });

      // Bentuk response asli backend: { success, message, data: { user, token } }
      const { user, token } = response.data.data;

      setSession(token, user.role, user.name);
      router.push(getRedirectPathForRole(user.role));
    } catch (error: unknown) {
      console.error("Login error:", error);
      setErrorMsg("Email atau password salah");
    }
  };

  const inputStyle =
    "bg-transparent border-0 rounded-none focus-visible:ring-0 px-0 shadow-none placeholder:text-muted-foreground/60 h-10 w-full";

  return (
    <div className="w-full">
      {/* Headings */}
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-primary tracking-wide mb-2">
          Selamat Datang Kembali
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Masuk untuk melanjutkan perencanaan pernikahan Anda
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Email Field */}
        <div className="space-y-1">
          <div className="flex items-center gap-3 border-b border-border focus-within:border-primary transition-colors">
            <Mail className="h-5 w-5 text-muted-foreground shrink-0" />
            <Input
              type="email"
              placeholder="Alamat Email"
              className={inputStyle}
              {...register("email")}
            />
          </div>
          {errors.email && (
            <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-1">
          <div className="flex items-center gap-3 border-b border-border focus-within:border-primary transition-colors relative">
            <Lock className="h-5 w-5 text-muted-foreground shrink-0" />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Kata Sandi"
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
          {errors.password && (
            <p className="text-red-600 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center space-x-2">
            <Controller
              name="rememberMe"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="rememberMe"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <Label
              htmlFor="rememberMe"
              className="text-sm text-muted-foreground font-normal cursor-pointer select-none"
            >
              Ingat Saya
            </Label>
          </div>
          <Link
            href="/forgot-password"
            className="text-accent hover:text-accent/90 font-semibold text-sm transition-colors"
          >
            Lupa Password?
          </Link>
        </div>

        {/* General Error Message Alert */}
        {errorMsg && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm text-center font-medium">
            {errorMsg}
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-md h-12 transition-colors mt-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Memproses...
            </>
          ) : (
            "Masuk"
          )}
        </Button>
      </form>

      {/* Divider */}
      <div className="flex items-center my-8">
        <div className="flex-1 border-t border-border"></div>
        <span className="px-3 text-sm text-muted-foreground bg-transparent">
          atau
        </span>
        <div className="flex-1 border-t border-border"></div>
      </div>

      {/* Bottom Registration Link */}
      <div className="text-sm text-muted-foreground">
        Belum punya akun?{" "}
        <Link
          href="/register"
          className="text-accent hover:text-accent/90 font-semibold transition-colors"
        >
          Daftar di sini
        </Link>
      </div>
    </div>
  );
}
