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
  validateWhatsappField,
} from "libs/util/whatsapp-number";

const otpSchema = z
  .string()
  .min(1, "OTP is required")
  .regex(/^\d+$/, "OTP must contain numbers only")
  .length(6, "OTP must be 6 digits");

type Step = "phone" | "otp";

function resolveApiError(error: unknown): string {
  if (error instanceof HttpError) {
    return error.status >= 500
      ? "Server is unavailable. Please try again."
      : error.message;
  }
  return "Something went wrong. Please try again.";
}

export function useEditPhoneNumberFlow() {
  const [step, setStep] = useState<Step>("phone");
  const [isSuccess, setIsSuccess] = useState(false);
  // Holds the raw input value so it can be shown in the OTP step description.
  const [pendingPhone, setPendingPhone] = useState("");

  const phoneForm = useForm({
    defaultValues: { phoneNumber: "" },
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
      setIsSuccess(true);
      setPendingPhone("");
      setStep("phone");
      phoneForm.reset({ phoneNumber: "" });
      otpForm.reset({ otp: "" });
      initiateMutation.reset();
      verifyMutation.reset();
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
