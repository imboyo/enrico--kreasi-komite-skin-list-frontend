"use client";

import {
  useForm,
  type FormAsyncValidateOrFn,
  type FormValidateOrFn,
  type ReactFormExtendedApi,
} from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  addDefaultSkinCare,
  type AdminDefaultSkinCareCategory,
  type AddAdminDefaultSkinCarePayload,
} from "backend-service/admin/default-skin-care";
import { useToast } from "components/provider/Toast";

import { ADMIN_DEFAULT_SKIN_CARE_QUERY_KEY } from "../../utils/defaultSkinTreatCategory";
import {
  EMPTY_SKIN_CARE_FORM_VALUES,
  getSkinCareFormServerErrorMessage,
  normalizeSkinCareDescription,
  skinCareFormSchema,
  validateSkinCareField,
  type SkinCareFormValues,
} from "../../utils/skinCareForm";

export type AddSkinCareFormValues = SkinCareFormValues;
export {
  skinCareFormSchema as addSkinCareFormSchema,
  validateSkinCareField as validateAddSkinCareField,
};

export type AddSkinCareFormApi = ReactFormExtendedApi<
  AddSkinCareFormValues,
  undefined | FormValidateOrFn<AddSkinCareFormValues>,
  undefined | FormValidateOrFn<AddSkinCareFormValues>,
  undefined | FormAsyncValidateOrFn<AddSkinCareFormValues>,
  undefined | FormValidateOrFn<AddSkinCareFormValues>,
  undefined | FormAsyncValidateOrFn<AddSkinCareFormValues>,
  undefined | FormValidateOrFn<AddSkinCareFormValues>,
  undefined | FormAsyncValidateOrFn<AddSkinCareFormValues>,
  undefined | FormValidateOrFn<AddSkinCareFormValues>,
  undefined | FormAsyncValidateOrFn<AddSkinCareFormValues>,
  undefined | FormAsyncValidateOrFn<AddSkinCareFormValues>,
  never
>;

function buildCreateDefaultSkinCarePayload({
  category,
  values,
}: {
  category: AdminDefaultSkinCareCategory;
  values: AddSkinCareFormValues;
}): AddAdminDefaultSkinCarePayload {
  return {
    name: values.name.trim(),
    description: normalizeSkinCareDescription(values.description),
    category,
  };
}

type UseAddSkinCareFormParams = {
  category: AdminDefaultSkinCareCategory;
  categoryLabel: string;
  onSuccess: () => void;
};

export function useAddSkinCareForm({
  category,
  categoryLabel,
  onSuccess,
}: UseAddSkinCareFormParams) {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const mutation = useMutation({
    mutationFn: (payload: AddAdminDefaultSkinCarePayload) =>
      addDefaultSkinCare(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ADMIN_DEFAULT_SKIN_CARE_QUERY_KEY,
      });
      showToast(`Data ${categoryLabel.toLowerCase()} berhasil ditambahkan.`, {
        variant: "success",
      });
      onSuccess();
    },
  });

  const form: AddSkinCareFormApi = useForm({
    defaultValues: EMPTY_SKIN_CARE_FORM_VALUES,
    onSubmit: ({ value }) => {
      mutation.mutate(
        buildCreateDefaultSkinCarePayload({
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
