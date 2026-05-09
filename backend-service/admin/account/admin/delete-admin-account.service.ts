import { parseOrThrow } from "libs/util/parse-or-throw";

import { fetcher } from "backend-service/util/use-fetcher";

import type { DeleteAdminAccountResponse } from "./types";

// DELETE /admin/account/admin/:adminId — soft-deletes an admin account.
export async function deleteAdminAccount(
  adminId: string,
): Promise<DeleteAdminAccountResponse> {
  const res = await fetcher(`/admin/account/admin/${adminId}`, {
    method: "DELETE",
  });
  return parseOrThrow<DeleteAdminAccountResponse>(res);
}
