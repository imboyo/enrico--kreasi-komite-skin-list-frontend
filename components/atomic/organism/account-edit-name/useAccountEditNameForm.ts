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

import { updateAccountInfo } from "backend-service/account";
import { HttpError } from "libs/error/http-error";
import { useAuthStore } from "@/store/auth/auth.store";

export const accountEditNameSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
});

export type AccountEditNameFormValues = z.infer<typeof accountEditNameSchema>;

export type AccountEditNameFormApi = ReactFormExtendedApi<
  AccountEditNameFormValues,
  undefined | FormValidateOrFn<AccountEditNameFormValues>,
  undefined | FormValidateOrFn<AccountEditNameFormValues>,
  undefined | FormAsyncValidateOrFn<AccountEditNameFormValues>,
  undefined | FormValidateOrFn<AccountEditNameFormValues>,
  undefined | FormAsyncValidateOrFn<AccountEditNameFormValues>,
  undefined | FormValidateOrFn<AccountEditNameFormValues>,
  undefined | FormAsyncValidateOrFn<AccountEditNameFormValues>,
  undefined | FormValidateOrFn<AccountEditNameFormValues>,
  undefined | FormAsyncValidateOrFn<AccountEditNameFormValues>,
  undefined | FormAsyncValidateOrFn<AccountEditNameFormValues>,
  never
>;

export function validateAccountEditNameField<T>(
  schema: z.ZodType<T>,
  value: T,
): string | undefined {
  const result = schema.safeParse(value);
  return result.success ? undefined : result.error.issues[0]?.message;
}

function resolveSavedName(
  profile: Awaited<ReturnType<typeof updateAccountInfo>>,
  payload: AccountEditNameFormValues,
) {
  const serverName = profile.full_name?.trim() ?? "";
  // Some account update responses can omit or blank the name; keep the submitted value instead.
  return serverName || payload.name.trim();
}

export function useAccountEditNameForm() {
  const { userInfo, setUserInfo } = useAuthStore();
  const [isSuccess, setIsSuccess] = useState(false);

  const mutation = useMutation({
    mutationFn: (payload: AccountEditNameFormValues) =>
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

  const form: AccountEditNameFormApi = useForm({
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
