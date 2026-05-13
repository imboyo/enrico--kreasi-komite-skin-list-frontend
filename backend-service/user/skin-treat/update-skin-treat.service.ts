import { parseOrThrow } from "libs/util/parse-or-throw";

import { fetcher } from "backend-service/util/use-fetcher";

import type { UpdateSkinTreatPayload, UpdateSkinTreatResponse } from "./types";

// PATCH /user/skin-treat/:skinTreatId — updates skin treat fields for the authenticated user
export async function updateSkinTreat(
  skinTreatId: string,
  payload: UpdateSkinTreatPayload,
): Promise<UpdateSkinTreatResponse> {
  const res = await fetcher(`/user/skin-treat/${skinTreatId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseOrThrow<UpdateSkinTreatResponse>(res);
}
