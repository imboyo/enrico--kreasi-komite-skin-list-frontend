"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  useRef,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "@/util/cn";
import { Toast, type ToastItem, type ToastVariant } from "@/components/atomic/molecule/Toast";

// ─── Position ────────────────────────────────────────────────────────────────

export type ToastPosition =
  | "top-right"
  | "top-left"
  | "top-center"
  | "bottom-right"
  | "bottom-left"
  | "bottom-center";

const positionClasses: Record<ToastPosition, string> = {
  "top-right":    "top-4 right-4 items-end",
  "top-left":     "top-4 left-4 items-start",
  "top-center":   "top-4 left-1/2 -translate-x-1/2 items-center",
  "bottom-right": "bottom-4 right-4 items-end",
  "bottom-left":  "bottom-4 left-4 items-start",
  "bottom-center":"bottom-4 left-1/2 -translate-x-1/2 items-center",
};

// ─── Context ──────────────────────────────────────────────────────────────────

type ShowToastOptions = {
  variant?: ToastVariant;
  /** Duration in ms. 0 = never auto-dismiss. Default: 3500 */
  duration?: number;
  position?: ToastPosition;
};

type ToastContextValue = {
  showToast: (message: string, options?: ShowToastOptions) => void;
  dismiss: (id: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

type ToastEntry = ToastItem & { position: ToastPosition };

type ToastProviderProps = {
  children: ReactNode;
  /** Default position for toasts that don't specify one. Default: "bottom-right" */
  defaultPosition?: ToastPosition;
};

export function ToastProvider({ children, defaultPosition = "bottom-right" }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastEntry[]>([]);
  // Auto-increment id source
  const counter = useRef(0);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, options?: ShowToastOptions) => {
      const id = `toast-${++counter.current}`;
      const entry: ToastEntry = {
        id,
        message,
        variant: options?.variant ?? "normal",
        duration: options?.duration ?? 3500,
        position: options?.position ?? defaultPosition,
      };
      setToasts((prev) => [...prev, entry]);
    },
    [defaultPosition],
  );

  // Group toasts by position so each group renders in its own fixed container
  const grouped = toasts.reduce<Record<ToastPosition, ToastEntry[]>>(
    (acc, toast) => {
      (acc[toast.position] ??= []).push(toast);
      return acc;
    },
    {} as Record<ToastPosition, ToastEntry[]>,
  );

  return (
    <ToastContext.Provider value={{ showToast, dismiss }}>
      {children}

      {/* Render each position group in a portal so they sit above everything */}
      {(Object.entries(grouped) as [ToastPosition, ToastEntry[]][]).map(
        ([position, items]) =>
          typeof window !== "undefined"
            ? createPortal(
                <div
                  key={position}
                  aria-live="polite"
                  className={cn(
                    "fixed z-[9999] flex w-80 max-w-[calc(100vw-2rem)] flex-col gap-2",
                    positionClasses[position],
                  )}
                >
                  {items.map((toast) => (
                    <Toast key={toast.id} {...toast} onDismiss={dismiss} />
                  ))}
                </div>,
                document.body,
              )
            : null,
      )}
    </ToastContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}
