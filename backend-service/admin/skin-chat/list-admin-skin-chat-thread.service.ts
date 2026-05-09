import { parseOrThrow } from "libs/util/parse-or-throw";

import { fetcher } from "backend-service/util/use-fetcher";

import type {
  ListAdminSkinChatThreadPayload,
  ListAdminSkinChatThreadResponse,
} from "./types";

// POST /admin/skin-chat/thread-list — paginated list of user skin chat threads.
export async function listAdminSkinChatThread(
  payload: ListAdminSkinChatThreadPayload = {},
): Promise<ListAdminSkinChatThreadResponse> {
  const res = await fetcher("/admin/skin-chat/thread-list", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseOrThrow<ListAdminSkinChatThreadResponse>(res);
}
