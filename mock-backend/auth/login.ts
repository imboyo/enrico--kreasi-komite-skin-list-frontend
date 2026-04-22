import {
  simulateMockRequest,
  type MockControlInput,
} from "@/mock-backend/utils/mock-control";

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginUser = {
  id: string;
  email: string;
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
    super("Invalid email or password.");
    this.name = "InvalidCredentialsError";
  }
}

// Hardcoded demo account for mock purposes.
const MOCK_USER: LoginUser = {
  id: "user-001",
  email: "member@skincommittee.id",
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
    payload.email !== MOCK_USER.email ||
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
