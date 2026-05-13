import { parseOrThrow } from "libs/util/parse-or-throw";

import { fetcher } from "backend-service/util/use-fetcher";

import type { GetAdminUserSkinTreatResponse } from "./types";

// GET /admin/user/skin-treat/:skinTreatId — retrieves one user skin treat with owner account data.
export async function getAdminUserSkinTreat(
  skinTreatId: string,
): Promise<GetAdminUserSkinTreatResponse> {
  const res = await fetcher(`/admin/user/skin-treat/${skinTreatId}`, {
    method: "GET",
  });
  return parseOrThrow<GetAdminUserSkinTreatResponse>(res);
}
