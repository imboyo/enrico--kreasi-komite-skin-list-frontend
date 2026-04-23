import {
  simulateMockRequest,
  type MockControlInput,
} from "@/mock-backend/utils/mock-control";

export type AddSkinGoalPayload = {
  goal: string;
};

export type AddSkinGoalResponse = {
  goal: string;
};

const DEFAULT_ADD_DELAY_MS = 1200;

export async function addSkinGoal(
  payload: AddSkinGoalPayload,
  control: MockControlInput = {},
): Promise<AddSkinGoalResponse> {
  await simulateMockRequest({ delayMs: DEFAULT_ADD_DELAY_MS, ...control });
  return { goal: payload.goal };
}
