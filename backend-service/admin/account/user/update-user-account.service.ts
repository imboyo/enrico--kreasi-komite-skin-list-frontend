import { parseOrThrow } from "libs/util/parse-or-throw";

import { fetcher } from "backend-service/util/use-fetcher";

import type {
  UpdateUserAccountPayload,
  UpdateUserAccountResponse,
} from "./types";

// PATCH /admin/account/user/:userId — updates user profile and status fields.
export async function updateUserAccount(
  userId: string,
  payload: UpdateUserAccountPayload,
): Promise<UpdateUserAccountResponse> {
  const res = await fetcher(`/admin/account/user/${userId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseOrThrow<UpdateUserAccountResponse>(res);
}
