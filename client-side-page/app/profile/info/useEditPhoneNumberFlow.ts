"use client";

import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { z } from "zod";

import {
  initiatePhoneNumberChange,
  verifyPhoneNumberChange,
} from "backend-service/account";
import { HttpError } from "libs/error/http-error";
import {
  normalizeWhatsappNumber,
  sanitizeWhatsappNumberInput,
  validateWhatsappField,
} from "libs/util/whatsapp-number";
import { useAuthStore } from "@/store/auth/auth.store";

const otpSchema = z
  .string()
  .min(1, "OTP wajib diisi")
  .regex(/^\d+$/, "OTP hanya boleh berisi angka")
  .length(6, "OTP harus terdiri dari 6 digit");

type Step = "phone" | "otp";

function resolveApiError(error: unknown): string {
  if (error instanceof HttpError) {
    return error.status >= 500
      ? "Server sedang tidak tersedia. Silakan coba lagi."
      : error.message;
  }
  return "Terjadi kesalahan. Silakan coba lagi.";
}

export function useEditPhoneNumberFlow() {
  const { userInfo, setUserInfo } = useAuthStore();
  const [step, setStep] = useState<Step>("phone");
  const [isSuccess, setIsSuccess] = useState(false);
  // Holds the raw input value so it can be shown in the OTP step description.
  const [pendingPhone, setPendingPhone] = useState("");

  // Strip non-digits from stored phone (e.g. "+628..." → "628...") so the input only sees digits.
  const currentPhone = sanitizeWhatsappNumberInput(userInfo?.phoneNumber ?? "");

  const phoneForm = useForm({
    defaultValues: { phoneNumber: currentPhone },
    onSubmit: async ({ value }) => {
      initiateMutation.mutate(value.phoneNumber);
    },
  });

  const otpForm = useForm({
    defaultValues: { otp: "" },
    onSubmit: async ({ value }) => {
      verifyMutation.mutate(value.otp);
    },
  });

  // Step 1: send OTP to the new phone number via WhatsApp
  const initiateMutation = useMutation({
    mutationFn: (phoneNumber: string) =>
      initiatePhoneNumberChange({
        new_phone_number: normalizeWhatsappNumber(phoneNumber),
      }),
    onSuccess: (_, phoneNumber) => {
      // A fresh OTP request starts a new flow, so the previous success banner
      // must be cleared before moving into verification.
      setIsSuccess(false);
      setPendingPhone(phoneNumber);
      otpForm.reset({ otp: "" });
      setStep("otp");
    },
  });

  // Step 2: confirm OTP to complete the phone number change
  const verifyMutation = useMutation({
    mutationFn: (otp: string) =>
      verifyPhoneNumberChange({
        new_phone_number: normalizeWhatsappNumber(pendingPhone),
        otp_code: otp,
      }),
    onSuccess: () => {
      // After a successful verification, return to the phone form and show a
      // success message below the input instead of keeping a dedicated step.
      const newPhone = pendingPhone;
      setIsSuccess(true);
      setPendingPhone("");
      setStep("phone");
      // Show the newly saved number so the user can confirm what changed.
      phoneForm.reset({ phoneNumber: newPhone });
      otpForm.reset({ otp: "" });
      initiateMutation.reset();
      verifyMutation.reset();
      // Keep the auth store aligned with the updated phone number.
      if (userInfo) {
        setUserInfo({ ...userInfo, phoneNumber: normalizeWhatsappNumber(newPhone) });
      }
    },
  });

  function validateOtpField(value: string): string | undefined {
    const result = otpSchema.safeParse(value);
    return result.success ? undefined : result.error.issues[0]?.message;
  }

  function backToPhone() {
    setStep("phone");
    setPendingPhone("");
    verifyMutation.reset();
    otpForm.reset({ otp: "" });
  }

  const initiateError = initiateMutation.error
    ? resolveApiError(initiateMutation.error)
    : null;

  const verifyError = verifyMutation.error
    ? resolveApiError(verifyMutation.error)
    : null;

  return {
    step,
    isSuccess,
    pendingPhone,
    phoneForm,
    otpForm,
    initiateMutation,
    verifyMutation,
    initiateError,
    verifyError,
    validatePhoneField: validateWhatsappField,
    validateOtpField,
    backToPhone,
  };
}

export type EditPhoneNumberFlowState = ReturnType<typeof useEditPhoneNumberFlow>;
