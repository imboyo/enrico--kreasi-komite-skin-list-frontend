"use client";

import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { z } from "zod";

import {
  InvalidForgotPasswordOtpError,
  requestForgotPasswordOtp,
  resetPassword,
  verifyForgotPasswordOtp,
  WhatsappNotRegisteredError,
} from "@/mock-backend/auth/forgot-password-otp";
import { normalizeWhatsappNumber, whatsappNumberSchema } from "@/util/whatsapp-number";

import { useMultiStepForm } from "./useMultiStepForm";
import { validateRegisterField } from "./useRegisterForm";

const FORGOT_PASSWORD_STEPS = ["whatsapp", "otp", "reset", "success"] as const;

export const forgotPasswordWhatsappSchema = z.object({
  whatsappNumber: whatsappNumberSchema,
});

export const forgotPasswordOtpSchema = z.object({
  otp: z.string().min(1, "OTP is required").length(6, "OTP must be 6 digits"),
});

export const forgotPasswordResetSchema = z.object({
  newPassword: z
    .string()
    .min(1, "New password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
});

export function useForgotPasswordFlow() {
  const flow = useMultiStepForm({ steps: FORGOT_PASSWORD_STEPS });
  const [pendingWhatsappNumber, setPendingWhatsappNumber] = useState<string | null>(null);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const requestOtpMutation = useMutation({
    mutationFn: (whatsappNumber: string) =>
      requestForgotPasswordOtp({ whatsappNumber }, { delayMs: 1000 }),
    onSuccess: (_, whatsappNumber) => {
      setPendingWhatsappNumber(whatsappNumber);
      otpForm.reset();
      flow.nextStep();
    },
  });

  const verifyOtpMutation = useMutation({
    mutationFn: (otp: string) => {
      if (!pendingWhatsappNumber) throw new Error("Missing WhatsApp number.");
      return verifyForgotPasswordOtp(
        { whatsappNumber: pendingWhatsappNumber, otp },
        { delayMs: 1000 },
      );
    },
    onSuccess: () => {
      resetForm.reset();
      flow.nextStep();
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: (newPassword: string) => {
      if (!pendingWhatsappNumber) throw new Error("Missing WhatsApp number.");
      return resetPassword(
        { whatsappNumber: pendingWhatsappNumber, newPassword },
        { delayMs: 1000 },
      );
    },
    onSuccess: () => {
      flow.nextStep();
    },
  });

  const whatsappForm = useForm({
    defaultValues: { whatsappNumber: "" },
    onSubmit: async ({ value }) => {
      requestOtpMutation.mutate(normalizeWhatsappNumber(value.whatsappNumber));
    },
  });

  const otpForm = useForm({
    defaultValues: { otp: "" },
    onSubmit: async ({ value }) => {
      verifyOtpMutation.mutate(value.otp);
    },
  });

  const resetForm = useForm({
    defaultValues: { newPassword: "", confirmPassword: "" },
    onSubmit: async ({ value }) => {
      resetPasswordMutation.mutate(value.newPassword);
    },
  });

  const requestOtpError = requestOtpMutation.error
    ? requestOtpMutation.error instanceof WhatsappNotRegisteredError
      ? requestOtpMutation.error.message
      : "Something went wrong. Please try again."
    : null;

  const verifyOtpError = verifyOtpMutation.error
    ? verifyOtpMutation.error instanceof InvalidForgotPasswordOtpError
      ? verifyOtpMutation.error.message
      : "Something went wrong. Please try again."
    : null;

  const resetPasswordError = resetPasswordMutation.error
    ? "Something went wrong. Please try again."
    : null;

  return {
    ...flow,
    whatsappForm,
    otpForm,
    resetForm,
    pendingWhatsappNumber,
    requestOtpMutation,
    verifyOtpMutation,
    resetPasswordMutation,
    requestOtpError,
    verifyOtpError,
    resetPasswordError,
    showNewPassword,
    showConfirmPassword,
    toggleShowNewPassword: () => setShowNewPassword((prev) => !prev),
    toggleShowConfirmPassword: () => setShowConfirmPassword((prev) => !prev),
    backToWhatsapp: () => flow.goToStep("whatsapp"),
    backToOtp: () => flow.goToStep("otp"),
    validateOtpField: (value: string) =>
      validateRegisterField(forgotPasswordOtpSchema.shape.otp, value),
    validateWhatsappNumberField: (value: string) =>
      validateRegisterField(forgotPasswordWhatsappSchema.shape.whatsappNumber, value),
  };
}
