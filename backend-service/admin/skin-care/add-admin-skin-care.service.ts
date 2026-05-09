import { parseOrThrow } from "libs/util/parse-or-throw";

import { fetcher } from "backend-service/util/use-fetcher";

import type {
  AddAdminSkinCarePayload,
  AddAdminSkinCareResponse,
} from "./types";

// POST /admin/skin-care — creates a default skin care record.
export async function addAdminSkinCare(
  payload: AddAdminSkinCarePayload,
): Promise<AddAdminSkinCareResponse> {
  const res = await fetcher("/admin/skin-care", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseOrThrow<AddAdminSkinCareResponse>(res);
}
