import {
  simulateMockRequest,
  type MockControlInput,
} from "@/mock-backend/utils/mock-control";

export type DeleteSkinGoalPayload = {
  goal: string;
};

export type DeleteSkinGoalResponse = {
  goal: string;
};

const DEFAULT_DELETE_DELAY_MS = 1200;

export async function deleteSkinGoal(
  payload: DeleteSkinGoalPayload,
  control: MockControlInput = {},
): Promise<DeleteSkinGoalResponse> {
  await simulateMockRequest({ delayMs: DEFAULT_DELETE_DELAY_MS, ...control });
  return { goal: payload.goal };
}
