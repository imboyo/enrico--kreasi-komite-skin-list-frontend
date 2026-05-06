import { parseOrThrow } from "libs/util/parse-or-throw";

import { fetcher } from "backend-service/util/use-fetcher";
import type {
  UploadPhotoProfilePayload,
  UploadPhotoProfileResponse,
} from "./types";

// POST /account/photo-profile — multipart/form-data, do NOT set Content-Type manually
export async function uploadPhotoProfile(
  file: UploadPhotoProfilePayload,
): Promise<UploadPhotoProfileResponse> {
  const form = new FormData();
  form.append("file", file);

  const res = await fetcher("/account/photo-profile", {
    method: "POST",
    body: form,
  });

  return parseOrThrow<UploadPhotoProfileResponse>(res);
}
