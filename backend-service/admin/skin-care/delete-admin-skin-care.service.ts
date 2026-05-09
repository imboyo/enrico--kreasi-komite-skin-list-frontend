import { parseOrThrow } from "libs/util/parse-or-throw";

import { fetcher } from "backend-service/util/use-fetcher";

import type { DeleteAdminSkinCareResponse } from "./types";

// DELETE /admin/skin-care/:skinCareId — deletes a default skin care record.
export async function deleteAdminSkinCare(
  skinCareId: string,
): Promise<DeleteAdminSkinCareResponse> {
  const res = await fetcher(`/admin/skin-care/${skinCareId}`, {
    method: "DELETE",
  });
  return parseOrThrow<DeleteAdminSkinCareResponse>(res);
}
