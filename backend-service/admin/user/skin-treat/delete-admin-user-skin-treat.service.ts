import { parseOrThrow } from "libs/util/parse-or-throw";

import { fetcher } from "backend-service/util/use-fetcher";

import type { DeleteAdminUserSkinTreatResponse } from "./types";

// DELETE /admin/user/skin-treat/:skinTreatId — deletes a user's skin treat record as admin.
export async function deleteAdminUserSkinTreat(
  skinTreatId: string,
): Promise<DeleteAdminUserSkinTreatResponse> {
  const res = await fetcher(`/admin/user/skin-treat/${skinTreatId}`, {
    method: "DELETE",
  });
  return parseOrThrow<DeleteAdminUserSkinTreatResponse>(res);
}
