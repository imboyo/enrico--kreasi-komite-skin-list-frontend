import { parseOrThrow } from "libs/util/parse-or-throw";

import { fetcher } from "backend-service/util/use-fetcher";

import type { DeleteAdminDefaultSkinTreatResponse } from "./types";

// DELETE /admin/default-skin-treat/:skinTreatId — deletes a default skin treat record.
export async function deleteAdminDefaultSkinTreat(
  skinTreatId: string,
): Promise<DeleteAdminDefaultSkinTreatResponse> {
  const res = await fetcher(`/admin/default-skin-treat/${skinTreatId}`, {
    method: "DELETE",
  });

  return parseOrThrow<DeleteAdminDefaultSkinTreatResponse>(res);
}
