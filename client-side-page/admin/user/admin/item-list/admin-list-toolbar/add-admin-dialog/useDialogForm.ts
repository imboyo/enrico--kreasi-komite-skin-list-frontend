"use client";

import {
  useForm,
  type FormAsyncValidateOrFn,
  type FormValidateOrFn,
  type ReactFormExtendedApi,
} from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

import {
  createAdminAccount,
  type CreateAdminAccountPayload,
} from "backend-service/admin/account/admin";
import type { VisibleAccountStatus } from "backend-service/admin/account";
import { useToast } from "components/provider/Toast";
import { HttpError } from "libs/error/http-error";
import {
  normalizeWhatsappNumber,
  whatsappNumberSchema,
} from "libs/util/whatsapp-number";

import { ADMIN_ACCOUNT_QUERY_KEY } from "client-side-page/admin/user/admin/item-list/useAdminAccountList";

export type DialogFormValues = {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  status: VisibleAccountStatus;
};

const DEFAULT_VALUES: DialogFormValues = {
  fullName: "",
  email: "",
  phoneNumber: "",
  password: "",
  status: "ACTIVE",
};

export const dialogFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Nama wajib diisi")
    .max(150, "Nama maksimal 150 karakter"),
  email: z.string().trim().email("Email tidak valid").or(z.literal("")),
  phoneNumber: whatsappNumberSchema,
  password: z
    .string()
    .min(8, "Password minimal 8 karakter")
    .max(128, "Password maksimal 128 karakter"),
  status: z.enum(["ACTIVE", "INACTIVE"]),
});

export type DialogFormApi = ReactFormExtendedApi<
  DialogFormValues,
  undefined | FormValidateOrFn<DialogFormValues>,
  undefined | FormValidateOrFn<DialogFormValues>,
  undefined | FormAsyncValidateOrFn<DialogFormValues>,
  undefined | FormValidateOrFn<DialogFormValues>,
  undefined | FormAsyncValidateOrFn<DialogFormValues>,
  undefined | FormValidateOrFn<DialogFormValues>,
  undefined | FormAsyncValidateOrFn<DialogFormValues>,
  undefined | FormValidateOrFn<DialogFormValues>,
  undefined | FormAsyncValidateOrFn<DialogFormValues>,
  undefined | FormAsyncValidateOrFn<DialogFormValues>,
  never
>;

export function validateDialogField<T>(
  schema: z.ZodType<T>,
  value: T,
): string | undefined {
  const result = schema.safeParse(value);
  return result.success ? undefined : result.error.issues[0]?.message;
}

function buildCreatePayload(
  values: DialogFormValues,
): CreateAdminAccountPayload {
  return {
    full_name: values.fullName.trim(),
    email: values.email.trim() || null,
    phone_number: normalizeWhatsappNumber(values.phoneNumber),
    password: values.password,
    status: values.status,
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

type UseDialogFormParams = {
  onSuccess: () => void;
};

export function useDialogForm({ onSuccess }: UseDialogFormParams) {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const mutation = useMutation({
    mutationFn: (payload: CreateAdminAccountPayload) =>
      createAdminAccount(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ADMIN_ACCOUNT_QUERY_KEY,
      });
      showToast("Admin berhasil ditambahkan.", { variant: "success" });
      onSuccess();
    },
  });

  const form: DialogFormApi = useForm({
    defaultValues: DEFAULT_VALUES,
    onSubmit: ({ value }) => {
      mutation.mutate(buildCreatePayload(value));
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
