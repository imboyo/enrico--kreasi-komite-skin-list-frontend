import { HttpError } from "libs/error/http-error";

import { fetcher } from "backend-service/util/use-fetcher";

// GET /file/:fileUuid/download — returns file as attachment (triggers browser download)
export async function downloadFile(fileUuid: string): Promise<Response> {
  const res = await fetcher(`/file/${fileUuid}/download`);
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new HttpError(res, body);
  }
  return res;
}
