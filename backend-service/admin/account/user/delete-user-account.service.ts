import { parseOrThrow } from "libs/util/parse-or-throw";

import { fetcher } from "backend-service/util/use-fetcher";

import type { DeleteUserAccountResponse } from "./types";

// DELETE /admin/account/user/:userId — soft-deletes a user account.
export async function deleteUserAccount(
  userId: string,
): Promise<DeleteUserAccountResponse> {
  const res = await fetcher(`/admin/account/user/${userId}`, {
    method: "DELETE",
  });
  return parseOrThrow<DeleteUserAccountResponse>(res);
}
