import { parseOrThrow } from "libs/util/parse-or-throw";

import { fetcher } from "backend-service/util/use-fetcher";

import type { CleanMessagesResponse } from "./types";

// DELETE /user/skin-chat/clean — deletes all messages for the user's thread
export async function cleanMessages(): Promise<CleanMessagesResponse> {
  const res = await fetcher("/user/skin-chat/clean", { method: "DELETE" });
  return parseOrThrow<CleanMessagesResponse>(res);
}
