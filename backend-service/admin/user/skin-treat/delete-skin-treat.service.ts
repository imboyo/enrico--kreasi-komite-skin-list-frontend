import { parseOrThrow } from "libs/util/parse-or-throw";

import { fetcher } from "backend-service/util/use-fetcher";

import type { DeleteSkinTreatResponse } from "./types";

// DELETE /admin/user/skin-treat/:skinTreatId — deletes a user's skin treat record as admin.
export async function deleteSkinTreat(
  skinTreatId: string,
): Promise<DeleteSkinTreatResponse> {
  const res = await fetcher(`/admin/user/skin-treat/${skinTreatId}`, {
    method: "DELETE",
  });
  return parseOrThrow<DeleteSkinTreatResponse>(res);
}
