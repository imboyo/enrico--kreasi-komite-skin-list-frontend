import { parseOrThrow } from "libs/util/parse-or-throw";

import { fetcher } from "backend-service/util/use-fetcher";

import type {
  ReplyAdminSkinChatThreadPayload,
  ReplyAdminSkinChatThreadResponse,
} from "./types";

// POST /admin/skin-chat/thread-reply/:threadId — sends an admin reply to a thread.
export async function replyAdminSkinChatThread(
  threadId: string,
  payload: ReplyAdminSkinChatThreadPayload,
): Promise<ReplyAdminSkinChatThreadResponse> {
  const res = await fetcher(`/admin/skin-chat/thread-reply/${threadId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseOrThrow<ReplyAdminSkinChatThreadResponse>(res);
}
