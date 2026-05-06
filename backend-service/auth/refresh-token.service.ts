import { NEXT_PUBLIC_BACKEND_HOST } from "config";
import { parseOrThrow } from "libs/util/parse-or-throw";

import type { RefreshTokenPayload, RefreshTokenResponse } from "./types";

// POST /auth/refresh-token — exchanges refresh token for new access + refresh tokens
export async function refreshToken(
  payload: RefreshTokenPayload,
): Promise<RefreshTokenResponse> {
  const res = await fetch(`${NEXT_PUBLIC_BACKEND_HOST}/auth/refresh-token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseOrThrow<RefreshTokenResponse>(res);
}
