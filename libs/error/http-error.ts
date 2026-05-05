type ErrorBody = {
  message?: string | string[];
  error?: string;
  statusCode?: number;
  [key: string]: unknown;
};

function getErrorMessage(body: unknown): string | undefined {
  if (!body || typeof body !== "object") {
    return undefined;
  }

  const errorBody = body as ErrorBody;

  if (Array.isArray(errorBody.message)) {
    return errorBody.message.join(", ");
  }

  if (typeof errorBody.message === "string") {
    return errorBody.message;
  }

  if (typeof errorBody.error === "string") {
    return errorBody.error;
  }

  return undefined;
}

function buildHttpErrorMessage(response: Response, body: unknown): string {
  return getErrorMessage(body) || `${response.status} ${response.statusText}`;
}


export class HttpError<TBody = unknown> extends Error {
  public readonly status: number;
  public readonly statusText: string;
  public readonly body: TBody | null;
  public readonly response: Response;

  constructor(response: Response, body: TBody | null, message?: string) {
    super(message || buildHttpErrorMessage(response, body));
    this.name = "HttpError";
    this.status = response.status;
    this.statusText = response.statusText;
    this.body = body;
    this.response = response;
  }
}