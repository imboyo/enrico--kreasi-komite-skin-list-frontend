import { NEXT_PUBLIC_BACKEND_HOST } from "config";
import { parseOrThrow } from "libs/util/parse-or-throw";

import type { LoginChainPayload, LoginChainResponse } from "./types";

// POST /auth/login-chain — validates credentials and sends OTP
export async function loginChain(
  payload: LoginChainPayload,
): Promise<LoginChainResponse> {
  const res = await fetch(`${NEXT_PUBLIC_BACKEND_HOST}/auth/login-chain`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseOrThrow<LoginChainResponse>(res);
}
