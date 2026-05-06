import { NEXT_PUBLIC_BACKEND_HOST } from "config";
import { parseOrThrow } from "libs/util/parse-or-throw";

import type {
  ForgotPasswordResetPayload,
  ForgotPasswordResetResponse,
} from "./types";

// POST /auth/forgot-password-reset — sets new password using the reset_token
export async function forgotPasswordReset(
  payload: ForgotPasswordResetPayload,
): Promise<ForgotPasswordResetResponse> {
  const res = await fetch(
    `${NEXT_PUBLIC_BACKEND_HOST}/auth/forgot-password-reset`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
  );
  return parseOrThrow<ForgotPasswordResetResponse>(res);
}
