import { parseOrThrow } from "libs/util/parse-or-throw";

import { fetcher } from "backend-service/util/use-fetcher";

import type {
  VerifyPhoneNumberChangePayload,
  VerifyPhoneNumberChangeResponse,
} from "./types";

// POST /account/phone-number-verify — Step 2: confirms OTP to complete phone number change
export async function verifyPhoneNumberChange(
  payload: VerifyPhoneNumberChangePayload,
): Promise<VerifyPhoneNumberChangeResponse> {
  const res = await fetcher("/account/phone-number-verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseOrThrow<VerifyPhoneNumberChangeResponse>(res);
}
