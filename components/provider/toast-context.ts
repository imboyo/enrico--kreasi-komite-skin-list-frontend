"use client";

import { createContext } from "react";

import type { ToastVariant } from "@/components/atomic/molecule/Toast";

export type ToastPosition =
  | "top-right"
  | "top-left"
  | "top-center"
  | "bottom-right"
  | "bottom-left"
  | "bottom-center";

export type ShowToastOptions = {
  variant?: ToastVariant;
  /** Duration in ms. 0 = never auto-dismiss. Default: 3500 */
  duration?: number;
  position?: ToastPosition;
};

export type ToastContextValue = {
  showToast: (message: string, options?: ShowToastOptions) => void;
  dismiss: (id: string) => void;
};

export type ToastEntry = {
  id: string;
  message: string;
  variant?: ToastVariant;
  duration?: number;
  position: ToastPosition;
};

export const ToastContext = createContext<ToastContextValue | null>(null);
