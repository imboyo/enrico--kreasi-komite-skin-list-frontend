import { parseOrThrow } from "libs/util/parse-or-throw";

import { fetcher } from "backend-service/util/use-fetcher";

import type {
  EditAdminSkinCarePayload,
  EditAdminSkinCareResponse,
} from "./types";

// PATCH /admin/skin-care/:skinCareId — updates a default skin care record.
export async function editAdminSkinCare(
  skinCareId: string,
  payload: EditAdminSkinCarePayload,
): Promise<EditAdminSkinCareResponse> {
  const res = await fetcher(`/admin/skin-care/${skinCareId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseOrThrow<EditAdminSkinCareResponse>(res);
}
