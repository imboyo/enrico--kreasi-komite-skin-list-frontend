import { parseOrThrow } from "libs/util/parse-or-throw";

import { fetcher } from "backend-service/util/use-fetcher";

import type { ListUserAccountPayload, ListUserAccountResponse } from "./types";

// POST /admin/account/user/list — paginated list of user accounts for admin management.
export async function listUserAccount(
  payload: ListUserAccountPayload = {},
): Promise<ListUserAccountResponse> {
  const res = await fetcher("/admin/account/user/list", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseOrThrow<ListUserAccountResponse>(res);
}
