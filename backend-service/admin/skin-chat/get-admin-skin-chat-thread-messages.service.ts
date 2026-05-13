import { parseOrThrow } from "libs/util/parse-or-throw";

import { fetcher } from "backend-service/util/use-fetcher";

import type {
  GetAdminSkinChatThreadMessagesPayload,
  GetAdminSkinChatThreadMessagesResponse,
} from "./types";

// POST /admin/skin-chat/thread-messages/:userUuid — cursor-paginated messages for a user's thread.
export async function getAdminSkinChatThreadMessages(
  userUuid: string,
  payload: GetAdminSkinChatThreadMessagesPayload = {},
): Promise<GetAdminSkinChatThreadMessagesResponse> {
  const normalizedPayload = {
    ...payload,
    // The backend caps page size at 25, so clamp client-side for stable pagination calls.
    limit:
      typeof payload.limit === "number"
        ? Math.min(payload.limit, 25)
        : undefined,
  };

  const res = await fetcher(`/admin/skin-chat/thread-messages/${userUuid}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(normalizedPayload),
  });
  return parseOrThrow<GetAdminSkinChatThreadMessagesResponse>(res);
}
