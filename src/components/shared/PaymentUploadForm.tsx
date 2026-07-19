"use client";

import { useState, useEffect, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import {
  Copy,
  Check,
  AlertCircle,
  UploadCloud,
  FileText,
  X,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface PaymentUploadFormProps {
  paymentType: "DOWN_PAYMENT" | "FINAL_PAYMENT";
  amountDue: number;
  bankAccountNumber: string;
  bankName: string;
  accountHolderName: string;
  onSubmit: (data: { amount: number; proofFile: File }) => void | Promise<void>;
  isSubmitting?: boolean;
  rejectionReason?: string;
}

export default function PaymentUploadForm({
  paymentType,
  amountDue,
  bankAccountNumber,
  bankName,
  accountHolderName,
  onSubmit,
  isSubmitting = false,
  rejectionReason,
}: PaymentUploadFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [amount, setAmount] = useState<number>(amountDue);
  const [copied, setCopied] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ file?: string; amount?: string }>({});

  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(bankAccountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Gagal menyalin teks: ", err);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [],
      "application/pdf": [],
    },
    maxFiles: 1,
    multiple: false,
    maxSize: 5 * 1024 * 1024, // 5MB
    onDrop: (acceptedFiles, rejectedFiles) => {
      setErrors((prev) => ({ ...prev, file: undefined }));
      if (rejectedFiles.length > 0) {
        const reject = rejectedFiles[0];
        if (reject.errors.some((e) => e.code === "file-too-large")) {
          setErrors((prev) => ({ ...prev, file: "Ukuran file maksimal 5MB." }));
        } else if (reject.errors.some((e) => e.code === "file-invalid-type")) {
          setErrors((prev) => ({
            ...prev,
            file: "Format file harus JPG, PNG, atau PDF.",
          }));
        }
        return;
      }
      if (acceptedFiles.length > 0) {
        const selectedFile = acceptedFiles[0];
        setFile(selectedFile);
      }
    },
  });

  // Derived value instead of state — no setState call needed, so nothing to
  // desync from `file`. Recomputed only when `file` changes.
  const previewUrl = useMemo(() => {
    if (file && file.type.startsWith("image/")) {
      return URL.createObjectURL(file);
    }
    return null;
  }, [file]);

  // The effect here only performs cleanup (revoking the blob URL) — a
  // legitimate "sync with an external system" use case, not a setState call.
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    setErrors((prev) => ({ ...prev, file: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { file?: string; amount?: string } = {};

    if (!file) {
      newErrors.file = "Bukti transfer wajib diunggah.";
    }
    if (!amount || amount <= 0) {
      newErrors.amount = "Jumlah transfer harus lebih dari 0.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (file) {
      await onSubmit({ amount, proofFile: file });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-6">
      {/* ── 1. Bank Transfer Info Card ── */}
      <div className="rounded-lg bg-muted border border-border p-4 space-y-3">
        <div className="text-xs font-semibold uppercase tracking-wider text-accent">
          Rekening Tujuan{" "}
          {paymentType === "DOWN_PAYMENT" ? "DP (50%)" : "Pelunasan"}
        </div>
        <div className="grid grid-cols-2 gap-y-2 text-sm text-muted-foreground">
          <div>Bank:</div>
          <div className="font-medium text-foreground">{bankName}</div>

          <div className="flex items-center">Nomor Rekening:</div>
          <div className="flex items-center gap-2">
            <span className="font-mono font-medium text-foreground">
              {bankAccountNumber}
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1 text-xs text-primary hover:opacity-80 transition-opacity focus:outline-none"
              aria-label="Salin nomor rekening"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span className="text-emerald-600 font-medium">
                    Tersalin!
                  </span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Salin</span>
                </>
              )}
            </button>
          </div>

          <div>Nama Pemilik:</div>
          <div className="font-medium text-foreground">{accountHolderName}</div>

          <div className="border-t border-border pt-2 mt-1">
            Jumlah Tagihan:
          </div>
          <div className="border-t border-border pt-2 mt-1 font-serif text-base font-bold text-primary">
            {formatRupiah(amountDue)}
          </div>
        </div>
      </div>

      {/* ── 2. Rejection Alert Box ── */}
      {rejectionReason && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-red-900">
              Pembayaran Sebelumnya Ditolak
            </h4>
            <p className="text-sm text-red-700 leading-relaxed">
              {rejectionReason}
            </p>
          </div>
        </div>
      )}

      {/* ── 3. Dropzone / Upload Preview Area ── */}
      <div className="space-y-2">
        <Label className="text-foreground">Unggah Bukti Transfer</Label>

        {!file ? (
          <div
            {...getRootProps()}
            className={cn(
              "border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer transition-colors bg-white hover:bg-slate-50/50",
              isDragActive && "border-accent bg-accent/5",
              errors.file && "border-red-300 bg-red-50/30",
            )}
          >
            <input {...getInputProps()} />
            <UploadCloud
              className={cn(
                "mx-auto h-10 w-10 text-muted-foreground mb-2",
                isDragActive && "text-accent",
              )}
            />
            <p className="text-sm font-medium text-foreground mb-1">
              Seret & lepas file di sini, atau klik untuk pilih file
            </p>
            <p className="text-xs text-muted-foreground">
              Format: JPG, PNG, atau PDF (maks. 5MB)
            </p>
          </div>
        ) : (
          /* Uploaded File View State Container */
          <div className="relative border border-border rounded-lg p-4 bg-white flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3 min-w-0">
              {previewUrl ? (
                <div className="relative h-14 w-14 rounded overflow-hidden border border-border shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={previewUrl}
                    alt="Pratinjau bukti transfer"
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="h-14 w-14 bg-muted border border-border text-muted-foreground rounded flex items-center justify-center shrink-0">
                  <FileText className="h-7 w-7" />
                </div>
              )}
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {file.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </p>
                <div {...getRootProps()} className="mt-1">
                  <input {...getInputProps()} />
                  <button
                    type="button"
                    className="text-xs font-semibold text-accent hover:underline focus:outline-none"
                  >
                    Ganti File
                  </button>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleRemoveFile}
              className="p-1.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors focus:outline-none"
              aria-label="Hapus file"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {errors.file && (
          <p className="text-xs font-medium text-red-600 mt-1">{errors.file}</p>
        )}
      </div>

      {/* ── 4. Amount Input Field ── */}
      <div className="space-y-2">
        <Label htmlFor="amount" className="text-foreground">
          Jumlah Transfer (Rp)
        </Label>
        <div className="relative">
          <Input
            id="amount"
            type="number"
            value={amount === 0 ? "" : amount}
            onChange={(e) => {
              setErrors((prev) => ({ ...prev, amount: undefined }));
              setAmount(Number(e.target.value));
            }}
            placeholder="Masukkan nominal nominal transfer"
            className={cn(
              "bg-white border-border focus:border-accent",
              errors.amount && "border-red-300 focus:border-red-500",
            )}
            disabled={isSubmitting}
          />
        </div>
        <p className="text-[11px] text-muted-foreground">
          *Ubah nominal jika jumlah yang Anda transfer berbeda dengan tagihan
          resmi.
        </p>
        {errors.amount && (
          <p className="text-xs font-medium text-red-600 mt-1">
            {errors.amount}
          </p>
        )}
      </div>

      {/* ── 5. Action Submit Button ── */}
      <Button
        type="submit"
        disabled={!file || isSubmitting}
        className="w-full bg-primary hover:bg-primary/90 text-white font-medium tracking-wide shadow-sm h-11"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <span>Mengirim...</span>
          </>
        ) : (
          <span>Kirim Bukti Pembayaran</span>
        )}
      </Button>
    </form>
  );
}
