import { NEXT_PUBLIC_BACKEND_HOST } from "config";
import { parseOrThrow } from "libs/util/parse-or-throw";

import type {
  ForgotPasswordChainPayload,
  ForgotPasswordChainResponse,
} from "./types";

// POST /auth/forgot-password-chain — sends OTP to email or WhatsApp for password reset
export async function forgotPasswordChain(
  payload: ForgotPasswordChainPayload,
): Promise<ForgotPasswordChainResponse> {
  const res = await fetch(
    `${NEXT_PUBLIC_BACKEND_HOST}/auth/forgot-password-chain`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
  );
  return parseOrThrow<ForgotPasswordChainResponse>(res);
}
