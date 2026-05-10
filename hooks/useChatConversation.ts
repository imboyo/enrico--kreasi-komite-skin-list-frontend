"use client";

import { useCallback, useState } from "react";

import type { AdminSkinChatMessage } from "backend-service/admin/skin-chat";

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

type UseChatConversationParams = {
  initialMessages: AdminSkinChatMessage[];
  onSendText: (text: string) => Promise<AdminSkinChatMessage>;
};

/**
 * Manages local chat state with backend integration for sending replies.
 * Optimistically appends the sent message and replaces it with the server response on success.
 */
export function useChatConversation({
  initialMessages,
  onSendText,
}: UseChatConversationParams) {
  const [messages, setMessages] = useState<AdminSkinChatMessage[]>(initialMessages);

  const sendText = useCallback(
    async (text: string) => {
      const optimisticId = createId();
      const optimisticMessage: AdminSkinChatMessage = {
        uuid: optimisticId,
        message: text,
        created_at: new Date().toISOString(),
        sender_role: "ADMIN",
      };

      setMessages((prev) => [...prev, optimisticMessage]);

      try {
        const serverMessage = await onSendText(text);
        setMessages((prev) =>
          prev.map((msg) => (msg.uuid === optimisticId ? serverMessage : msg)),
        );
      } catch {
        // Leave the optimistic message in place so the user sees their text,
        // even if the server call failed.
      }
    },
    [onSendText],
  );

  return { messages, sendText };
}
