import { parseOrThrow } from "libs/util/parse-or-throw";

import { fetcher } from "backend-service/util/use-fetcher";
import type {
  InitiatePhoneNumberChangePayload,
  InitiatePhoneNumberChangeResponse,
} from "./types";

// POST /account/phone-number-chain — Step 1: sends OTP to new phone number via WhatsApp
export async function initiatePhoneNumberChange(
  payload: InitiatePhoneNumberChangePayload,
): Promise<InitiatePhoneNumberChangeResponse> {
  const res = await fetcher("/account/phone-number-chain", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseOrThrow<InitiatePhoneNumberChangeResponse>(res);
}
