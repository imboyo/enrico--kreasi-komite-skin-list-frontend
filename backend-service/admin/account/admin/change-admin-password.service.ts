import { parseOrThrow } from "libs/util/parse-or-throw";
import { fetcher } from "backend-service/util/use-fetcher";

import type {
  ChangeAdminPasswordPayload,
  ChangeAdminPasswordResponse,
} from "./types";

// PATCH /admin/account/admin/:adminId/password — changes an admin password and rotates auth timestamps.
export async function changeAdminPassword(
  adminId: string,
  payload: ChangeAdminPasswordPayload,
): Promise<ChangeAdminPasswordResponse> {
  const res = await fetcher(`/admin/account/admin/${adminId}/password`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseOrThrow<ChangeAdminPasswordResponse>(res);
}
