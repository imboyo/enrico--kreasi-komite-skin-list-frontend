"use client";

import { useCallback } from "react";

import { cleanMessages } from "backend-service/index";

import type {
  MessagesRef,
  SetBoolean,
  SetMessages,
  SetNullableString,
  ShowToast,
} from "hooks/chat/page-chat/types";

type UseHandleDeleteConversationParams = {
  isDeletingConversation: boolean;
  messagesRef: MessagesRef;
  scheduleScrollToBottom: () => void;
  setErrorMessage: SetNullableString;
  setHasMore: SetBoolean;
  setIsDeletingConversation: SetBoolean;
  setMessages: SetMessages;
  setNextCursor: SetNullableString;
  showToast: ShowToast;
};

export function useHandleDeleteConversation({
  isDeletingConversation,
  messagesRef,
  scheduleScrollToBottom,
  setErrorMessage,
  setHasMore,
  setIsDeletingConversation,
  setMessages,
  setNextCursor,
  showToast,
}: UseHandleDeleteConversationParams) {
  return useCallback(async () => {
    if (isDeletingConversation) return false;

    setIsDeletingConversation(true);
    setErrorMessage(null);

    try {
      await cleanMessages();

      // Reset the local thread immediately so the UI matches the cleared backend state.
      messagesRef.current = [];
      scheduleScrollToBottom();
      setMessages([]);
      setHasMore(false);
      setNextCursor(null);

      showToast("Percakapan berhasil dihapus.", { variant: "success" });
      return true;
    } catch {
      setErrorMessage("Percakapan gagal dihapus.");
      showToast("Percakapan gagal dihapus. Silakan coba lagi.", {
        variant: "error",
      });
      return false;
    } finally {
      setIsDeletingConversation(false);
    }
  }, [
    isDeletingConversation,
    messagesRef,
    scheduleScrollToBottom,
    setErrorMessage,
    setHasMore,
    setIsDeletingConversation,
    setMessages,
    setNextCursor,
    showToast,
  ]);
}
