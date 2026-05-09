import {
  simulateMockRequest,
  type MockControlInput,
} from "@/mock-backend/utils/mock-control";

export type AdminSupportConversation = {
  id: string;
  userName: string;
  latestMessage: string;
  latestMessageAt: string;
  latestMessageAuthor: "user" | "admin";
};

export type GetAdminSupportReplySummaryResponse = {
  data: {
    totalCount: number;
    latestConversations: AdminSupportConversation[];
  };
};

const SUPPORT_CONVERSATIONS: AdminSupportConversation[] = [
  {
    id: "support-conversation-1",
    userName: "Anisa",
    latestMessage: "Can I update my routine after I already saved it yesterday?",
    latestMessageAt: "2026-04-28T08:25:00+08:00",
    latestMessageAuthor: "user",
  },
  {
    id: "support-conversation-2",
    userName: "Bagas",
    latestMessage: "Thank you, the skin tone note is clear now.",
    latestMessageAt: "2026-04-28T07:40:00+08:00",
    latestMessageAuthor: "admin",
  },
  {
    id: "support-conversation-3",
    userName: "Citra",
    latestMessage: "My uploaded progress photo is still failing. Please check.",
    latestMessageAt: "2026-04-27T16:10:00+08:00",
    latestMessageAuthor: "user",
  },
  {
    id: "support-conversation-4",
    userName: "Dion",
    latestMessage: "Is there a way to restore a deleted checklist item?",
    latestMessageAt: "2026-04-27T10:05:00+08:00",
    latestMessageAuthor: "user",
  },
];

function getLatestSupportConversations() {
  // Return all conversations sorted by the latest message time (newest first).
  return SUPPORT_CONVERSATIONS.sort(
    (left, right) =>
      new Date(right.latestMessageAt).getTime() -
      new Date(left.latestMessageAt).getTime(),
  );
}

export async function getAdminSupportReplySummary(
  control: MockControlInput = {},
): Promise<GetAdminSupportReplySummaryResponse> {
  await simulateMockRequest(control);

  const latestConversations = getLatestSupportConversations();

  return {
    data: {
      totalCount: latestConversations.length,
      latestConversations,
    },
  };
}

export default getAdminSupportReplySummary;
