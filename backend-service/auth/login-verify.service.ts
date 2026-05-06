import { NEXT_PUBLIC_BACKEND_HOST } from "config";
import { parseOrThrow } from "libs/util/parse-or-throw";

import type { LoginVerifyPayload, LoginVerifyResponse } from "./types";

// POST /auth/login-verify — verifies OTP and returns access + refresh tokens
export async function loginVerify(
  payload: LoginVerifyPayload,
): Promise<LoginVerifyResponse> {
  const res = await fetch(`${NEXT_PUBLIC_BACKEND_HOST}/auth/login-verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseOrThrow<LoginVerifyResponse>(res);
}
