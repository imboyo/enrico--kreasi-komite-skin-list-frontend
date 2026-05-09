"use client";

import {
  type FormAsyncValidateOrFn,
  type FormValidateOrFn,
  type ReactFormExtendedApi,
} from "@tanstack/react-form";
import { z } from "zod";

import { whatsappNumberSchema } from "libs/util/whatsapp-number";

export const loginSchema = z.object({
  whatsappNumber: whatsappNumberSchema,
  password: z
    .string()
    .min(1, "Kata sandi wajib diisi")
    .min(6, "Kata sandi minimal 6 karakter"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export type LoginFormApi = ReactFormExtendedApi<
  LoginFormValues,
  undefined | FormValidateOrFn<LoginFormValues>,
  undefined | FormValidateOrFn<LoginFormValues>,
  undefined | FormAsyncValidateOrFn<LoginFormValues>,
  undefined | FormValidateOrFn<LoginFormValues>,
  undefined | FormAsyncValidateOrFn<LoginFormValues>,
  undefined | FormValidateOrFn<LoginFormValues>,
  undefined | FormAsyncValidateOrFn<LoginFormValues>,
  undefined | FormValidateOrFn<LoginFormValues>,
  undefined | FormAsyncValidateOrFn<LoginFormValues>,
  undefined | FormAsyncValidateOrFn<LoginFormValues>,
  never
>;

export function validateLoginField<T>(
  schema: z.ZodType<T>,
  value: T,
): string | undefined {
  const result = schema.safeParse(value);
  return result.success ? undefined : result.error.issues[0]?.message;
}
