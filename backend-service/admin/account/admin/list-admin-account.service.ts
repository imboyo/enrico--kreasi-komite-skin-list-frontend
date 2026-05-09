import { parseOrThrow } from "libs/util/parse-or-throw";

import { fetcher } from "backend-service/util/use-fetcher";

import type { ListAdminAccountPayload, ListAdminAccountResponse } from "./types";

// POST /admin/account/admin/list — paginated list of admin accounts for admin management.
export async function listAdminAccount(
  payload: ListAdminAccountPayload = {},
): Promise<ListAdminAccountResponse> {
  const res = await fetcher("/admin/account/admin/list", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseOrThrow<ListAdminAccountResponse>(res);
}
