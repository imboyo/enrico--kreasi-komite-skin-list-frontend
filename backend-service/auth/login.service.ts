import { NEXT_PUBLIC_BACKEND_HOST } from "config";
import { parseOrThrow } from "libs/util/parse-or-throw";

import type { LoginPayload, LoginResponse } from "./types";

// POST /auth/login — direct login with email or phone and password, returns tokens directly
export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const res = await fetch(`${NEXT_PUBLIC_BACKEND_HOST}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseOrThrow<LoginResponse>(res);
}
