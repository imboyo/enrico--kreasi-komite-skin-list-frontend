import {
  simulateMockRequest,
  type MockControlInput,
} from "@/mock-backend/utils/mock-control";

import {
  WhatsappAlreadyRegisteredError,
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
const REGISTERED_WHATSAPP_NUMBERS = new Set(["+628123456789"]);

export async function requestRegisterOtp(
  payload: RequestRegisterOtpPayload,
  control: MockControlInput = {},
): Promise<void> {
  await simulateMockRequest(control);

  if (REGISTERED_WHATSAPP_NUMBERS.has(payload.whatsappNumber)) {
    throw new WhatsappAlreadyRegisteredError();
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

  return register({
    name: payload.name,
    whatsappNumber: payload.whatsappNumber,
    password: payload.password,
  });
}

const registerOtpApi = { requestRegisterOtp, verifyRegisterOtp };

export default registerOtpApi;
