import { NEXT_PUBLIC_BACKEND_HOST } from "config";
import { parseOrThrow } from "libs/util/parse-or-throw";

import type {
  ForgotPasswordVerifyPayload,
  ForgotPasswordVerifyResponse,
} from "./types";

// POST /auth/forgot-password-verify — verifies OTP and returns a short-lived reset_token
export async function forgotPasswordVerify(
  payload: ForgotPasswordVerifyPayload,
): Promise<ForgotPasswordVerifyResponse> {
  const res = await fetch(
    `${NEXT_PUBLIC_BACKEND_HOST}/auth/forgot-password-verify`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
  );
  return parseOrThrow<ForgotPasswordVerifyResponse>(res);
}
