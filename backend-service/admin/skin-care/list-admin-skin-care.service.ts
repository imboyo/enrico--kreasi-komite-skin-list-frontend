import { parseOrThrow } from "libs/util/parse-or-throw";

import { fetcher } from "backend-service/util/use-fetcher";

import type {
  ListAdminSkinCarePayload,
  ListAdminSkinCareResponse,
} from "./types";

// POST /admin/skin-care/list — paginated list of default skin care records.
export async function listAdminSkinCare(
  payload: ListAdminSkinCarePayload = {},
): Promise<ListAdminSkinCareResponse> {
  const res = await fetcher("/admin/skin-care/list", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseOrThrow<ListAdminSkinCareResponse>(res);
}
