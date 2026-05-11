"use client";

import {
  type FormAsyncValidateOrFn,
  type FormValidateOrFn,
  type ReactFormExtendedApi,
} from "@tanstack/react-form";
import { z } from "zod";

import { whatsappNumberSchema } from "libs/util/whatsapp-number";

export const addSuperAdminSchema = z.object({
  fullName: z.string().trim().min(1, "Nama lengkap wajib diisi"),
  phoneNumber: whatsappNumberSchema,
  password: z
    .string()
    .min(1, "Kata sandi wajib diisi")
    .min(6, "Kata sandi minimal 6 karakter"),
  secretKey: z.string().min(1, "Kunci rahasia wajib diisi"),
});

export type AddSuperAdminFormValues = z.infer<typeof addSuperAdminSchema>;

export type AddSuperAdminFormApi = ReactFormExtendedApi<
  AddSuperAdminFormValues,
  undefined | FormValidateOrFn<AddSuperAdminFormValues>,
  undefined | FormValidateOrFn<AddSuperAdminFormValues>,
  undefined | FormAsyncValidateOrFn<AddSuperAdminFormValues>,
  undefined | FormValidateOrFn<AddSuperAdminFormValues>,
  undefined | FormAsyncValidateOrFn<AddSuperAdminFormValues>,
  undefined | FormValidateOrFn<AddSuperAdminFormValues>,
  undefined | FormAsyncValidateOrFn<AddSuperAdminFormValues>,
  undefined | FormValidateOrFn<AddSuperAdminFormValues>,
  undefined | FormAsyncValidateOrFn<AddSuperAdminFormValues>,
  undefined | FormAsyncValidateOrFn<AddSuperAdminFormValues>,
  never
>;

export function validateAddSuperAdminField<T>(
  schema: z.ZodType<T>,
  value: T,
): string | undefined {
  const result = schema.safeParse(value);
  return result.success ? undefined : result.error.issues[0]?.message;
}
