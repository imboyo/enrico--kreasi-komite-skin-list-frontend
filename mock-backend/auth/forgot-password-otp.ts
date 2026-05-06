import {
  simulateMockRequest,
  type MockControlInput,
} from "@/mock-backend/utils/mock-control";

export class WhatsappNotRegisteredError extends Error {
  constructor() {
    super("WhatsApp number is not registered.");
    this.name = "WhatsappNotRegisteredError";
  }
}

export class InvalidForgotPasswordOtpError extends Error {
  constructor() {
    super("The OTP code is invalid or expired.");
    this.name = "InvalidForgotPasswordOtpError";
  }
}

const MOCK_FORGOT_PASSWORD_OTP = "123456";
// Mock registered numbers — must match what the register mock considers registered.
const REGISTERED_WHATSAPP_NUMBERS = new Set(["+628123456789", "+6285399292027"]);

export async function requestForgotPasswordOtp(
  payload: { whatsappNumber: string },
  control: MockControlInput = {},
): Promise<void> {
  await simulateMockRequest(control);

  if (!REGISTERED_WHATSAPP_NUMBERS.has(payload.whatsappNumber)) {
    throw new WhatsappNotRegisteredError();
  }
}

export async function verifyForgotPasswordOtp(
  payload: { whatsappNumber: string; otp: string },
  control: MockControlInput = {},
): Promise<void> {
  await simulateMockRequest(control);

  if (payload.otp !== MOCK_FORGOT_PASSWORD_OTP) {
    throw new InvalidForgotPasswordOtpError();
  }
}

export async function resetPassword(
  payload: { whatsappNumber: string; newPassword: string },
  control: MockControlInput = {},
): Promise<void> {
  await simulateMockRequest(control);
  // In a real app, this would persist the new password for the given number.
}

const forgotPasswordOtpApi = {
  requestForgotPasswordOtp,
  verifyForgotPasswordOtp,
  resetPassword,
};

export default forgotPasswordOtpApi;
