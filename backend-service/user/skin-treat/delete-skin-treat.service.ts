import { parseOrThrow } from "libs/util/parse-or-throw";

import { fetcher } from "backend-service/util/use-fetcher";

import type { DeleteSkinTreatResponse } from "./types";

// DELETE /user/skin-treat/:skinTreatId — deletes a skin treat record owned by the user
export async function deleteSkinTreat(
  skinTreatId: string,
): Promise<DeleteSkinTreatResponse> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const res = await fetcher(`/user/skin-treat/${skinTreatId}`, {
    method: "DELETE",
  });
  return parseOrThrow<DeleteSkinTreatResponse>(res);
}
