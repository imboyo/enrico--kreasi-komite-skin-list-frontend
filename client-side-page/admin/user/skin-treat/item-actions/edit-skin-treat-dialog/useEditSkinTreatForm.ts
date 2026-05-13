"use client";

import {
  useForm,
  type FormAsyncValidateOrFn,
  type FormValidateOrFn,
  type ReactFormExtendedApi,
} from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  updateAdminUserSkinTreat,
  type AdminUserSkinTreat,
  type UpdateAdminUserSkinTreatPayload,
} from "backend-service/admin/user/skin-treat";
import { useToast } from "components/provider/Toast";

import { ADMIN_USER_SKIN_TREAT_QUERY_KEY } from "../../utils/adminUserSkinTreatCategory";
import {
  getSkinTreatFormValues,
  getSkinTreatFormServerErrorMessage,
  normalizeSkinTreatDescription,
  skinTreatFormSchema,
  validateSkinTreatField,
  type SkinTreatFormValues,
} from "../../utils/skinTreatForm";

export type EditSkinTreatFormValues = SkinTreatFormValues;
export {
  skinTreatFormSchema as editSkinTreatFormSchema,
  validateSkinTreatField as validateEditSkinTreatField,
};

export type EditSkinTreatFormApi = ReactFormExtendedApi<
  EditSkinTreatFormValues,
  undefined | FormValidateOrFn<EditSkinTreatFormValues>,
  undefined | FormValidateOrFn<EditSkinTreatFormValues>,
  undefined | FormAsyncValidateOrFn<EditSkinTreatFormValues>,
  undefined | FormValidateOrFn<EditSkinTreatFormValues>,
  undefined | FormAsyncValidateOrFn<EditSkinTreatFormValues>,
  undefined | FormValidateOrFn<EditSkinTreatFormValues>,
  undefined | FormAsyncValidateOrFn<EditSkinTreatFormValues>,
  undefined | FormValidateOrFn<EditSkinTreatFormValues>,
  undefined | FormAsyncValidateOrFn<EditSkinTreatFormValues>,
  undefined | FormAsyncValidateOrFn<EditSkinTreatFormValues>,
  never
>;

function buildUpdateAdminUserSkinTreatPayload(
  values: EditSkinTreatFormValues,
): UpdateAdminUserSkinTreatPayload {
  return {
    name: values.name.trim(),
    description: normalizeSkinTreatDescription(values.description),
  };
}

export function useEditSkinTreatForm(item: AdminUserSkinTreat) {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const mutation = useMutation({
    mutationFn: (payload: UpdateAdminUserSkinTreatPayload) =>
      updateAdminUserSkinTreat(item.uuid, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ADMIN_USER_SKIN_TREAT_QUERY_KEY,
      });
      showToast("Data skin treat berhasil diperbarui.", { variant: "success" });
    },
  });

  const form: EditSkinTreatFormApi = useForm({
    defaultValues: getSkinTreatFormValues(item),
    onSubmit: ({ value }) => {
      mutation.mutate(buildUpdateAdminUserSkinTreatPayload(value));
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
