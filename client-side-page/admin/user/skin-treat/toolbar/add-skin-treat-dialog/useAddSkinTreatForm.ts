"use client";

import {
  useForm,
  type FormAsyncValidateOrFn,
  type FormValidateOrFn,
  type ReactFormExtendedApi,
} from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  createUserSkinTreat,
  type AdminUserSkinTreatCategory,
  type CreateAdminUserSkinTreatPayload,
} from "backend-service/admin/user/skin-treat";
import { useToast } from "components/provider/Toast";

import { ADMIN_USER_SKIN_TREAT_QUERY_KEY } from "../../utils/adminUserSkinTreatCategory";
import {
  EMPTY_SKIN_TREAT_FORM_VALUES,
  getSkinTreatFormServerErrorMessage,
  normalizeSkinTreatDescription,
  skinTreatFormSchema,
  validateSkinTreatField,
  type SkinTreatFormValues,
} from "../../utils/skinTreatForm";

export type AddSkinTreatFormValues = SkinTreatFormValues;
export {
  skinTreatFormSchema as addSkinTreatFormSchema,
  validateSkinTreatField as validateAddSkinTreatField,
};

export type AddSkinTreatFormApi = ReactFormExtendedApi<
  AddSkinTreatFormValues,
  undefined | FormValidateOrFn<AddSkinTreatFormValues>,
  undefined | FormValidateOrFn<AddSkinTreatFormValues>,
  undefined | FormAsyncValidateOrFn<AddSkinTreatFormValues>,
  undefined | FormValidateOrFn<AddSkinTreatFormValues>,
  undefined | FormAsyncValidateOrFn<AddSkinTreatFormValues>,
  undefined | FormValidateOrFn<AddSkinTreatFormValues>,
  undefined | FormAsyncValidateOrFn<AddSkinTreatFormValues>,
  undefined | FormValidateOrFn<AddSkinTreatFormValues>,
  undefined | FormAsyncValidateOrFn<AddSkinTreatFormValues>,
  undefined | FormAsyncValidateOrFn<AddSkinTreatFormValues>,
  never
>;

function buildCreateUserSkinTreatPayload({
  userUuid,
  category,
  values,
}: {
  userUuid: string;
  category: AdminUserSkinTreatCategory;
  values: AddSkinTreatFormValues;
}): CreateAdminUserSkinTreatPayload {
  return {
    user_uuid: userUuid,
    name: values.name.trim(),
    description: normalizeSkinTreatDescription(values.description),
    category,
  };
}

type UseAddSkinTreatFormParams = {
  userUuid: string;
  category: AdminUserSkinTreatCategory;
  categoryLabel: string;
  onSuccess: () => void;
};

export function useAddSkinTreatForm({
  userUuid,
  category,
  categoryLabel,
  onSuccess,
}: UseAddSkinTreatFormParams) {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const mutation = useMutation({
    mutationFn: (payload: CreateAdminUserSkinTreatPayload) =>
      createUserSkinTreat(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ADMIN_USER_SKIN_TREAT_QUERY_KEY,
      });
      showToast(`Data ${categoryLabel.toLowerCase()} berhasil ditambahkan.`, {
        variant: "success",
      });
      onSuccess();
    },
  });

  const form: AddSkinTreatFormApi = useForm({
    defaultValues: EMPTY_SKIN_TREAT_FORM_VALUES,
    onSubmit: ({ value }) => {
      mutation.mutate(
        buildCreateUserSkinTreatPayload({
          userUuid,
          category,
          values: value,
        }),
      );
    },
  });

  const serverError = getSkinTreatFormServerErrorMessage(mutation.error);

  function resetForm() {
    form.reset();
    mutation.reset();
  }

  return {
    form,
    serverError,
    isPending: mutation.isPending,
    resetForm,
  };
}
