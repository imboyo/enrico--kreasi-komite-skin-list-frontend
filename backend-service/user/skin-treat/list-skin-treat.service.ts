import { parseOrThrow } from "libs/util/parse-or-throw";

import { fetcher } from "backend-service/util/use-fetcher";

import type { ListSkinTreatPayload, ListSkinTreatResponse } from "./types";

// POST /user/skin-treat/list — paginated list of the user's skin treat records
export async function listSkinTreat(
  payload: ListSkinTreatPayload = {},
): Promise<ListSkinTreatResponse> {
  const res = await fetcher("/user/skin-treat/list", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseOrThrow<ListSkinTreatResponse>(res);
}
