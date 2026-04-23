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
  updatePassword,
  WrongCurrentPasswordError,
} from "@/mock-backend/user/profile/update-password";
import { MockServerDownError } from "@/mock-backend/utils/mock-control";

export const editPasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(1, "New password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((v) => v.newPassword === v.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type EditPasswordFormValues = z.infer<typeof editPasswordSchema>;

export type EditPasswordFormApi = ReactFormExtendedApi<
  EditPasswordFormValues,
  undefined | FormValidateOrFn<EditPasswordFormValues>,
  undefined | FormValidateOrFn<EditPasswordFormValues>,
  undefined | FormAsyncValidateOrFn<EditPasswordFormValues>,
  undefined | FormValidateOrFn<EditPasswordFormValues>,
  undefined | FormAsyncValidateOrFn<EditPasswordFormValues>,
  undefined | FormValidateOrFn<EditPasswordFormValues>,
  undefined | FormAsyncValidateOrFn<EditPasswordFormValues>,
  undefined | FormValidateOrFn<EditPasswordFormValues>,
  undefined | FormAsyncValidateOrFn<EditPasswordFormValues>,
  undefined | FormAsyncValidateOrFn<EditPasswordFormValues>,
  never
>;

export function validateEditPasswordField<T>(
  schema: z.ZodType<T>,
  value: T,
): string | undefined {
  const result = schema.safeParse(value);
  return result.success ? undefined : result.error.issues[0]?.message;
}

export function useEditPasswordForm() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const mutation = useMutation({
    mutationFn: (payload: EditPasswordFormValues) =>
      updatePassword({
        currentPassword: payload.currentPassword,
        newPassword: payload.newPassword,
      }),
    onSuccess: () => setIsSuccess(true),
  });

  const form: EditPasswordFormApi = useForm({
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
    ? mutation.error instanceof WrongCurrentPasswordError
      ? mutation.error.message
      : mutation.error instanceof MockServerDownError
        ? "Server is unavailable. Please try again."
        : "Something went wrong. Please try again."
    : null;

  return {
    form,
    mutation,
    serverError,
    isSuccess,
    showCurrent,
    showNew,
    showConfirm,
    toggleShowCurrent: () => setShowCurrent((p) => !p),
    toggleShowNew: () => setShowNew((p) => !p),
    toggleShowConfirm: () => setShowConfirm((p) => !p),
  };
}
