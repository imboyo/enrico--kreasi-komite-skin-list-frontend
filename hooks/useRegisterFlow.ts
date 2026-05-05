"use client";

import {
  useForm,
  type FormAsyncValidateOrFn,
  type FormValidateOrFn,
  type ReactFormExtendedApi,
} from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { z } from "zod";

import {
  requestRegisterOtp,
  verifyRegisterOtp,
} from "@/mock-backend/auth/register-otp";
import { normalizeWhatsappNumber } from "libs/util/whatsapp-number";

import {
  validateRegisterField,
  type RegisterFormApi,
  type RegisterFormValues,
} from "./useRegisterForm";
import { useMultiStepForm } from "./useMultiStepForm";

const REGISTER_FLOW_STEPS = ["register", "otp", "success"] as const;

export const registerOtpSchema = z.object({
  otp: z.string().min(1, "OTP is required").length(6, "OTP must be 6 digits"),
});

type RegisterOtpValues = z.infer<typeof registerOtpSchema>;

type RegisterOtpFormApi = ReactFormExtendedApi<
  RegisterOtpValues,
  undefined | FormValidateOrFn<RegisterOtpValues>,
  undefined | FormValidateOrFn<RegisterOtpValues>,
  undefined | FormAsyncValidateOrFn<RegisterOtpValues>,
  undefined | FormValidateOrFn<RegisterOtpValues>,
  undefined | FormAsyncValidateOrFn<RegisterOtpValues>,
  undefined | FormValidateOrFn<RegisterOtpValues>,
  undefined | FormAsyncValidateOrFn<RegisterOtpValues>,
  undefined | FormValidateOrFn<RegisterOtpValues>,
  undefined | FormAsyncValidateOrFn<RegisterOtpValues>,
  undefined | FormAsyncValidateOrFn<RegisterOtpValues>,
  never
>;

export function useRegisterFlow() {
  const flow = useMultiStepForm({
    steps: REGISTER_FLOW_STEPS,
  });
  const [pendingRegistration, setPendingRegistration] =
    useState<RegisterFormValues | null>(null);
  const [registeredUser, setRegisteredUser] = useState<{
    name: string;
    whatsappNumber: string;
  } | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const registerMutation = useMutation({
    mutationFn: (payload: RegisterFormValues) =>
      requestRegisterOtp(
        {
          name: payload.name,
          whatsappNumber: normalizeWhatsappNumber(payload.whatsappNumber),
          password: payload.password,
        },
        { delayMs: 1000 },
      ),
    onSuccess: (_, payload) => {
      setPendingRegistration(payload);
      otpForm.reset();
      flow.nextStep();
    },
  });

  const verifyOtpMutation = useMutation({
    mutationFn: (otp: string) => {
      if (!pendingRegistration) {
        throw new Error("Missing pending registration data.");
      }

      return verifyRegisterOtp(
        {
          ...pendingRegistration,
          otp,
        },
        { delayMs: 1000 },
      );
    },
    onSuccess: (response) => {
      setRegisteredUser(response.user);
      flow.nextStep();
    },
  });

  const form: RegisterFormApi = useForm({
    defaultValues: {
      name: "",
      whatsappNumber: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async ({ value }) => {
      registerMutation.mutate(value);
    },
  });

  const otpForm: RegisterOtpFormApi = useForm({
    defaultValues: {
      otp: "",
    },
    onSubmit: async ({ value }) => {
      verifyOtpMutation.mutate(value.otp);
    },
  });

  const registerError = registerMutation.error
    ? "Something went wrong. Please try again."
    : null;

  const verifyError = verifyOtpMutation.error
    ? "Something went wrong. Please try again."
    : null;

  return {
    ...flow,
    form,
    otpForm,
    pendingRegistration,
    registeredUser,
    registerMutation,
    verifyOtpMutation,
    registerError,
    verifyError,
    showPassword,
    showConfirmPassword,
    toggleShowPassword: () => {
      setShowPassword((previousValue) => !previousValue);
    },
    toggleShowConfirmPassword: () => {
      setShowConfirmPassword((previousValue) => !previousValue);
    },
    backToRegister: () => {
      // Keep the typed values so the user only edits what needs fixing.
      flow.goToStep("register");
    },
    validateOtpField: (value: string) =>
      validateRegisterField(registerOtpSchema.shape.otp, value),
  };
}
