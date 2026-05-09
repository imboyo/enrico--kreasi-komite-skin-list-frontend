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

import { updateAccountInfo } from "backend-service/account";
import { HttpError } from "libs/error/http-error";
import { useAuthStore } from "@/store/auth/auth.store";

export const editNameSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
});

export type EditNameFormValues = z.infer<typeof editNameSchema>;

export type EditNameFormApi = ReactFormExtendedApi<
  EditNameFormValues,
  undefined | FormValidateOrFn<EditNameFormValues>,
  undefined | FormValidateOrFn<EditNameFormValues>,
  undefined | FormAsyncValidateOrFn<EditNameFormValues>,
  undefined | FormValidateOrFn<EditNameFormValues>,
  undefined | FormAsyncValidateOrFn<EditNameFormValues>,
  undefined | FormValidateOrFn<EditNameFormValues>,
  undefined | FormAsyncValidateOrFn<EditNameFormValues>,
  undefined | FormValidateOrFn<EditNameFormValues>,
  undefined | FormAsyncValidateOrFn<EditNameFormValues>,
  undefined | FormAsyncValidateOrFn<EditNameFormValues>,
  never
>;

export function validateEditNameField<T>(
  schema: z.ZodType<T>,
  value: T,
): string | undefined {
  const result = schema.safeParse(value);
  return result.success ? undefined : result.error.issues[0]?.message;
}

function resolveSavedName(
  profile: Awaited<ReturnType<typeof updateAccountInfo>>,
  payload: EditNameFormValues,
) {
  const serverName = profile.full_name?.trim() ?? "";
  // Some account update responses can omit or blank the name; keep the submitted value instead.
  return serverName || payload.name.trim();
}

export function useEditNameForm() {
  const { userInfo, setUserInfo } = useAuthStore();
  const [isSuccess, setIsSuccess] = useState(false);

  const mutation = useMutation({
    mutationFn: (payload: EditNameFormValues) =>
      updateAccountInfo({ full_name: payload.name }),
    onMutate: () => setIsSuccess(false),
    onSuccess: (profile, payload) => {
      setIsSuccess(true);

      // Keep the local auth summary aligned with the updated account profile.
      const savedName = resolveSavedName(profile, payload);
      if (userInfo) {
        setUserInfo({ ...userInfo, fullName: savedName });
      }
      form.reset({ name: savedName });
    },
  });

  const form: EditNameFormApi = useForm({
    defaultValues: { name: userInfo?.fullName ?? "" },
    onSubmit: async ({ value }) => {
      mutation.mutate(value);
    },
  });

  const serverError = mutation.error
    ? mutation.error instanceof HttpError
      ? mutation.error.status >= 500
        ? "Server sedang tidak tersedia. Silakan coba lagi."
        : mutation.error.message
      : "Terjadi kesalahan. Silakan coba lagi."
    : null;

  return { form, mutation, serverError, isSuccess };
}
