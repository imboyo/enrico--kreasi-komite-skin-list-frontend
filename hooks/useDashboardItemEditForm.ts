"use client";

import {
  useForm,
  type FormAsyncValidateOrFn,
  type FormValidateOrFn,
  type ReactFormExtendedApi,
} from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

import { updateSkinTreat, type SkinTreat } from "@/backend-service/user/skin-treat";
import type { DashboardEditableItem } from "@/mock-backend/user/dashboard/item-store";

export const dashboardItemEditSchema = z.object({
  label: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(60, "Title must be 60 characters or less"),
  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .max(280, "Description must be 280 characters or less"),
});

export type DashboardItemEditValues = z.infer<typeof dashboardItemEditSchema>;

export type DashboardItemEditFormApi = ReactFormExtendedApi<
  DashboardItemEditValues,
  undefined | FormValidateOrFn<DashboardItemEditValues>,
  undefined | FormValidateOrFn<DashboardItemEditValues>,
  undefined | FormAsyncValidateOrFn<DashboardItemEditValues>,
  undefined | FormValidateOrFn<DashboardItemEditValues>,
  undefined | FormAsyncValidateOrFn<DashboardItemEditValues>,
  undefined | FormValidateOrFn<DashboardItemEditValues>,
  undefined | FormAsyncValidateOrFn<DashboardItemEditValues>,
  undefined | FormValidateOrFn<DashboardItemEditValues>,
  undefined | FormAsyncValidateOrFn<DashboardItemEditValues>,
  undefined | FormAsyncValidateOrFn<DashboardItemEditValues>,
  never
>;

type UseDashboardItemEditFormParams = {
  item: DashboardEditableItem;
  onSuccess?: (updatedItem: DashboardEditableItem) => void;
};

function mapSkinTreatToDashboardItem(treat: SkinTreat): DashboardEditableItem {
  return {
    id: treat.uuid,
    label: treat.name,
    description: treat.description ?? "",
    isChecked: false,
  };
}

export function validateDashboardItemField<T>(
  schema: z.ZodType<T>,
  value: T,
): string | undefined {
  const result = schema.safeParse(value);
  return result.success ? undefined : result.error.issues[0]?.message;
}

export function useDashboardItemEditForm({
  item,
  onSuccess,
}: UseDashboardItemEditFormParams) {
  const mutation = useMutation({
    mutationFn: (payload: DashboardItemEditValues) =>
      updateSkinTreat(item.id, {
        name: payload.label,
        description: payload.description,
      }),
    onSuccess: (updatedTreat) => {
      onSuccess?.(mapSkinTreatToDashboardItem(updatedTreat));
    },
  });

  const form: DashboardItemEditFormApi = useForm({
    defaultValues: {
      label: item.label,
      description: item.description,
    },
    onSubmit: async ({ value }) => {
      await mutation.mutateAsync(value);
    },
  });

  const serverError = mutation.error
    ? "Failed to save item changes. Please try again."
    : null;

  function syncFormValues(values: DashboardItemEditValues) {
    form.reset(values);
    mutation.reset();
  }

  return {
    form,
    mutation,
    serverError,
    syncFormValues,
    schema: dashboardItemEditSchema,
  };
}
