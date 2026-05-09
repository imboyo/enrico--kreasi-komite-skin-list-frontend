import { parseOrThrow } from "libs/util/parse-or-throw";

import { fetcher } from "backend-service/util/use-fetcher";

import type {
  ChangeUserPasswordPayload,
  ChangeUserPasswordResponse,
} from "./types";

// PATCH /admin/account/user/:userId/password — changes a user password and rotates auth timestamps.
export async function changeUserPassword(
  userId: string,
  payload: ChangeUserPasswordPayload,
): Promise<ChangeUserPasswordResponse> {
  const res = await fetcher(`/admin/account/user/${userId}/password`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseOrThrow<ChangeUserPasswordResponse>(res);
}
