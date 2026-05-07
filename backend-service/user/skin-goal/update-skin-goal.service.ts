import { parseOrThrow } from "libs/util/parse-or-throw";

import { fetcher } from "backend-service/util/use-fetcher";

import type { UpdateSkinGoalPayload, UpdateSkinGoalResponse } from "./types";

// PATCH /user/skin-goal/:skinGoalId — updates an existing skin goal
export async function updateSkinGoal(
  skinGoalId: string,
  payload: UpdateSkinGoalPayload,
): Promise<UpdateSkinGoalResponse> {
  const res = await fetcher(`/user/skin-goal/${skinGoalId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseOrThrow<UpdateSkinGoalResponse>(res);
}
