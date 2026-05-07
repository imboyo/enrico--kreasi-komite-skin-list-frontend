import { parseOrThrow } from "libs/util/parse-or-throw";

import { fetcher } from "backend-service/util/use-fetcher";

import type { GetMessagesPayload, GetMessagesResponse } from "./types";

// POST /user/skin-chat/messages — cursor-paginated chat history, newest-first
export async function getMessages(
  payload: GetMessagesPayload = {},
): Promise<GetMessagesResponse> {
  const res = await fetcher("/user/skin-chat/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseOrThrow<GetMessagesResponse>(res);
}
