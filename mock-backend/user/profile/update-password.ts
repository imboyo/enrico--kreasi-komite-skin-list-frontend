import {
  simulateMockRequest,
  type MockControlInput,
} from "@/mock-backend/utils/mock-control";

export type UpdatePasswordPayload = {
  currentPassword: string;
  newPassword: string;
};

export type UpdatePasswordResponse = {
  success: boolean;
};

export class WrongCurrentPasswordError extends Error {
  constructor() {
    super("Current password is incorrect.");
    this.name = "WrongCurrentPasswordError";
  }
}

const MOCK_CURRENT_PASSWORD = "password123";

export async function updatePassword(
  payload: UpdatePasswordPayload,
  control: MockControlInput = {},
): Promise<UpdatePasswordResponse> {
  await simulateMockRequest(control);

  if (payload.currentPassword !== MOCK_CURRENT_PASSWORD) {
    throw new WrongCurrentPasswordError();
  }

  return { success: true };
}

export default updatePassword;
