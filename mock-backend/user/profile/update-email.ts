import {
  simulateMockRequest,
  type MockControlInput,
} from "@/mock-backend/utils/mock-control";

export type RequestEmailOtpPayload = {
  newEmail: string;
};

export type VerifyEmailOtpPayload = {
  newEmail: string;
  otp: string;
};

export type UpdateEmailResponse = {
  email: string;
};

export class EmailAlreadyInUseError extends Error {
  constructor() {
    super("This email is already in use.");
    this.name = "EmailAlreadyInUseError";
  }
}

export class InvalidOtpError extends Error {
  constructor() {
    super("The OTP code is invalid or expired.");
    this.name = "InvalidOtpError";
  }
}

const TAKEN_EMAILS = new Set(["member@skincommittee.id"]);

// Simulates sending OTP — in production this triggers an email.
export async function requestEmailOtp(
  payload: RequestEmailOtpPayload,
  control: MockControlInput = {},
): Promise<void> {
  await simulateMockRequest(control);

  if (TAKEN_EMAILS.has(payload.newEmail.toLowerCase())) {
    throw new EmailAlreadyInUseError();
  }
}

// Mock OTP for dev — always "123456".
const MOCK_OTP = "123456";

export async function verifyEmailOtp(
  payload: VerifyEmailOtpPayload,
  control: MockControlInput = {},
): Promise<UpdateEmailResponse> {
  await simulateMockRequest(control);

  if (payload.otp !== MOCK_OTP) {
    throw new InvalidOtpError();
  }

  return { email: payload.newEmail };
}

export default { requestEmailOtp, verifyEmailOtp };
