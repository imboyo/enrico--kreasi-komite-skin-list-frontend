import { parseOrThrow } from "libs/util/parse-or-throw";

import { fetcher } from "backend-service/util/use-fetcher";

import type {
  CreateUserAccountPayload,
  CreateUserAccountResponse,
} from "./types";

// POST /admin/account/user — creates a new user account.
export async function createUserAccount(
  payload: CreateUserAccountPayload,
): Promise<CreateUserAccountResponse> {
  const res = await fetcher("/admin/account/user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseOrThrow<CreateUserAccountResponse>(res);
}
