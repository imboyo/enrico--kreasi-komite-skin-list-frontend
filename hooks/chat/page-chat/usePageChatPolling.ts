"use client";

import { useEffect } from "react";

import { getMessages } from "backend-service/index";

import { appendIncomingMessages } from "libs/util/chat/append-incoming-messages";
import { mapDescendingPageToRenderOrder } from "libs/util/chat/map-descending-page-to-render-order";

import { PAGE_SIZE, POLL_INTERVAL_MS } from "hooks/chat/page-chat/constants";
import type {
  BooleanRef,
  MessagesQueryData,
  MessagesRef,
  SetBoolean,
  SetMessages,
  SetNullableString,
} from "hooks/chat/page-chat/types";

type UsePageChatPollingParams = {
  initializedRef: BooleanRef;
  isInitialError: boolean;
  isPollingRef: BooleanRef;
  messagesRef: MessagesRef;
  queryData: MessagesQueryData | undefined;
  scheduleScrollToBottom: () => void;
  setErrorMessage: SetNullableString;
  setHasMore: SetBoolean;
  setMessages: SetMessages;
  setNextCursor: SetNullableString;
};

export function usePageChatPolling({
  initializedRef,
  isInitialError,
  isPollingRef,
  messagesRef,
  queryData,
  scheduleScrollToBottom,
  setErrorMessage,
  setHasMore,
  setMessages,
  setNextCursor,
}: UsePageChatPollingParams) {
  useEffect(() => {
    if (!initializedRef.current || isInitialError) return;

    let isCancelled = false;

    async function pollForNewMessages() {
      if (isPollingRef.current) return;

      isPollingRef.current = true;

      try {
        // Only confirmed server messages are valid cursors for incremental fetches.
        const newestServerMessage = [...messagesRef.current]
          .reverse()
          .find((message) => message.uuid.startsWith("server-"));
        const afterCursor = newestServerMessage?.createdAt;

        const response = await getMessages({ after: afterCursor, limit: PAGE_SIZE });
        if (isCancelled) return;

        setErrorMessage(null);

        const wasCleared =
          response.meta.last_cleared_at &&
          afterCursor &&
          new Date(response.meta.last_cleared_at) > new Date(afterCursor);

        if (wasCleared) {
          const freshMessages = mapDescendingPageToRenderOrder(response.data);

          scheduleScrollToBottom();
          messagesRef.current = freshMessages;
          setMessages(freshMessages);
          setHasMore(false);
          setNextCursor(null);
          return;
        }

        const nextMessages = appendIncomingMessages(messagesRef.current, response.data);
        if (nextMessages === messagesRef.current) return;

        scheduleScrollToBottom();
        messagesRef.current = nextMessages;
        setMessages(nextMessages);
      } catch {
        if (!isCancelled) setErrorMessage("Chat gagal diperbarui.");
      } finally {
        isPollingRef.current = false;
      }
    }

    const intervalId = window.setInterval(() => void pollForNewMessages(), POLL_INTERVAL_MS);

    return () => {
      isCancelled = true;
      window.clearInterval(intervalId);
    };
  }, [
    initializedRef,
    isInitialError,
    isPollingRef,
    messagesRef,
    queryData,
    scheduleScrollToBottom,
    setErrorMessage,
    setHasMore,
    setMessages,
    setNextCursor,
  ]);
}
