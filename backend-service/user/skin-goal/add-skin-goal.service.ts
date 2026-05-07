import { parseOrThrow } from "libs/util/parse-or-throw";

import { fetcher } from "backend-service/util/use-fetcher";

import type { AddSkinGoalPayload, AddSkinGoalResponse } from "./types";

// POST /user/skin-goal — creates a new skin goal for the authenticated user
export async function addSkinGoal(
  payload: AddSkinGoalPayload,
): Promise<AddSkinGoalResponse> {
  const res = await fetcher("/user/skin-goal", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseOrThrow<AddSkinGoalResponse>(res);
}
