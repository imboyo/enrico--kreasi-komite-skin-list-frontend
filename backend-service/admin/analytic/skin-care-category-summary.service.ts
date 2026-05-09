import { parseOrThrow } from "libs/util/parse-or-throw";

import { fetcher } from "backend-service/util/use-fetcher";

import type { GetSkinCareCategorySummaryResponse } from "./types";

// GET /admin/analytic/skin-care/category-summary — returns total default skin care records by category
// for the rolling windows last_30_days, last_7_days, and last_24_hours.
// Response is cached server-side for 30 minutes.
export async function getSkinCareCategorySummary(): Promise<GetSkinCareCategorySummaryResponse> {
  const res = await fetcher("/admin/analytic/skin-care/category-summary");
  return parseOrThrow<GetSkinCareCategorySummaryResponse>(res);
}
