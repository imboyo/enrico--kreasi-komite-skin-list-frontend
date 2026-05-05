"use client";

import { useEffect } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Icon } from "@iconify/react";
import { cn } from "libs/util/cn";

const toastVariants = cva(
  "flex items-start gap-3 rounded-2xl border px-4 py-3 shadow-lg transition-all duration-300",
  {
    variants: {
      variant: {
        // Neutral info
        normal: "border-accent bg-accent text-accent-foreground",
        // Success feedback uses the same accent treatment as the existing positive toast
        success: "border-accent bg-accent text-accent-foreground",
        // Error / destructive
        error: "border-destructive/30 bg-destructive/10 text-destructive",
        // Brand accent (orange)
        secondary: "border-secondary/30 bg-secondary/10 text-secondary",
      },
    },
    defaultVariants: {
      variant: "normal",
    },
  },
);

const iconMap = {
  normal: <Icon icon="mdi:check-circle" className="mt-0.5 size-4 shrink-0" />,
  success: <Icon icon="mdi:check-circle" className="mt-0.5 size-4 shrink-0" />,
  error: <Icon icon="mdi:alert-circle" className="mt-0.5 size-4 shrink-0" />,
  secondary: <Icon icon="mdi:information" className="mt-0.5 size-4 shrink-0" />,
};

export type ToastVariant = "normal" | "success" | "error" | "secondary";

export type ToastItem = {
  id: string;
  message: string;
  variant?: ToastVariant;
  /** Duration in ms before auto-dismiss. 0 = never. Default: 3500 */
  duration?: number;
};

type ToastProps = ToastItem & {
  onDismiss: (id: string) => void;
} & VariantProps<typeof toastVariants>;

export function Toast({
  id,
  message,
  variant = "normal",
  duration = 3500,
  onDismiss,
}: ToastProps) {
  useEffect(() => {
    if (!duration) return;
    const timer = setTimeout(() => onDismiss(id), duration);
    return () => clearTimeout(timer);
  }, [id, duration, onDismiss]);

  return (
    <div role="alert" className={cn(toastVariants({ variant }))}>
      {/* Icon slot */}
      {iconMap[variant]}

      {/* Message */}
      <p className="flex-1 text-sm leading-snug">{message}</p>

      {/* Dismiss button */}
      <button
        type="button"
        aria-label="Tutup notifikasi"
        onClick={() => onDismiss(id)}
        className="mt-0.5 shrink-0 opacity-60 transition-opacity hover:opacity-100"
      >
        <Icon icon="mdi:close" className="size-4" />
      </button>
    </div>
  );
}
