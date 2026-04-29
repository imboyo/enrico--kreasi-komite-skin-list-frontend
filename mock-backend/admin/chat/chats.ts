import type { ChatMessage } from "@/components/atomic/molecule/chat/ChatBubble";
import {
  simulateMockRequest,
  type MockControlInput,
} from "@/mock-backend/utils/mock-control";

export type AdminChatConversation = {
  id: string;
  fullName: string;
  email: string;
  lastSeenLabel: string;
  messages: ChatMessage[];
};

export type GetAdminChatsResponse = {
  data: AdminChatConversation[];
};

function daysAgo(days: number, hour = 10, minute = 0) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  date.setHours(hour, minute, 0, 0);
  return date.toISOString();
}

const ADMIN_CHATS: AdminChatConversation[] = [
  {
    id: "chat-anisa",
    fullName: "Anisa Putri",
    email: "anisa.putri@example.com",
    lastSeenLabel: "Online",
    messages: [
      {
        id: "anisa-1",
        author: "admin",
        type: "text",
        text: "Hi, I want to confirm the order for my dry skin routine.",
        createdAt: daysAgo(1, 9, 20),
      },
      {
        id: "anisa-2",
        author: "user",
        type: "text",
        text: "Sure, I can help check it. Which routine step feels unclear?",
        status: "read",
        createdAt: daysAgo(1, 9, 24),
      },
      {
        id: "anisa-3",
        author: "admin",
        type: "text",
        text: "The serum and moisturizer order. Should I use the serum first?",
        createdAt: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
      },
    ],
  },
  {
    id: "chat-bagas",
    fullName: "Bagas Pratama",
    email: "bagas.pratama@example.com",
    lastSeenLabel: "Last seen 12m ago",
    messages: [
      {
        id: "bagas-1",
        author: "admin",
        type: "text",
        text: "My sunscreen leaves a white cast. Any better option?",
        createdAt: daysAgo(2, 14, 12),
      },
      {
        id: "bagas-2",
        author: "user",
        type: "text",
        text: "Try a gel or hybrid sunscreen. I can send a few product options.",
        status: "delivered",
        createdAt: daysAgo(2, 14, 18),
      },
    ],
  },
  {
    id: "chat-citra",
    fullName: "Citra Lestari",
    email: "citra.lestari@example.com",
    lastSeenLabel: "Last seen yesterday",
    messages: [
      {
        id: "citra-1",
        author: "admin",
        type: "text",
        text: "Is it okay to use retinol while my barrier still feels weak?",
        createdAt: daysAgo(4, 20, 5),
      },
      {
        id: "citra-2",
        author: "user",
        type: "text",
        text: "Pause retinol first and focus on barrier repair for a few weeks.",
        status: "read",
        createdAt: daysAgo(4, 20, 10),
      },
    ],
  },
  {
    id: "chat-dion",
    fullName: "Dion Mahendra",
    email: "dion.mahendra@example.com",
    lastSeenLabel: "Offline",
    messages: [
      {
        id: "dion-1",
        author: "admin",
        type: "text",
        text: "I uploaded my routine list. Can you review it?",
        createdAt: daysAgo(8, 8, 45),
      },
      {
        id: "dion-2",
        author: "user",
        type: "text",
        text: "Yes, I will review the active ingredients and check for overlap.",
        status: "read",
        createdAt: daysAgo(8, 8, 55),
      },
    ],
  },
];

export async function getAdminChats(
  control: MockControlInput = {},
): Promise<GetAdminChatsResponse> {
  await simulateMockRequest(control);

  return {
    data: ADMIN_CHATS,
  };
}

export default getAdminChats;
