import { parseOrThrow } from "libs/util/parse-or-throw";

import { fetcher } from "backend-service/util/use-fetcher";

import type {
  CreateAdminAccountPayload,
  CreateAdminAccountResponse,
} from "./types";

// POST /admin/account/admin — creates a new admin account.
export async function createAdminAccount(
  payload: CreateAdminAccountPayload,
): Promise<CreateAdminAccountResponse> {
  const res = await fetcher("/admin/account/admin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseOrThrow<CreateAdminAccountResponse>(res);
}
