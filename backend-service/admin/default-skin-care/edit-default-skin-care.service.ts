import { parseOrThrow } from "libs/util/parse-or-throw";

import { fetcher } from "backend-service/util/use-fetcher";

import type {
  EditAdminDefaultSkinCarePayload,
  EditAdminDefaultSkinCareResponse,
} from "./types";

// PATCH /admin/default-skin-care/:skinCareId — updates a default skin care record.
export async function editDefaultSkinCare(
  skinCareId: string,
  payload: EditAdminDefaultSkinCarePayload,
): Promise<EditAdminDefaultSkinCareResponse> {
  const res = await fetcher(`/admin/default-skin-care/${skinCareId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseOrThrow<EditAdminDefaultSkinCareResponse>(res);
}
