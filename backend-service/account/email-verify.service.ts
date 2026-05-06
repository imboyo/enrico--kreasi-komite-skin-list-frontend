import { parseOrThrow } from "libs/util/parse-or-throw";

import { fetcher } from "backend-service/util/use-fetcher";

import type {
  VerifyEmailChangePayload,
  VerifyEmailChangeResponse,
} from "./types";

// POST /account/email-verify — Step 2: confirms OTP to complete email change
export async function verifyEmailChange(
  payload: VerifyEmailChangePayload,
): Promise<VerifyEmailChangeResponse> {
  const res = await fetcher("/account/email-verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseOrThrow<VerifyEmailChangeResponse>(res);
}
