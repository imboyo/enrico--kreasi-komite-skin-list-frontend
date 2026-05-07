import { parseOrThrow } from "libs/util/parse-or-throw";

import { fetcher } from "backend-service/util/use-fetcher";

import type { DeleteSkinGoalResponse } from "./types";

// DELETE /user/skin-goal/:skinGoalId — deletes a skin goal owned by the user
export async function deleteSkinGoal(
  skinGoalId: string,
): Promise<DeleteSkinGoalResponse> {
  const res = await fetcher(`/user/skin-goal/${skinGoalId}`, {
    method: "DELETE",
  });
  return parseOrThrow<DeleteSkinGoalResponse>(res);
}
