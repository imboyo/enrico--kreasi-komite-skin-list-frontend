import { parseOrThrow } from "libs/util/parse-or-throw";

import { fetcher } from "backend-service/util/use-fetcher";

import type { CreateSkinTreatPayload, CreateSkinTreatResponse } from "./types";

// POST /user/skin-treat — creates a new skin treat record for the authenticated user
export async function createSkinTreat(
  payload: CreateSkinTreatPayload,
): Promise<CreateSkinTreatResponse> {
  const res = await fetcher("/user/skin-treat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseOrThrow<CreateSkinTreatResponse>(res);
}
