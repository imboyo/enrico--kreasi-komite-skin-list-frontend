"use client";

import {
  useForm,
  type ReactFormExtendedApi,
  type FormValidateOrFn,
  type FormAsyncValidateOrFn,
} from "@tanstack/react-form";
import { useState } from "react";
import { z } from "zod";

import {
  normalizeWhatsappNumber,
  whatsappNumberSchema,
} from "libs/util/whatsapp-number";

import { useRegisterMutation } from "./useRegisterMutation";

export const registerSchema = z
  .object({
    name: z.string().min(1, "Nama lengkap wajib diisi"),
    whatsappNumber: whatsappNumberSchema,
    password: z
      .string()
      .min(1, "Kata sandi wajib diisi")
      .min(6, "Kata sandi minimal 6 karakter"),
    confirmPassword: z.string().min(1, "Mohon konfirmasi kata sandi Anda"),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: "Konfirmasi kata sandi tidak cocok",
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
      whatsappNumber: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async ({ value }) => {
      registerMutation.mutate({
        name: value.name,
        whatsappNumber: normalizeWhatsappNumber(value.whatsappNumber),
        password: value.password,
      });
    },
  });

  const serverError = registerMutation.error
    ? "Terjadi kesalahan. Silakan coba lagi."
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
