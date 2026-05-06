import { parseOrThrow } from "libs/util/parse-or-throw";

import { fetcher } from "backend-service/util/use-fetcher";

import type { GetProfileResponse } from "./types";

// GET /account/profile
// Accepts an optional access token to use instead of whatever is in the auth
// store — necessary when calling immediately after login-verify, before setAuth.
export async function getProfile(accessToken?: string): Promise<GetProfileResponse> {
  const init: RequestInit = accessToken
    ? { headers: { Authorization: `Bearer ${accessToken}` } }
    : {};
  const res = await fetcher("/account/profile", init);
  return parseOrThrow<GetProfileResponse>(res);
}
