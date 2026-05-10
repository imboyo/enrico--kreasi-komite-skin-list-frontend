"use client";

import { useCallback } from "react";

import { sendMessage } from "backend-service/index";

import type { ChatMessage } from "types/chat.types";

import type { SetBoolean, SetMessages, SetNullableString } from "hooks/chat/page-chat/types";

type UseHandleSendTextParams = {
  isDeletingConversation: boolean;
  scheduleScrollToBottom: () => void;
  setErrorMessage: SetNullableString;
  setIsSendingText: SetBoolean;
  setMessages: SetMessages;
};

export function useHandleSendText({
  isDeletingConversation,
  scheduleScrollToBottom,
  setErrorMessage,
  setIsSendingText,
  setMessages,
}: UseHandleSendTextParams) {
  return useCallback(
    async (text: string) => {
      const trimmedText = text.trim();
      if (!trimmedText || isDeletingConversation) return;

      // Render the outgoing message immediately, then reconcile it on success.
      const optimisticId = `optimistic-${Date.now()}-${crypto.randomUUID()}`;
      const optimisticMessage: ChatMessage = {
        uuid: optimisticId,
        author: "USER",
        text: trimmedText,
        status: "sending",
        createdAt: new Date().toISOString(),
      };

      scheduleScrollToBottom();
      setMessages((previousMessages) => [...previousMessages, optimisticMessage]);
      setIsSendingText(true);
      setErrorMessage(null);

      try {
        const response = await sendMessage({ message: trimmedText });
        const confirmedMessage: ChatMessage = {
          uuid: response.message_id ? `server-${response.message_id}` : optimisticId,
          author: "USER",
          text: response.message ?? trimmedText,
          status: "sent",
          createdAt: response.created_at ?? optimisticMessage.createdAt,
        };

        setMessages((previousMessages) =>
          previousMessages.map((message) =>
            message.uuid === optimisticId ? confirmedMessage : message,
          ),
        );
      } catch {
        setErrorMessage("Pesan gagal dikirim.");
        // Remove the optimistic row when the request fails so the thread stays honest.
        setMessages((previousMessages) =>
          previousMessages.filter((message) => message.uuid !== optimisticId),
        );
      } finally {
        setIsSendingText(false);
      }
    },
    [
      isDeletingConversation,
      scheduleScrollToBottom,
      setErrorMessage,
      setIsSendingText,
      setMessages,
    ],
  );
}
