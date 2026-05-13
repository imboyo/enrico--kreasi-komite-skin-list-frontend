import { parseOrThrow } from "libs/util/parse-or-throw";

import { fetcher } from "backend-service/util/use-fetcher";

import type {
  ListAdminUserSkinTreatPayload,
  ListAdminUserSkinTreatResponse,
} from "./types";

// POST /admin/user/skin-treat/list — paginated skin treat records across users for admin review.
export async function listAdminUserSkinTreat(
  payload: ListAdminUserSkinTreatPayload = {},
): Promise<ListAdminUserSkinTreatResponse> {
  const res = await fetcher("/admin/user/skin-treat/list", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseOrThrow<ListAdminUserSkinTreatResponse>(res);
}
