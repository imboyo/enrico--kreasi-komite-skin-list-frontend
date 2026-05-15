import { parseOrThrow } from "libs/util/parse-or-throw";

import { fetcher } from "backend-service/util/use-fetcher";

import type {
  CreateAdminUserSkinTreatPayload,
  CreateAdminUserSkinTreatResponse,
} from "./types";

// POST /admin/user/skin-treat — creates a new skin treat record for a specific user.
export async function createUserSkinTreat(
  payload: CreateAdminUserSkinTreatPayload,
): Promise<CreateAdminUserSkinTreatResponse> {
  const res = await fetcher("/admin/user/skin-treat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseOrThrow<CreateAdminUserSkinTreatResponse>(res);
}
