import { parseOrThrow } from "libs/util/parse-or-throw";

import { fetcher } from "backend-service/util/use-fetcher";

import type { GetMessagesPayload, GetMessagesResponse } from "./types";

type RawGetMessagesResponse = Omit<GetMessagesResponse, "data"> & {
  data: Array<
    Omit<GetMessagesResponse["data"][number], "sender_role"> & {
      sender_role: "USER" | "ADMIN" | "user" | "admin";
    }
  >;
};

function normalizeSenderRole(
  senderRole: RawGetMessagesResponse["data"][number]["sender_role"],
) {
  return senderRole.toUpperCase() as GetMessagesResponse["data"][number]["sender_role"];
}

function normalizeGetMessagesResponse(
  response: RawGetMessagesResponse,
): GetMessagesResponse {
  return {
    ...response,
    data: response.data.map((message) => ({
      ...message,
      // The new API returns lowercase roles; keep the shared app type stable.
      sender_role: normalizeSenderRole(message.sender_role),
    })),
  };
}

// POST /user/skin-chat/messages — cursor-paginated chat history, newest-first
export async function getMessages(
  payload: GetMessagesPayload = {},
): Promise<GetMessagesResponse> {
  if (payload.before && payload.after) {
    throw new Error("getMessages only supports one cursor: before or after.");
  }

  const normalizedPayload = {
    ...payload,
    // The backend caps page size at 25, so clamp on the client to keep
    // requests predictable across initial load, pagination, and polling.
    limit:
      typeof payload.limit === "number" ? Math.min(payload.limit, 25) : undefined,
  };

  const res = await fetcher("/user/skin-chat/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(normalizedPayload),
  });

  const response = await parseOrThrow<RawGetMessagesResponse>(res);
  return normalizeGetMessagesResponse(response);
}
