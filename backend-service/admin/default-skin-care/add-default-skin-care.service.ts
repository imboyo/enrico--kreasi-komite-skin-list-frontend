import { parseOrThrow } from "libs/util/parse-or-throw";

import { fetcher } from "backend-service/util/use-fetcher";

import type {
  AddAdminDefaultSkinCarePayload,
  AddAdminDefaultSkinCareResponse,
} from "./types";

// POST /admin/default-skin-care — creates a default skin care record.
export async function addDefaultSkinCare(
  payload: AddAdminDefaultSkinCarePayload,
): Promise<AddAdminDefaultSkinCareResponse> {
  const res = await fetcher("/admin/default-skin-care", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseOrThrow<AddAdminDefaultSkinCareResponse>(res);
}
