"use client";

import {
  useForm,
  type FormAsyncValidateOrFn,
  type FormValidateOrFn,
  type ReactFormExtendedApi,
} from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  addAdminDefaultSkinTreat,
  type AddAdminDefaultSkinTreatPayload,
  type AdminDefaultSkinTreatCategory,
} from "backend-service/admin/default-skin-care";
import { useToast } from "components/provider/Toast";

import { ADMIN_DEFAULT_SKIN_TREAT_QUERY_KEY } from "../../utils/defaultSkinTreatCategory";
import {
  EMPTY_SKIN_CARE_FORM_VALUES,
  getSkinCareFormServerErrorMessage,
  normalizeSkinCareDescription,
  skinCareFormSchema,
  validateSkinCareField,
  type SkinCareFormValues,
} from "../../utils/skinCareForm";

export type AddSkinTreatFormValues = SkinCareFormValues;
export {
  skinCareFormSchema as addSkinTreatFormSchema,
  validateSkinCareField as validateAddSkinTreatField,
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

function buildCreateDefaultSkinTreatPayload({
  category,
  values,
}: {
  category: AdminDefaultSkinTreatCategory;
  values: AddSkinTreatFormValues;
}): AddAdminDefaultSkinTreatPayload {
  return {
    name: values.name.trim(),
    description: normalizeSkinCareDescription(values.description),
    category,
  };
}

type UseAddSkinTreatFormParams = {
  category: AdminDefaultSkinTreatCategory;
  categoryLabel: string;
  onSuccess: () => void;
};

export function useAddSkinTreatForm({
  category,
  categoryLabel,
  onSuccess,
}: UseAddSkinTreatFormParams) {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const mutation = useMutation({
    mutationFn: (payload: AddAdminDefaultSkinTreatPayload) =>
      addAdminDefaultSkinTreat(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ADMIN_DEFAULT_SKIN_TREAT_QUERY_KEY,
      });
      showToast(`Data ${categoryLabel.toLowerCase()} berhasil ditambahkan.`, {
        variant: "success",
      });
      onSuccess();
    },
  });

  const form: AddSkinTreatFormApi = useForm({
    defaultValues: EMPTY_SKIN_CARE_FORM_VALUES,
    onSubmit: ({ value }) => {
      mutation.mutate(
        buildCreateDefaultSkinTreatPayload({
          category,
          values: value,
        }),
      );
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
