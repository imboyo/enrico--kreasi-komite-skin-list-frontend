"use client";

import {
  useForm as useTanstackForm,
  type FormAsyncValidateOrFn,
  type FormValidateOrFn,
  type ReactFormExtendedApi,
} from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

import {
  changeAdminPassword,
  type AdminAccount,
  type ChangeAdminPasswordPayload,
} from "backend-service/admin/account/admin";
import { useToast } from "components/provider/Toast";
import { HttpError } from "libs/error/http-error";

import { ADMIN_ACCOUNT_QUERY_KEY } from "client-side-page/admin/user/admin/item-list/useAdminAccountList";

export type FormValues = {
  password: string;
};

const DEFAULT_VALUES: FormValues = {
  password: "",
};

export const formSchema = z.object({
  password: z
    .string()
    .min(8, "Password minimal 8 karakter")
    .max(128, "Password maksimal 128 karakter"),
});

export type FormApi = ReactFormExtendedApi<
  FormValues,
  undefined | FormValidateOrFn<FormValues>,
  undefined | FormValidateOrFn<FormValues>,
  undefined | FormAsyncValidateOrFn<FormValues>,
  undefined | FormValidateOrFn<FormValues>,
  undefined | FormAsyncValidateOrFn<FormValues>,
  undefined | FormValidateOrFn<FormValues>,
  undefined | FormAsyncValidateOrFn<FormValues>,
  undefined | FormValidateOrFn<FormValues>,
  undefined | FormAsyncValidateOrFn<FormValues>,
  undefined | FormAsyncValidateOrFn<FormValues>,
  never
>;

export function validateField<T>(
  schema: z.ZodType<T>,
  value: T,
): string | undefined {
  const result = schema.safeParse(value);
  return result.success ? undefined : result.error.issues[0]?.message;
}

function buildChangePasswordPayload(
  values: FormValues,
): ChangeAdminPasswordPayload {
  return {
    password: values.password,
  };
}

function getServerErrorMessage(error: unknown) {
  if (!error) return null;

  if (error instanceof HttpError) {
    return error.status >= 500
      ? "Server sedang tidak tersedia. Silakan coba lagi."
      : error.message;
  }

  return "Terjadi kesalahan. Silakan coba lagi.";
}

type UseFormParams = {
  admin: AdminAccount;
  onSuccess: () => void;
};

export function useForm({
  admin,
  onSuccess,
}: UseFormParams) {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const mutation = useMutation({
    mutationFn: (payload: ChangeAdminPasswordPayload) =>
      changeAdminPassword(admin.uuid, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ADMIN_ACCOUNT_QUERY_KEY,
      });
      showToast("Password admin berhasil diperbarui.", {
        variant: "success",
      });
      onSuccess();
    },
  });

  const form: FormApi = useTanstackForm({
    defaultValues: DEFAULT_VALUES,
    onSubmit: ({ value }) => {
      mutation.mutate(buildChangePasswordPayload(value));
    },
  });

  const serverError = getServerErrorMessage(mutation.error);

  function resetForm() {
    form.reset();
    mutation.reset();
  }

  return {
    form,
    mutation,
    serverError,
    isPending: mutation.isPending,
    resetForm,
  };
}
