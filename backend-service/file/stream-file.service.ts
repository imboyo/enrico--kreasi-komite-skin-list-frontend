import { HttpError } from "libs/error/http-error";

import { fetcher } from "backend-service/util/use-fetcher";

// GET /file/:fileUuid — returns file as inline stream (for preview)
export async function streamFile(fileUuid: string): Promise<Response> {
  const res = await fetcher(`/file/${fileUuid}`);
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new HttpError(res, body);
  }
  return res;
}
