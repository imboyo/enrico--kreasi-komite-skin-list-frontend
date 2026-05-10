import { parseOrThrow } from "libs/util/parse-or-throw";

import { fetcher } from "backend-service/util/use-fetcher";

import type { DeleteAdminDefaultSkinCareResponse } from "./types";

// DELETE /admin/default-skin-care/:skinCareId — deletes a default skin care record.
export async function deleteDefaultSkinCare(
  skinCareId: string,
): Promise<DeleteAdminDefaultSkinCareResponse> {
  const res = await fetcher(`/admin/default-skin-care/${skinCareId}`, {
    method: "DELETE",
  });
  return parseOrThrow<DeleteAdminDefaultSkinCareResponse>(res);
}
