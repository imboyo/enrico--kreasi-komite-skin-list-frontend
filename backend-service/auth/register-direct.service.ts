import { NEXT_PUBLIC_BACKEND_HOST } from "config";
import { parseOrThrow } from "libs/util/parse-or-throw";

import type { RegisterDirectPayload, RegisterDirectResponse } from "./types";

// POST /auth/register-direct — registers a new user directly without OTP and returns tokens
export async function registerDirect(
  payload: RegisterDirectPayload,
): Promise<RegisterDirectResponse> {
  const res = await fetch(`${NEXT_PUBLIC_BACKEND_HOST}/auth/register-direct`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseOrThrow<RegisterDirectResponse>(res);
}
