"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState, type ChangeEvent } from "react";
import { z } from "zod";

import {
  updateUserAccount,
  type UpdateUserAccountPayload,
  type UserAccount,
} from "backend-service/admin/account/user";
import type { VisibleAccountStatus } from "backend-service/admin/account";
import { useToast } from "components/provider/Toast";
import { USER_ACCOUNT_QUERY_KEY } from "client-side-page/admin/user/user/account-list/useUserAccountList";
import { getServerErrorMessage } from "client-side-page/admin/user/user/account-list/item-card/item-actions/utils/getServerErrorMessage";

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

function getInitialValues(user: UserAccount): FormValues {
  return {
    fullName: user.full_name,
    email: user.email ?? "",
    phoneNumber: user.phone_number,
    status: user.status,
  };
}

function buildUpdatePayload(values: FormValues): UpdateUserAccountPayload {
  return {
    full_name: values.fullName.trim(),
    email: values.email.trim() || null,
    phone_number: values.phoneNumber.trim(),
    status: values.status,
  };
}

export function useForm({
  user,
  onSuccess,
}: {
  user: UserAccount;
  onSuccess: () => void;
}) {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const [values, setValues] = useState<FormValues>(() => getInitialValues(user));
  const [errors, setErrors] = useState<FormErrors>({});

  const mutation = useMutation({
    mutationFn: (payload: UpdateUserAccountPayload) =>
      updateUserAccount(user.uuid, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: USER_ACCOUNT_QUERY_KEY,
      });
      showToast("Pelanggan berhasil diperbarui.", { variant: "success" });
      onSuccess();
    },
  });

  const serverError = useMemo(
    () => getServerErrorMessage(mutation.error),
    [mutation.error],
  );

  function handleTextChange(field: "fullName" | "email" | "phoneNumber") {
    return (event: ChangeEvent<HTMLInputElement>) => {
      mutation.reset();
      setValues((currentValues) => ({
        ...currentValues,
        [field]: event.target.value,
      }));
      setErrors((currentErrors) => ({ ...currentErrors, [field]: undefined }));
    };
  }

  function handleStatusChange(event: ChangeEvent<HTMLSelectElement>) {
    mutation.reset();
    setValues((currentValues) => ({
      ...currentValues,
      status: event.target.value as VisibleAccountStatus,
    }));
    setErrors((currentErrors) => ({ ...currentErrors, status: undefined }));
  }

  async function handleSubmit() {
    const result = formSchema.safeParse(values);

    if (!result.success) {
      const nextErrors: FormErrors = {};
      // Show the first validation issue per field so the dialog stays concise.
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof FormValues | undefined;
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
    setValues(getInitialValues(user));
    setErrors({});
    mutation.reset();
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
