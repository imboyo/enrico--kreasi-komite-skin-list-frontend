import { parseOrThrow } from "libs/util/parse-or-throw";

import { fetcher } from "backend-service/util/use-fetcher";

import type { SendMessagePayload, SendMessageResponse } from "./types";

// POST /user/skin-chat — sends a user message; auto-creates thread on first message
export async function sendMessage(
  payload: SendMessagePayload,
): Promise<SendMessageResponse> {
  const res = await fetcher("/user/skin-chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseOrThrow<SendMessageResponse>(res);
}
