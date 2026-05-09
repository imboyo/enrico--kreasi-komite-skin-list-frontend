import { parseOrThrow } from "libs/util/parse-or-throw";

import { fetcher } from "backend-service/util/use-fetcher";

import type { GetUserAccountResponse } from "./types";

// GET /admin/account/user/:userId — retrieves a single user account by ID, including the profile photo.
export async function getUserAccount(
  userId: string,
): Promise<GetUserAccountResponse> {
  const res = await fetcher(`/admin/account/user/${userId}`, {
    method: "GET",
  });
  return parseOrThrow<GetUserAccountResponse>(res);
}
