"use client";

import {
  useForm,
  type ReactFormExtendedApi,
  type FormValidateOrFn,
  type FormAsyncValidateOrFn,
} from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { z } from "zod";

import {
  requestEmailOtp,
  verifyEmailOtp,
  EmailAlreadyInUseError,
  InvalidOtpError,
} from "@/mock-backend/user/profile/update-email";
import { MockServerDownError } from "@/mock-backend/utils/mock-control";

// Step 1: enter new email
export const editEmailSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .pipe(z.email("Enter a valid email address")),
});

// Step 2: enter OTP
export const otpSchema = z.object({
  otp: z.string().min(1, "OTP is required").length(6, "OTP must be 6 digits"),
});

export type EditEmailFormValues = z.infer<typeof editEmailSchema>;
export type OtpFormValues = z.infer<typeof otpSchema>;

export type EditEmailFormApi = ReactFormExtendedApi<
  EditEmailFormValues,
  undefined | FormValidateOrFn<EditEmailFormValues>,
  undefined | FormValidateOrFn<EditEmailFormValues>,
  undefined | FormAsyncValidateOrFn<EditEmailFormValues>,
  undefined | FormValidateOrFn<EditEmailFormValues>,
  undefined | FormAsyncValidateOrFn<EditEmailFormValues>,
  undefined | FormValidateOrFn<EditEmailFormValues>,
  undefined | FormAsyncValidateOrFn<EditEmailFormValues>,
  undefined | FormValidateOrFn<EditEmailFormValues>,
  undefined | FormAsyncValidateOrFn<EditEmailFormValues>,
  undefined | FormAsyncValidateOrFn<EditEmailFormValues>,
  never
>;

export type OtpFormApi = ReactFormExtendedApi<
  OtpFormValues,
  undefined | FormValidateOrFn<OtpFormValues>,
  undefined | FormValidateOrFn<OtpFormValues>,
  undefined | FormAsyncValidateOrFn<OtpFormValues>,
  undefined | FormValidateOrFn<OtpFormValues>,
  undefined | FormAsyncValidateOrFn<OtpFormValues>,
  undefined | FormValidateOrFn<OtpFormValues>,
  undefined | FormAsyncValidateOrFn<OtpFormValues>,
  undefined | FormValidateOrFn<OtpFormValues>,
  undefined | FormAsyncValidateOrFn<OtpFormValues>,
  undefined | FormAsyncValidateOrFn<OtpFormValues>,
  never
>;

export function validateField<T>(
  schema: z.ZodType<T>,
  value: T,
): string | undefined {
  const result = schema.safeParse(value);
  return result.success ? undefined : result.error.issues[0]?.message;
}

export function useEditEmailFlow() {
  // "email" = step 1, "otp" = step 2, "done" = success
  const [step, setStep] = useState<"email" | "otp" | "done">("email");
  const [pendingEmail, setPendingEmail] = useState("");

  const requestOtpMutation = useMutation({
    mutationFn: (email: string) => requestEmailOtp({ newEmail: email }),
    onSuccess: (_, email) => {
      setPendingEmail(email);
      setStep("otp");
    },
  });

  const verifyOtpMutation = useMutation({
    mutationFn: (otp: string) =>
      verifyEmailOtp({ newEmail: pendingEmail, otp }),
    onSuccess: () => setStep("done"),
  });

  const emailForm: EditEmailFormApi = useForm({
    defaultValues: { email: "" },
    onSubmit: async ({ value }) => {
      requestOtpMutation.mutate(value.email);
    },
  });

  const otpForm: OtpFormApi = useForm({
    defaultValues: { otp: "" },
    onSubmit: async ({ value }) => {
      verifyOtpMutation.mutate(value.otp);
    },
  });

  const requestError = requestOtpMutation.error
    ? requestOtpMutation.error instanceof EmailAlreadyInUseError
      ? requestOtpMutation.error.message
      : requestOtpMutation.error instanceof MockServerDownError
        ? "Server is unavailable. Please try again."
        : "Something went wrong. Please try again."
    : null;

  const verifyError = verifyOtpMutation.error
    ? verifyOtpMutation.error instanceof InvalidOtpError
      ? verifyOtpMutation.error.message
      : verifyOtpMutation.error instanceof MockServerDownError
        ? "Server is unavailable. Please try again."
        : "Something went wrong. Please try again."
    : null;

  return {
    step,
    pendingEmail,
    emailForm,
    otpForm,
    requestOtpMutation,
    verifyOtpMutation,
    requestError,
    verifyError,
    // Allow going back from OTP step to re-enter email
    backToEmail: () => setStep("email"),
  };
}
