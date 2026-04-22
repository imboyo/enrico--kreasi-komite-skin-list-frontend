export class MockServerDownError extends Error {
  public readonly statusCode: number;

  constructor(message = "Mock server is down", statusCode = 503) {
    super(message);
    this.name = "MockServerDownError";
    this.statusCode = statusCode;
  }
}

export type MockControlInput = {
  delayMs?: number | string;
  serverDown?: boolean | string;
  errorMessage?: string;
  statusCode?: number | string;
};

type NormalizedMockControl = {
  delayMs: number;
  serverDown: boolean;
  errorMessage: string;
  statusCode: number;
};

const DEFAULT_DELAY_MS = 0;
const DEFAULT_STATUS_CODE = 503;
const DEFAULT_ERROR_MESSAGE = "Mock server is down";

function normalizeBoolean(value: MockControlInput["serverDown"]): boolean {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "string") {
    return value.toLowerCase() === "true";
  }

  return false;
}

function normalizeNumber(
  value: number | string | undefined,
  fallback: number,
): number {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim() !== "") {
    const parsedValue = Number(value);

    if (Number.isFinite(parsedValue)) {
      return parsedValue;
    }
  }

  return fallback;
}

export function normalizeMockControl(
  input: MockControlInput = {},
): NormalizedMockControl {
  return {
    delayMs: Math.max(0, normalizeNumber(input.delayMs, DEFAULT_DELAY_MS)),
    serverDown: normalizeBoolean(input.serverDown),
    errorMessage: input.errorMessage?.trim() || DEFAULT_ERROR_MESSAGE,
    statusCode: Math.max(
      100,
      normalizeNumber(input.statusCode, DEFAULT_STATUS_CODE),
    ),
  };
}

function wait(delayMs: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, delayMs);
  });
}

export async function simulateMockRequest(
  input: MockControlInput = {},
): Promise<NormalizedMockControl> {
  const control = normalizeMockControl(input);

  if (control.delayMs > 0) {
    await wait(control.delayMs);
  }

  if (control.serverDown) {
    throw new MockServerDownError(control.errorMessage, control.statusCode);
  }

  return control;
}
