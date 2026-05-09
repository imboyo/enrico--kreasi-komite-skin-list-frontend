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

import { changePassword } from "backend-service/account/password.service";

export const accountEditPasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Kata sandi saat ini wajib diisi"),
    newPassword: z
      .string()
      .min(1, "Kata sandi baru wajib diisi")
      .min(6, "Kata sandi minimal 6 karakter"),
    confirmPassword: z
      .string()
      .min(1, "Konfirmasi kata sandi baru wajib diisi"),
  })
  .refine((value) => value.newPassword === value.confirmPassword, {
    message: "Kata sandi tidak cocok",
    path: ["confirmPassword"],
  });

export type AccountEditPasswordFormValues = z.infer<
  typeof accountEditPasswordSchema
>;

export type AccountEditPasswordFormApi = ReactFormExtendedApi<
  AccountEditPasswordFormValues,
  undefined | FormValidateOrFn<AccountEditPasswordFormValues>,
  undefined | FormValidateOrFn<AccountEditPasswordFormValues>,
  undefined | FormAsyncValidateOrFn<AccountEditPasswordFormValues>,
  undefined | FormValidateOrFn<AccountEditPasswordFormValues>,
  undefined | FormAsyncValidateOrFn<AccountEditPasswordFormValues>,
  undefined | FormValidateOrFn<AccountEditPasswordFormValues>,
  undefined | FormAsyncValidateOrFn<AccountEditPasswordFormValues>,
  undefined | FormValidateOrFn<AccountEditPasswordFormValues>,
  undefined | FormAsyncValidateOrFn<AccountEditPasswordFormValues>,
  undefined | FormAsyncValidateOrFn<AccountEditPasswordFormValues>,
  never
>;

export function validateAccountEditPasswordField<T>(
  schema: z.ZodType<T>,
  value: T,
): string | undefined {
  const result = schema.safeParse(value);
  return result.success ? undefined : result.error.issues[0]?.message;
}

export function useAccountEditPasswordForm() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const mutation = useMutation({
    mutationFn: (payload: AccountEditPasswordFormValues) =>
      changePassword({
        old_password: payload.currentPassword,
        new_password: payload.newPassword,
      }),
    onSuccess: () => setIsSuccess(true),
  });

  const form: AccountEditPasswordFormApi = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    onSubmit: async ({ value }) => {
      mutation.mutate(value);
    },
  });

  const serverError = mutation.error
    ? mutation.error instanceof Error
      ? mutation.error.message
      : "Terjadi kesalahan. Silakan coba lagi."
    : null;

  return {
    form,
    mutation,
    serverError,
    isSuccess,
    showCurrent,
    showNew,
    showConfirm,
    toggleShowCurrent: () => setShowCurrent((previous) => !previous),
    toggleShowNew: () => setShowNew((previous) => !previous),
    toggleShowConfirm: () => setShowConfirm((previous) => !previous),
  };
}
