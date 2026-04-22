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

import { useLoginMutation } from "./useLoginMutation";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .pipe(z.email("Enter a valid email address")),
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
    defaultValues: { email: "", password: "" },
    onSubmit: async ({ value }) => {
      loginMutation.mutate(value);
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
