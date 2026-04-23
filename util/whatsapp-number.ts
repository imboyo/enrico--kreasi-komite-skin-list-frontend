import { z } from "zod";

const WHATSAPP_DIGITS_ONLY = /\D/g;
const INDONESIA_COUNTRY_CODE = "62";

export const WHATSAPP_MIN_LENGTH = 10;
// Max 13 local digits (0XXXXXXXXXXX) → normalizes to max 14 (628XXXXXXXXXXX) which fits /^628\d{7,11}$/.
export const WHATSAPP_MAX_LENGTH = 13;

export function sanitizeWhatsappNumberInput(value: string): string {
  return value.replace(WHATSAPP_DIGITS_ONLY, "").slice(0, WHATSAPP_MAX_LENGTH);
}

export function normalizeWhatsappNumber(value: string): string {
  const digitsOnlyValue = sanitizeWhatsappNumberInput(value);

  if (!digitsOnlyValue) {
    return "";
  }

  // Accept local mobile formats like 0812..., 812..., or international 62812...
  // so the UI and mock backend compare the same canonical value.
  if (digitsOnlyValue.startsWith("0")) {
    return `${INDONESIA_COUNTRY_CODE}${digitsOnlyValue.slice(1)}`;
  }

  if (digitsOnlyValue.startsWith("8")) {
    return `${INDONESIA_COUNTRY_CODE}${digitsOnlyValue}`;
  }

  return digitsOnlyValue;
}

export const whatsappNumberSchema = z
  .string()
  .trim()
  .min(1, "WhatsApp number is required")
  .regex(/^\d+$/, "WhatsApp number must contain numbers only")
  .min(
    WHATSAPP_MIN_LENGTH,
    `WhatsApp number must be ${WHATSAPP_MIN_LENGTH}-${WHATSAPP_MAX_LENGTH} digits`,
  )
  .max(
    WHATSAPP_MAX_LENGTH,
    `WhatsApp number must be ${WHATSAPP_MIN_LENGTH}-${WHATSAPP_MAX_LENGTH} digits`,
  )
  .refine(isValidWhatsappNumber, "Enter a valid WhatsApp number");

export function validateWhatsappField(value: string): string | undefined {
  const result = whatsappNumberSchema.safeParse(value);
  return result.success ? undefined : result.error.issues[0]?.message;
}

export function isValidWhatsappNumber(value: string): boolean {
  const trimmedValue = value.trim();
  const sanitizedValue = sanitizeWhatsappNumberInput(trimmedValue);

  if (
    !trimmedValue ||
    sanitizedValue !== trimmedValue ||
    sanitizedValue.length < WHATSAPP_MIN_LENGTH
  ) {
    return false;
  }

  const normalizedValue = normalizeWhatsappNumber(sanitizedValue);

  return /^628\d{7,11}$/.test(normalizedValue);
}
