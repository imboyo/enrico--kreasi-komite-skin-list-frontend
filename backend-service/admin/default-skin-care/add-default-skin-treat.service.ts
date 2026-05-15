import { parseOrThrow } from "libs/util/parse-or-throw";

import { fetcher } from "backend-service/util/use-fetcher";

import type {
  AddAdminDefaultSkinTreatPayload,
  AddAdminDefaultSkinTreatResponse,
} from "./types";

// POST /admin/default-skin-treat — creates a default skin treat record.
export async function addAdminDefaultSkinTreat(
  payload: AddAdminDefaultSkinTreatPayload,
): Promise<AddAdminDefaultSkinTreatResponse> {
  const res = await fetcher("/admin/default-skin-treat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return parseOrThrow<AddAdminDefaultSkinTreatResponse>(res);
}
