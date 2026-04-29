import type { AdminChatConversation } from "mock-backend/admin/chat/chats";

export function getPreviewMessage(conversation: AdminChatConversation) {
  const lastMessage = conversation.messages.at(-1);

  if (!lastMessage) return "No messages yet";
  if (lastMessage.type === "image") return "Image attachment";
  if (lastMessage.type === "file")
    return lastMessage.fileName ?? "File attachment";

  return lastMessage.text ?? "Message";
}

