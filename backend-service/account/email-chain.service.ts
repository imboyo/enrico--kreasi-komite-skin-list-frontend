import { parseOrThrow } from "libs/util/parse-or-throw";

import { fetcher } from "backend-service/util/use-fetcher";
import type {
  InitiateEmailChangePayload,
  InitiateEmailChangeResponse,
} from "./types";

// POST /account/email-chain — Step 1: sends OTP to user's WhatsApp number
export async function initiateEmailChange(
  payload: InitiateEmailChangePayload,
): Promise<InitiateEmailChangeResponse> {
  const res = await fetcher("/account/email-chain", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseOrThrow<InitiateEmailChangeResponse>(res);
}
