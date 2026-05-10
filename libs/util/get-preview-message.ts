import type { AdminSkinChatThread } from "backend-service/admin/skin-chat";

export function getPreviewMessage(thread: AdminSkinChatThread) {
  const lastMessage = thread.messages.at(-1);

  if (!lastMessage) return "No messages yet";

  return lastMessage.message || "Message";
}

