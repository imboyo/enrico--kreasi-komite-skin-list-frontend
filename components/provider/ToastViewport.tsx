"use client";

import { createPortal } from "react-dom";

import { Toast } from "@/components/atomic/molecule/Toast";
import { cn } from "@/util/cn";
import type { ToastEntry, ToastPosition } from "@/components/provider/toast-context";
import { toastPositionClasses } from "@/components/provider/toast-position";

interface ToastViewportProps {
  position: ToastPosition;
  items: ToastEntry[];
  onDismiss: (id: string) => void;
}

export function ToastViewport({
  position,
  items,
  onDismiss,
}: ToastViewportProps) {
  if (typeof window === "undefined") {
    return null;
  }

  return createPortal(
    <div
      aria-live="polite"
      className={cn(
        "fixed z-[9999] flex w-80 max-w-[calc(100vw-2rem)] flex-col gap-2",
        toastPositionClasses[position],
      )}
    >
      {items.map((toast) => (
        <Toast key={toast.id} {...toast} onDismiss={onDismiss} />
      ))}
    </div>,
    document.body,
  );
}
