"use client";

import {
  useForm,
  type FormAsyncValidateOrFn,
  type FormValidateOrFn,
  type ReactFormExtendedApi,
} from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  editAdminDefaultSkinTreat,
  type AdminDefaultSkinTreat,
  type EditAdminDefaultSkinTreatPayload,
} from "backend-service/admin/default-skin-care";
import { useToast } from "components/provider/Toast";

import { ADMIN_DEFAULT_SKIN_TREAT_QUERY_KEY } from "../../utils/defaultSkinTreatCategory";
import {
  getSkinCareFormServerErrorMessage,
  getSkinCareFormValues,
  normalizeSkinCareDescription,
  skinCareFormSchema,
  validateSkinCareField,
  type SkinCareFormValues,
} from "../../utils/skinCareForm";

export type EditSkinTreatFormValues = SkinCareFormValues;
export {
  skinCareFormSchema as editSkinTreatFormSchema,
  validateSkinCareField as validateEditSkinTreatField,
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

function buildUpdateDefaultSkinTreatPayload(
  values: EditSkinTreatFormValues,
): EditAdminDefaultSkinTreatPayload {
  return {
    name: values.name.trim(),
    description: normalizeSkinCareDescription(values.description),
  };
}

export function useEditSkinTreatForm(item: AdminDefaultSkinTreat) {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const mutation = useMutation({
    mutationFn: (payload: EditAdminDefaultSkinTreatPayload) =>
      editAdminDefaultSkinTreat(item.uuid, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ADMIN_DEFAULT_SKIN_TREAT_QUERY_KEY,
      });
      showToast("Data skin treat berhasil diperbarui.", {
        variant: "success",
      });
    },
  });

  const form: EditSkinTreatFormApi = useForm({
    defaultValues: getSkinCareFormValues(item),
    onSubmit: ({ value }) => {
      mutation.mutate(buildUpdateDefaultSkinTreatPayload(value));
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
