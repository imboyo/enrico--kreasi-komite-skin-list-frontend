"use client";

import {
  useForm,
  type ReactFormExtendedApi,
  type FormValidateOrFn,
  type FormAsyncValidateOrFn,
} from "@tanstack/react-form";
import { useState } from "react";
import { z } from "zod";

import { EmailAlreadyRegisteredError } from "@/mock-backend/auth/register";

import { useRegisterMutation } from "./useRegisterMutation";

export const registerSchema = z
  .object({
    name: z.string().min(1, "Full name is required"),
    email: z
      .string()
      .min(1, "Email is required")
      .pipe(z.email("Enter a valid email address")),
    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;

export type RegisterFormApi = ReactFormExtendedApi<
  RegisterFormValues,
  undefined | FormValidateOrFn<RegisterFormValues>,
  undefined | FormValidateOrFn<RegisterFormValues>,
  undefined | FormAsyncValidateOrFn<RegisterFormValues>,
  undefined | FormValidateOrFn<RegisterFormValues>,
  undefined | FormAsyncValidateOrFn<RegisterFormValues>,
  undefined | FormValidateOrFn<RegisterFormValues>,
  undefined | FormAsyncValidateOrFn<RegisterFormValues>,
  undefined | FormValidateOrFn<RegisterFormValues>,
  undefined | FormAsyncValidateOrFn<RegisterFormValues>,
  undefined | FormAsyncValidateOrFn<RegisterFormValues>,
  never
>;

// Runs a single zod schema and returns the first validation issue when present.
export function validateRegisterField<T>(
  schema: z.ZodType<T>,
  value: T,
): string | undefined {
  const result = schema.safeParse(value);
  return result.success ? undefined : result.error.issues[0]?.message;
}

export function useRegisterForm() {
  const registerMutation = useRegisterMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form: RegisterFormApi = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async ({ value }) => {
      registerMutation.mutate({
        name: value.name,
        email: value.email,
        password: value.password,
      });
    },
  });

  const serverError = registerMutation.error
    ? registerMutation.error instanceof EmailAlreadyRegisteredError
      ? registerMutation.error.message
      : "Something went wrong. Please try again."
    : null;

  return {
    form,
    registerMutation,
    serverError,
    showPassword,
    showConfirmPassword,
    toggleShowPassword: () => {
      setShowPassword((prev) => !prev);
    },
    toggleShowConfirmPassword: () => {
      setShowConfirmPassword((prev) => !prev);
    },
  };
}
