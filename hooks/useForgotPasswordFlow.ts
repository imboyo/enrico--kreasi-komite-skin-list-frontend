"use client";

import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { z } from "zod";

import {
  forgotPasswordChain,
  forgotPasswordReset,
  forgotPasswordVerify,
} from "@/backend-service/auth";
import { HttpError } from "libs/error/http-error";
import { normalizeWhatsappNumber, whatsappNumberSchema } from "libs/util/whatsapp-number";

import { useMultiStepForm } from "./useMultiStepForm";
import { validateRegisterField } from "./useRegisterForm";

const FORGOT_PASSWORD_STEPS = ["whatsapp", "otp", "reset", "success"] as const;

export const forgotPasswordWhatsappSchema = z.object({
  whatsappNumber: whatsappNumberSchema,
});

export const forgotPasswordOtpSchema = z.object({
  otp: z.string().min(1, "OTP wajib diisi").length(6, "OTP harus terdiri dari 6 digit"),
});

export const forgotPasswordResetSchema = z.object({
  newPassword: z
    .string()
    .min(1, "Kata sandi baru wajib diisi")
    .min(6, "Kata sandi minimal 6 karakter"),
  confirmPassword: z.string().min(1, "Mohon konfirmasi kata sandi Anda"),
});

export function useForgotPasswordFlow() {
  const flow = useMultiStepForm({ steps: FORGOT_PASSWORD_STEPS });
  const [pendingPhoneNumber, setPendingPhoneNumber] = useState<string | null>(null);
  const [resetToken, setResetToken] = useState<string | null>(null);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const requestOtpMutation = useMutation({
    mutationFn: (phoneNumber: string) =>
      forgotPasswordChain({ phone_number: phoneNumber }),
    onSuccess: (_, phoneNumber) => {
      setPendingPhoneNumber(phoneNumber);
      otpForm.reset();
      flow.nextStep();
    },
  });

  const verifyOtpMutation = useMutation({
    mutationFn: (otp: string) => {
      if (!pendingPhoneNumber) throw new Error("Missing phone number.");
      return forgotPasswordVerify({ phone_number: pendingPhoneNumber, otp_code: otp });
    },
    onSuccess: ({ reset_token }) => {
      setResetToken(reset_token);
      resetForm.reset();
      flow.nextStep();
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: (newPassword: string) => {
      if (!resetToken) throw new Error("Missing reset token.");
      return forgotPasswordReset({ reset_token: resetToken, new_password: newPassword });
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
    ? requestOtpMutation.error instanceof HttpError
      ? requestOtpMutation.error.message
      : "Terjadi kesalahan. Silakan coba lagi."
    : null;

  const verifyOtpError = verifyOtpMutation.error
    ? verifyOtpMutation.error instanceof HttpError
      ? verifyOtpMutation.error.message
      : "Terjadi kesalahan. Silakan coba lagi."
    : null;

  const resetPasswordError = resetPasswordMutation.error
    ? resetPasswordMutation.error instanceof HttpError
      ? resetPasswordMutation.error.message
      : "Terjadi kesalahan. Silakan coba lagi."
    : null;

  return {
    ...flow,
    whatsappForm,
    otpForm,
    resetForm,
    // Displayed in OTP step to confirm which number was messaged.
    pendingWhatsappNumber: pendingPhoneNumber,
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
