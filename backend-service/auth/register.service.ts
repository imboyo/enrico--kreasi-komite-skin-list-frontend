import { NEXT_PUBLIC_BACKEND_HOST } from "config";
import { parseOrThrow } from "libs/util/parse-or-throw";

import type { RegisterPayload, RegisterResponse } from "./types";

// POST /auth/register — registers a new user and sends OTP to phone for verification
export async function register(
  payload: RegisterPayload,
): Promise<RegisterResponse> {
  const res = await fetch(`${NEXT_PUBLIC_BACKEND_HOST}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseOrThrow<RegisterResponse>(res);
}
