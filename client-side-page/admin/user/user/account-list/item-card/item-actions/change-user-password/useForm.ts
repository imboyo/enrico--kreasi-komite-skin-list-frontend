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
  changeUserPassword,
  type ChangeUserPasswordPayload,
  type UserAccount,
} from "backend-service/admin/account/user";
import { useToast } from "components/provider/Toast";
import { USER_ACCOUNT_QUERY_KEY } from "client-side-page/admin/user/user/account-list/useUserAccountList";
import { getServerErrorMessage } from "client-side-page/admin/user/user/account-list/item-card/item-actions/utils/getServerErrorMessage";

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
): ChangeUserPasswordPayload {
  return {
    password: values.password,
  };
}

type UseFormParams = {
  user: UserAccount;
  onSuccess: () => void;
};

export function useForm({ user, onSuccess }: UseFormParams) {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const mutation = useMutation({
    mutationFn: (payload: ChangeUserPasswordPayload) =>
      changeUserPassword(user.uuid, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: USER_ACCOUNT_QUERY_KEY,
      });
      showToast("Password pelanggan berhasil diperbarui.", {
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
