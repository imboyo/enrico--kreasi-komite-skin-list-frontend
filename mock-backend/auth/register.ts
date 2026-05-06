import {
  simulateMockRequest,
  type MockControlInput,
} from "@/mock-backend/utils/mock-control";

export type RegisterPayload = {
  name: string;
  whatsappNumber: string;
  password: string;
};

export type RegisterResponse = {
  user: {
    id: string;
    name: string;
    whatsappNumber: string;
  };
};

export type RegisterControlInput = MockControlInput & {
  /** Force a duplicate-whatsapp error regardless of the submitted payload. */
  forceDuplicateWhatsapp?: boolean;
};

export class WhatsappAlreadyRegisteredError extends Error {
  constructor() {
    super("This WhatsApp number is already registered.");
    this.name = "WhatsappAlreadyRegisteredError";
  }
}

const REGISTERED_WHATSAPP_NUMBERS = new Set(["+628123456789"]);

export async function register(
  payload: RegisterPayload,
  control: RegisterControlInput = {},
): Promise<RegisterResponse> {
  await simulateMockRequest(control);

  if (
    control.forceDuplicateWhatsapp ||
    REGISTERED_WHATSAPP_NUMBERS.has(payload.whatsappNumber)
  ) {
    throw new WhatsappAlreadyRegisteredError();
  }

  return {
    user: {
      id: "user-registered-001",
      name: payload.name,
      whatsappNumber: payload.whatsappNumber,
    },
  };
}

export default register;
