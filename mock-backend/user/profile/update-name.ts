import {
  simulateMockRequest,
  type MockControlInput,
} from "@/mock-backend/utils/mock-control";

export type UpdateNamePayload = {
  name: string;
};

export type UpdateNameResponse = {
  name: string;
};

export async function updateName(
  payload: UpdateNamePayload,
  control: MockControlInput = {},
): Promise<UpdateNameResponse> {
  await simulateMockRequest(control);
  return { name: payload.name };
}

export default updateName;
