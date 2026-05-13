import type { AdminDefaultSkinCare } from "backend-service/admin/default-skin-care";
import { HttpError } from "libs/error/http-error";
import { z } from "zod";

export type SkinCareFormValues = {
  name: string;
  description: string;
};

export const EMPTY_SKIN_CARE_FORM_VALUES: SkinCareFormValues = {
  name: "",
  description: "",
};

export const skinCareFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Nama wajib diisi")
    .max(60, "Nama maksimal 60 karakter"),
  description: z.string().trim().max(280, "Deskripsi maksimal 280 karakter"),
});

export function validateSkinCareField<T>(
  schema: z.ZodType<T>,
  value: T,
): string | undefined {
  const result = schema.safeParse(value);
  return result.success ? undefined : result.error.issues[0]?.message;
}

export function getSkinCareFormValues(
  item?: Pick<AdminDefaultSkinCare, "name" | "description">,
): SkinCareFormValues {
  if (!item) {
    return { ...EMPTY_SKIN_CARE_FORM_VALUES };
  }

  return {
    name: item.name,
    description: item.description ?? "",
  };
}

export function normalizeSkinCareDescription(description: string) {
  // Keep empty descriptions nullable because the API treats description as optional.
  return description.trim() || null;
}

export function getSkinCareFormServerErrorMessage(error: unknown) {
  if (!error) return null;

  if (error instanceof HttpError) {
    return error.status >= 500
      ? "Server sedang tidak tersedia. Silakan coba lagi."
      : error.message;
  }

  return "Terjadi kesalahan. Silakan coba lagi.";
}
