import { parseOrThrow } from "libs/util/parse-or-throw";

import { fetcher } from "backend-service/util/use-fetcher";

import type {
  AddSkinGoalPayload,
  AddSkinGoalResponse,
  SkinGoal,
} from "./types";

type AddSkinGoalApiResponse = AddSkinGoalResponse & {
  user?: unknown;
};

// POST /user/skin-goal — creates a new skin goal for the authenticated user
export async function addSkinGoal(
  payload: AddSkinGoalPayload,
): Promise<AddSkinGoalResponse> {
  const res = await fetcher("/user/skin-goal", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return await parseOrThrow<AddSkinGoalApiResponse>(res);
}
