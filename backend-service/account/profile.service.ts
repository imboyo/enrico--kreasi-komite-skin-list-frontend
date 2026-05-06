import { parseOrThrow } from "libs/util/parse-or-throw";

import { fetcher } from "backend-service/util/use-fetcher";

import type { GetProfileResponse } from "./types";

// GET /account/profile
export async function getProfile(): Promise<GetProfileResponse> {
  const res = await fetcher("/account/profile");
  return parseOrThrow<GetProfileResponse>(res);
}
