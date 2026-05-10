import { parseOrThrow } from "libs/util/parse-or-throw";

import { fetcher } from "backend-service/util/use-fetcher";

import type {
  ListAdminDefaultSkinCarePayload,
  ListAdminDefaultSkinCareResponse,
} from "./types";

// POST /admin/default-skin-care/list — paginated list of default skin care records.
export async function listDefaultSkinCare(
  payload: ListAdminDefaultSkinCarePayload = {},
): Promise<ListAdminDefaultSkinCareResponse> {
  const res = await fetcher("/admin/default-skin-care/list", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseOrThrow<ListAdminDefaultSkinCareResponse>(res);
}
