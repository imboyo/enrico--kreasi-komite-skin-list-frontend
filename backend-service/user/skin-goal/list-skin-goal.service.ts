import { parseOrThrow } from "libs/util/parse-or-throw";

import { fetcher } from "backend-service/util/use-fetcher";

import type { ListSkinGoalPayload, ListSkinGoalResponse } from "./types";

// POST /user/skin-goal/list — paginated list of the user's skin goals
export async function listSkinGoal(
  payload: ListSkinGoalPayload = {},
): Promise<ListSkinGoalResponse> {
  const res = await fetcher("/user/skin-goal/list", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseOrThrow<ListSkinGoalResponse>(res);
}
