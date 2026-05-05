import {
  simulateMockRequest,
  type MockControlInput,
} from "@/mock-backend/utils/mock-control";
import { normalizeWhatsappNumber } from "libs/util/whatsapp-number";

export type LoginPayload = {
  whatsappNumber: string;
  password: string;
};

export type LoginUser = {
  id: string;
  whatsappNumber: string;
  name: string;
};

export type LoginResponse = {
  user: LoginUser;
  token: string;
};

export type LoginControlInput = MockControlInput & {
  /** Force an invalid-credentials error regardless of the submitted payload. */
  forceInvalidCredentials?: boolean;
};

export class InvalidCredentialsError extends Error {
  constructor() {
    super("Invalid WhatsApp number or password.");
    this.name = "InvalidCredentialsError";
  }
}

// Hardcoded demo account for mock purposes.
const MOCK_USER: LoginUser = {
  id: "user-001",
  whatsappNumber: "+62 812-3456-7890",
  name: "Skin Committee Member",
};

const MOCK_PASSWORD = "password123";

export async function login(
  payload: LoginPayload,
  control: LoginControlInput = {},
): Promise<LoginResponse> {
  await simulateMockRequest(control);

  // Simulate invalid-credentials branch
  if (
    control.forceInvalidCredentials ||
    normalizeWhatsappNumber(payload.whatsappNumber) !==
      normalizeWhatsappNumber(MOCK_USER.whatsappNumber) ||
    payload.password !== MOCK_PASSWORD
  ) {
    throw new InvalidCredentialsError();
  }

  return {
    user: { ...MOCK_USER },
    // Fake JWT-shaped token so the caller can inspect it if needed.
    token: "mock-token.eyJ1c2VyX2lkIjoidXNlci0wMDEifQ.signature",
  };
}

export default login;
