import { NEXT_PUBLIC_BACKEND_HOST } from "config";
import { parseOrThrow } from "libs/util/parse-or-throw";

import type { RegisterVerifyPayload, RegisterVerifyResponse } from "./types";

// POST /auth/register-verify — verifies OTP to activate the newly registered account
export async function registerVerify(
  payload: RegisterVerifyPayload,
): Promise<RegisterVerifyResponse> {
  const res = await fetch(`${NEXT_PUBLIC_BACKEND_HOST}/auth/register-verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseOrThrow<RegisterVerifyResponse>(res);
}
