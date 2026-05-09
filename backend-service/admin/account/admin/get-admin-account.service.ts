import { parseOrThrow } from "libs/util/parse-or-throw";

import { fetcher } from "backend-service/util/use-fetcher";

import type { GetAdminAccountResponse } from "./types";

// GET /admin/account/admin/:adminId — retrieves a single admin account by ID, including the profile photo.
export async function getAdminAccount(
  adminId: string,
): Promise<GetAdminAccountResponse> {
  const res = await fetcher(`/admin/account/admin/${adminId}`, {
    method: "GET",
  });
  return parseOrThrow<GetAdminAccountResponse>(res);
}
