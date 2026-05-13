import { parseOrThrow } from "libs/util/parse-or-throw";

import { fetcher } from "backend-service/util/use-fetcher";

import type {
  UpdateAdminUserSkinTreatPayload,
  UpdateAdminUserSkinTreatResponse,
} from "./types";

// PATCH /admin/user/skin-treat/:skinTreatId — admin update for a user's skin treat record.
export async function updateAdminUserSkinTreat(
  skinTreatId: string,
  payload: UpdateAdminUserSkinTreatPayload,
): Promise<UpdateAdminUserSkinTreatResponse> {
  const res = await fetcher(`/admin/user/skin-treat/${skinTreatId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseOrThrow<UpdateAdminUserSkinTreatResponse>(res);
}
