import { parseOrThrow } from "libs/util/parse-or-throw";

import { fetcher } from "backend-service/util/use-fetcher";

import type { CleanAdminSkinChatThreadResponse } from "./types";

// DELETE /admin/skin-chat/thread-clean/:userUuid — deletes all messages in a user's thread.
export async function cleanAdminSkinChatThread(
  userUuid: string,
): Promise<CleanAdminSkinChatThreadResponse> {
  const res = await fetcher(`/admin/skin-chat/thread-clean/${userUuid}`, {
    method: "DELETE",
  });
  return parseOrThrow<CleanAdminSkinChatThreadResponse>(res);
}
