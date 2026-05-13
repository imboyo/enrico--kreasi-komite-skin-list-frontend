import type { AdminUserSkinTreat } from "backend-service/admin/user/skin-treat";
import { HttpError } from "libs/error/http-error";
import { z } from "zod";

export type SkinTreatFormValues = {
  name: string;
  description: string;
};

export const EMPTY_SKIN_TREAT_FORM_VALUES: SkinTreatFormValues = {
  name: "",
  description: "",
};

export const skinTreatFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Nama wajib diisi")
    .max(60, "Nama maksimal 60 karakter"),
  description: z.string().trim().max(280, "Deskripsi maksimal 280 karakter"),
});

export function validateSkinTreatField<T>(
  schema: z.ZodType<T>,
  value: T,
): string | undefined {
  const result = schema.safeParse(value);
  return result.success ? undefined : result.error.issues[0]?.message;
}

export function getSkinTreatFormValues(
  item?: Pick<AdminUserSkinTreat, "name" | "description">,
): SkinTreatFormValues {
  if (!item) {
    return { ...EMPTY_SKIN_TREAT_FORM_VALUES };
  }

  return {
    name: item.name,
    description: item.description ?? "",
  };
}

export function normalizeSkinTreatDescription(description: string) {
  // Keep empty descriptions nullable because the API treats description as optional.
  return description.trim() || null;
}

export function getSkinTreatFormServerErrorMessage(error: unknown) {
  if (!error) return null;

  if (error instanceof HttpError) {
    return error.status >= 500
      ? "Server sedang tidak tersedia. Silakan coba lagi."
      : error.message;
  }

  return "Terjadi kesalahan. Silakan coba lagi.";
}
