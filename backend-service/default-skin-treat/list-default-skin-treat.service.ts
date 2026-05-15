import { parseOrThrow } from "libs/util/parse-or-throw";

import { fetcher } from "backend-service/util/use-fetcher";

import type {
  ListDefaultSkinTreatPayload,
  ListDefaultSkinTreatResponse,
} from "./types";

// POST /default-skin-treat/list — paginated list of public default skin treat records.
export async function listDefaultSkinTreat(
  payload: ListDefaultSkinTreatPayload = {},
): Promise<ListDefaultSkinTreatResponse> {
  const res = await fetcher("/default-skin-treat/list", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseOrThrow<ListDefaultSkinTreatResponse>(res);
}
