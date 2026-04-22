import {
  simulateMockRequest,
  type MockControlInput,
} from "@/mock-backend/utils/mock-control";

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

export type RegisterResponse = {
  user: {
    id: string;
    name: string;
    email: string;
  };
};

export type RegisterControlInput = MockControlInput & {
  /** Force a duplicate-email error regardless of the submitted payload. */
  forceDuplicateEmail?: boolean;
};

export class EmailAlreadyRegisteredError extends Error {
  constructor() {
    super("This email is already registered.");
    this.name = "EmailAlreadyRegisteredError";
  }
}

const REGISTERED_EMAILS = new Set(["member@skincommittee.id"]);

export async function register(
  payload: RegisterPayload,
  control: RegisterControlInput = {},
): Promise<RegisterResponse> {
  await simulateMockRequest(control);

  if (
    control.forceDuplicateEmail ||
    REGISTERED_EMAILS.has(payload.email.toLowerCase())
  ) {
    throw new EmailAlreadyRegisteredError();
  }

  return {
    user: {
      id: "user-registered-001",
      name: payload.name,
      email: payload.email,
    },
  };
}

export default register;
