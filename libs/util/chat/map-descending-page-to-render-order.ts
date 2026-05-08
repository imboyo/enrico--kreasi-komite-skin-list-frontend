import { SkinChatMessage } from "@/backend-service/index";
import { ChatMessage } from "@/types/chat.types";

function mapBackendMessage(message: SkinChatMessage): ChatMessage {
  return {
    uuid: `server-${message.uuid}`,
    author: message.sender_role,
    text: message.message,
    status: message.sender_role === "USER" ? "sent" : undefined,
    createdAt: message.created_at,
  };
}

export function mapDescendingPageToRenderOrder(messages: SkinChatMessage[]) {
  // The API returns newest-first; reverse each page so the UI still renders from
  // oldest at the top to newest at the bottom.
  return [...messages].reverse().map(mapBackendMessage);
}
