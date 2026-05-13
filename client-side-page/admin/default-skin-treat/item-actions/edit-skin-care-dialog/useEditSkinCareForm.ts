"use client";

import {
  useForm,
  type FormAsyncValidateOrFn,
  type FormValidateOrFn,
  type ReactFormExtendedApi,
} from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  editDefaultSkinCare,
  type AdminDefaultSkinCare,
  type EditAdminDefaultSkinCarePayload,
} from "backend-service/admin/default-skin-care";
import { useToast } from "components/provider/Toast";

import { ADMIN_DEFAULT_SKIN_CARE_QUERY_KEY } from "../../utils/defaultSkinTreatCategory";
import {
  getSkinCareFormValues,
  getSkinCareFormServerErrorMessage,
  normalizeSkinCareDescription,
  skinCareFormSchema,
  validateSkinCareField,
  type SkinCareFormValues,
} from "../../utils/skinCareForm";

export type EditSkinCareFormValues = SkinCareFormValues;
export {
  skinCareFormSchema as editSkinCareFormSchema,
  validateSkinCareField as validateEditSkinCareField,
};

export type EditSkinCareFormApi = ReactFormExtendedApi<
  EditSkinCareFormValues,
  undefined | FormValidateOrFn<EditSkinCareFormValues>,
  undefined | FormValidateOrFn<EditSkinCareFormValues>,
  undefined | FormAsyncValidateOrFn<EditSkinCareFormValues>,
  undefined | FormValidateOrFn<EditSkinCareFormValues>,
  undefined | FormAsyncValidateOrFn<EditSkinCareFormValues>,
  undefined | FormValidateOrFn<EditSkinCareFormValues>,
  undefined | FormAsyncValidateOrFn<EditSkinCareFormValues>,
  undefined | FormValidateOrFn<EditSkinCareFormValues>,
  undefined | FormAsyncValidateOrFn<EditSkinCareFormValues>,
  undefined | FormAsyncValidateOrFn<EditSkinCareFormValues>,
  never
>;

function buildUpdateDefaultSkinCarePayload(
  values: EditSkinCareFormValues,
): EditAdminDefaultSkinCarePayload {
  return {
    name: values.name.trim(),
    description: normalizeSkinCareDescription(values.description),
  };
}

export function useEditSkinCareForm(item: AdminDefaultSkinCare) {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const mutation = useMutation({
    mutationFn: (payload: EditAdminDefaultSkinCarePayload) =>
      editDefaultSkinCare(item.uuid, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ADMIN_DEFAULT_SKIN_CARE_QUERY_KEY,
      });
      showToast("Data skin care berhasil diperbarui.", { variant: "success" });
    },
  });

  const form: EditSkinCareFormApi = useForm({
    defaultValues: getSkinCareFormValues(item),
    onSubmit: ({ value }) => {
      mutation.mutate(buildUpdateDefaultSkinCarePayload(value));
    },
  });

  const serverError = getSkinCareFormServerErrorMessage(mutation.error);

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
