"use client";

import {
  useForm,
  type FormAsyncValidateOrFn,
  type FormValidateOrFn,
  type ReactFormExtendedApi,
} from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

import {
  updateSkinTreat,
  type SkinTreatCategory,
  type SkinTreat,
} from "@/backend-service/user/skin-treat";
import type { DashboardEditableItem } from "@/client-side-page/app/home/util/dashboard-item.types";

export const dashboardItemEditSchema = z.object({
  label: z
    .string()
    .trim()
    .min(1, "Judul wajib diisi")
    .max(60, "Judul maksimal 60 karakter"),
  description: z
    .string()
    .trim()
    .max(280, "Deskripsi maksimal 280 karakter"),
  category: z.enum([
    "routine",
    "make_up",
    "barrier",
    "colors",
    "scars",
    "contour",
    "fats",
    "hairs",
  ]),
});

export type DashboardItemEditValues = z.infer<typeof dashboardItemEditSchema>;
export type DashboardItemEditSuccessPayload = {
  item: DashboardEditableItem;
  category: SkinTreatCategory;
};

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
  category: SkinTreatCategory;
  onSuccess?: (payload: DashboardItemEditSuccessPayload) => void;
};

function mapSkinTreatToDashboardItem(treat: SkinTreat): DashboardEditableItem {
  return {
    id: treat.uuid,
    label: treat.name,
    description: treat.description ?? "",
    isChecked: treat.is_check,
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
  category,
  onSuccess,
}: UseDashboardItemEditFormParams) {
  const mutation = useMutation({
    mutationFn: (payload: DashboardItemEditValues) =>
      updateSkinTreat(item.id, {
        name: payload.label,
        // Send null for empty description so edit behavior matches the add flow and nullable backend contract.
        description: payload.description.trim() || null,
        category: payload.category,
      }),
    onSuccess: (updatedTreat) => {
      onSuccess?.({
        item: mapSkinTreatToDashboardItem(updatedTreat),
        category: updatedTreat.category,
      });
    },
  });

  const form: DashboardItemEditFormApi = useForm({
    defaultValues: {
      label: item.label,
      description: item.description,
      category,
    },
    onSubmit: async ({ value }) => {
      await mutation.mutateAsync(value);
    },
  });

  const serverError = mutation.error
    ? "Gagal menyimpan perubahan item. Silakan coba lagi."
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
