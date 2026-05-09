import { parseOrThrow } from "libs/util/parse-or-throw";

import { fetcher } from "backend-service/util/use-fetcher";

import type { CleanAdminSkinChatThreadResponse } from "./types";

// DELETE /admin/skin-chat/thread-clean/:threadId — deletes all messages in a thread.
export async function cleanAdminSkinChatThread(
  threadId: string,
): Promise<CleanAdminSkinChatThreadResponse> {
  const res = await fetcher(`/admin/skin-chat/thread-clean/${threadId}`, {
    method: "DELETE",
  });
  return parseOrThrow<CleanAdminSkinChatThreadResponse>(res);
}
