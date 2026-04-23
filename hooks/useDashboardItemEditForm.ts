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
  dashboardItemEditSchema,
  updateDashboardItem,
  DashboardItemNotFoundError,
  type DashboardItemEditValues,
} from "@/mock-backend/user/dashboard/update-item";
import { MockServerDownError } from "@/mock-backend/utils/mock-control";
import type {
  DashboardEditableItem,
  DashboardItemCategory,
} from "@/mock-backend/user/dashboard/item-store";

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
  category: DashboardItemCategory;
  item: DashboardEditableItem;
  onSuccess?: (updatedItem: DashboardEditableItem) => void;
};

export function validateDashboardItemField<T>(
  schema: z.ZodType<T>,
  value: T,
): string | undefined {
  const result = schema.safeParse(value);
  return result.success ? undefined : result.error.issues[0]?.message;
}

export function useDashboardItemEditForm({
  category,
  item,
  onSuccess,
}: UseDashboardItemEditFormParams) {
  const mutation = useMutation({
    mutationFn: (payload: DashboardItemEditValues) =>
      updateDashboardItem(
        {
          category,
          itemId: item.id,
          ...payload,
        },
        { delayMs: 800 },
      ),
    onSuccess: ({ item: updatedItem }) => {
      onSuccess?.(updatedItem);
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
    ? mutation.error instanceof DashboardItemNotFoundError
      ? mutation.error.message
      : mutation.error instanceof MockServerDownError
        ? "Server is unavailable. Please try again."
        : "Failed to save item changes. Please try again."
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
