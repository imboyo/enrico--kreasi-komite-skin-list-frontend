import { HttpError } from "libs/error/http-error";

export async function parseOrThrow<T>(res: Response): Promise<T> {
  const body = await res.json().catch(() => null);

  if (!res.ok) {
    throw new HttpError(res, body);
  }

  return body as T;
}
