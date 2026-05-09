import { parseOrThrow } from "libs/util/parse-or-throw";

import { fetcher } from "backend-service/util/use-fetcher";

import type {
  UpdateAdminAccountPayload,
  UpdateAdminAccountResponse,
} from "./types";

// PATCH /admin/account/admin/:adminId — updates admin profile and status fields.
export async function updateAdminAccount(
  adminId: string,
  payload: UpdateAdminAccountPayload,
): Promise<UpdateAdminAccountResponse> {
  const res = await fetcher(`/admin/account/admin/${adminId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseOrThrow<UpdateAdminAccountResponse>(res);
}
