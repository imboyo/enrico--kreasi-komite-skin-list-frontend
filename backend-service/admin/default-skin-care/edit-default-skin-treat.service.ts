import { parseOrThrow } from "libs/util/parse-or-throw";

import { fetcher } from "backend-service/util/use-fetcher";

import type {
  EditAdminDefaultSkinTreatPayload,
  EditAdminDefaultSkinTreatResponse,
} from "./types";

// PATCH /admin/default-skin-treat/:skinTreatId — updates a default skin treat record.
export async function editAdminDefaultSkinTreat(
  skinTreatId: string,
  payload: EditAdminDefaultSkinTreatPayload,
): Promise<EditAdminDefaultSkinTreatResponse> {
  const res = await fetcher(`/admin/default-skin-treat/${skinTreatId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return parseOrThrow<EditAdminDefaultSkinTreatResponse>(res);
}
