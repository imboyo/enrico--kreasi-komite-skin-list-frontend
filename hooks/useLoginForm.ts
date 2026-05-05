"use client";

import {
  useForm,
  type ReactFormExtendedApi,
  type FormValidateOrFn,
  type FormAsyncValidateOrFn,
} from "@tanstack/react-form";
import { useState } from "react";
import { z } from "zod";

import { InvalidCredentialsError } from "@/mock-backend/auth/login";
import {
  normalizeWhatsappNumber,
  whatsappNumberSchema,
} from "libs/util/whatsapp-number";

import { useLoginMutation } from "./useLoginMutation";

export const loginSchema = z.object({
  whatsappNumber: whatsappNumberSchema,
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export type LoginFormApi = ReactFormExtendedApi<
  LoginFormValues,
  undefined | FormValidateOrFn<LoginFormValues>,
  undefined | FormValidateOrFn<LoginFormValues>,
  undefined | FormAsyncValidateOrFn<LoginFormValues>,
  undefined | FormValidateOrFn<LoginFormValues>,
  undefined | FormAsyncValidateOrFn<LoginFormValues>,
  undefined | FormValidateOrFn<LoginFormValues>,
  undefined | FormAsyncValidateOrFn<LoginFormValues>,
  undefined | FormValidateOrFn<LoginFormValues>,
  undefined | FormAsyncValidateOrFn<LoginFormValues>,
  undefined | FormAsyncValidateOrFn<LoginFormValues>,
  never
>;

// Runs a single zod field schema and returns the first error message or undefined.
export function validateLoginField<T>(
  schema: z.ZodType<T>,
  value: T,
): string | undefined {
  const result = schema.safeParse(value);
  return result.success ? undefined : result.error.issues[0]?.message;
}

export function useLoginForm() {
  const loginMutation = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);

  const form: LoginFormApi = useForm({
    defaultValues: { whatsappNumber: "", password: "" },
    onSubmit: async ({ value }) => {
      loginMutation.mutate({
        whatsappNumber: normalizeWhatsappNumber(value.whatsappNumber),
        password: value.password,
      });
    },
  });

  const serverError = loginMutation.error
    ? loginMutation.error instanceof InvalidCredentialsError
      ? loginMutation.error.message
      : "Something went wrong. Please try again."
    : null;

  return {
    form,
    loginMutation,
    serverError,
    showPassword,
    toggleShowPassword: () => {
      // Keep password visibility logic near the password field workflow so the page stays presentational.
      setShowPassword((prev) => !prev);
    },
  };
}
