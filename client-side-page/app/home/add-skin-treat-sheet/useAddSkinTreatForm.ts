"use client";

import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

import {
  createSkinTreat,
  type SkinTreatCategory,
} from "@/backend-service/user/skin-treat";

export const addSkinTreatSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Nama wajib diisi")
    .max(60, "Nama maksimal 60 karakter"),
  description: z
    .string()
    .trim()
    .max(280, "Deskripsi maksimal 280 karakter"),
});

export type AddSkinTreatValues = z.infer<typeof addSkinTreatSchema>;

export function validateAddSkinTreatField<T>(
  schema: z.ZodType<T>,
  value: T,
): string | undefined {
  const result = schema.safeParse(value);
  return result.success ? undefined : result.error.issues[0]?.message;
}

type UseAddSkinTreatFormParams = {
  category: SkinTreatCategory;
  onSuccess?: () => void;
};

export function useAddSkinTreatForm({
  category,
  onSuccess,
}: UseAddSkinTreatFormParams) {
  const mutation = useMutation({
    mutationFn: (values: AddSkinTreatValues) =>
      createSkinTreat({
        name: values.name,
        // Send null for empty description so the backend stores it as nullable
        description: values.description.trim() || null,
        category,
      }),
  });

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
    onSubmit: async ({ value }) => {
      await mutation.mutateAsync(value);
      onSuccess?.();
    },
  });

  const serverError = mutation.error
    ? "Gagal menambahkan skin treat. Silakan coba lagi."
    : null;

  return {
    form,
    isPending: mutation.isPending,
    serverError,
  };
}
