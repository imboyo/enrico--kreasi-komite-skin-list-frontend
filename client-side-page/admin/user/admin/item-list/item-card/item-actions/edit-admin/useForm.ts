"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState, type ChangeEvent } from "react";
import { z } from "zod";

import {
  updateAdminAccount,
  type AdminAccount,
  type UpdateAdminAccountPayload,
} from "backend-service/admin/account/admin/index";
import type { VisibleAccountStatus } from "backend-service/admin/account/index";
import { useToast } from "components/provider/Toast";
import { HttpError } from "libs/error/http-error";
import { ADMIN_ACCOUNT_QUERY_KEY } from "client-side-page/admin/user/admin/item-list/useAdminAccountList";

type FormValues = {
  fullName: string;
  email: string;
  phoneNumber: string;
  status: VisibleAccountStatus;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const formSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Nama wajib diisi")
    .max(150, "Nama maksimal 150 karakter"),
  email: z.string().trim().email("Email tidak valid").or(z.literal("")),
  phoneNumber: z
    .string()
    .trim()
    .min(1, "Nomor telepon wajib diisi")
    .max(30, "Nomor telepon maksimal 30 karakter"),
  status: z.enum(["ACTIVE", "INACTIVE"]),
});

function getInitialValues(admin: AdminAccount): FormValues {
  return {
    fullName: admin.full_name,
    email: admin.email ?? "",
    phoneNumber: admin.phone_number,
    status: admin.status,
  };
}

function buildUpdatePayload(
  values: FormValues,
): UpdateAdminAccountPayload {
  return {
    full_name: values.fullName.trim(),
    email: values.email.trim() || null,
    phone_number: values.phoneNumber.trim(),
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

export function useForm({
  admin,
  onSuccess,
}: {
  admin: AdminAccount;
  onSuccess: () => void;
}) {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const [values, setValues] = useState<FormValues>(() =>
    getInitialValues(admin),
  );
  const [errors, setErrors] = useState<FormErrors>({});

  const mutation = useMutation({
    mutationFn: (payload: UpdateAdminAccountPayload) =>
      updateAdminAccount(admin.uuid, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ADMIN_ACCOUNT_QUERY_KEY,
      });
      showToast("Admin berhasil diperbarui.", { variant: "success" });
      onSuccess();
    },
  });

  const serverError = useMemo(
    () => getServerErrorMessage(mutation.error),
    [mutation.error],
  );

  function handleTextChange(field: "fullName" | "email" | "phoneNumber") {
    return (event: ChangeEvent<HTMLInputElement>) => {
      setValues((currentValues) => ({
        ...currentValues,
        [field]: event.target.value,
      }));
      setErrors((currentErrors) => ({ ...currentErrors, [field]: undefined }));
    };
  }

  function handleStatusChange(event: ChangeEvent<HTMLSelectElement>) {
    setValues((currentValues) => ({
      ...currentValues,
      status: event.target.value as VisibleAccountStatus,
    }));
    setErrors((currentErrors) => ({ ...currentErrors, status: undefined }));
  }

  async function handleSubmit() {
    const result = formSchema.safeParse(values);

    if (!result.success) {
      const nextErrors: EditAdminFormErrors = {};
      // Show the first validation issue for each field so the form stays compact.
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof EditAdminFormValues | undefined;
        if (field && !nextErrors[field]) {
          nextErrors[field] = issue.message;
        }
      });
      setErrors(nextErrors);
      return;
    }

    await mutation.mutateAsync(buildUpdatePayload(result.data));
  }

  function resetForm() {
    setValues(getInitialValues(admin));
    setErrors({});
  }

  return {
    values,
    errors,
    mutation,
    serverError,
    handleTextChange,
    handleStatusChange,
    handleSubmit,
    resetForm,
  };
}
