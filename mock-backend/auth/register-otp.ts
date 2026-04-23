import {
  simulateMockRequest,
  type MockControlInput,
} from "@/mock-backend/utils/mock-control";

import {
  EmailAlreadyRegisteredError,
  register,
  type RegisterPayload,
  type RegisterResponse,
} from "./register";

export type RequestRegisterOtpPayload = RegisterPayload;

export type VerifyRegisterOtpPayload = RegisterPayload & {
  otp: string;
};

export class InvalidRegisterOtpError extends Error {
  constructor() {
    super("The OTP code is invalid or expired.");
    this.name = "InvalidRegisterOtpError";
  }
}

const MOCK_REGISTER_OTP = "123456";
const REGISTERED_EMAILS = new Set(["member@skincommittee.id"]);

export async function requestRegisterOtp(
  payload: RequestRegisterOtpPayload,
  control: MockControlInput = {},
): Promise<void> {
  await simulateMockRequest(control);

  if (REGISTERED_EMAILS.has(payload.email.toLowerCase())) {
    throw new EmailAlreadyRegisteredError();
  }
}

export async function verifyRegisterOtp(
  payload: VerifyRegisterOtpPayload,
  control: MockControlInput = {},
): Promise<RegisterResponse> {
  await simulateMockRequest(control);

  if (payload.otp !== MOCK_REGISTER_OTP) {
    throw new InvalidRegisterOtpError();
  }

  return register(
    {
      name: payload.name,
      email: payload.email,
      password: payload.password,
    },
  );
}

const registerOtpApi = { requestRegisterOtp, verifyRegisterOtp };

export default registerOtpApi;
