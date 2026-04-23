"use client";

import {
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ToastViewport } from "@/components/provider/ToastViewport";
import {
  ToastContext,
  type ShowToastOptions,
  type ToastEntry,
  type ToastPosition,
} from "@/components/provider/toast-context";

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

      {/* Render each position group in its own portal so stacked toasts stay aligned per edge. */}
      {(Object.entries(grouped) as [ToastPosition, ToastEntry[]][]).map(
        ([position, items]) => (
          <ToastViewport
            key={position}
            position={position}
            items={items}
            onDismiss={dismiss}
          />
        ),
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
