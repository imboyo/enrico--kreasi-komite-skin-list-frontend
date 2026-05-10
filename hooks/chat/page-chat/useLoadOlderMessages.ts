"use client";

import { useCallback } from "react";

import { getMessages } from "backend-service/index";

import { mapDescendingPageToRenderOrder } from "libs/util/chat/map-descending-page-to-render-order";

import { PAGE_SIZE } from "hooks/chat/page-chat/constants";
import type {
  ScrollContainerRef,
  SetBoolean,
  SetMessages,
  SetNullableString,
} from "hooks/chat/page-chat/types";

type UseLoadOlderMessagesParams = {
  hasMore: boolean;
  isLoadingOlder: boolean;
  nextCursor: string | null;
  scheduleScrollPreservePrepend: (previousHeight: number) => void;
  scrollRef: ScrollContainerRef;
  setErrorMessage: SetNullableString;
  setHasMore: SetBoolean;
  setIsLoadingOlder: SetBoolean;
  setMessages: SetMessages;
  setNextCursor: SetNullableString;
};

export function useLoadOlderMessages({
  hasMore,
  isLoadingOlder,
  nextCursor,
  scheduleScrollPreservePrepend,
  scrollRef,
  setErrorMessage,
  setHasMore,
  setIsLoadingOlder,
  setMessages,
  setNextCursor,
}: UseLoadOlderMessagesParams) {
  return useCallback(async () => {
    if (isLoadingOlder || !hasMore || !nextCursor) return;

    // Capture the current height so we can restore the viewport after the prepend.
    const previousHeight = scrollRef.current?.scrollHeight ?? 0;

    setIsLoadingOlder(true);
    setErrorMessage(null);

    try {
      const response = await getMessages({ before: nextCursor, limit: PAGE_SIZE });
      const olderMessages = mapDescendingPageToRenderOrder(response.data);

      if (olderMessages.length > 0) {
        scheduleScrollPreservePrepend(previousHeight);
        setMessages((previousMessages) => [...olderMessages, ...previousMessages]);
      }

      setHasMore(response.meta.has_more);
      setNextCursor(response.meta.next_cursor);
    } catch {
      setErrorMessage("Pesan sebelumnya gagal dimuat.");
    } finally {
      setIsLoadingOlder(false);
    }
  }, [
    hasMore,
    isLoadingOlder,
    nextCursor,
    scheduleScrollPreservePrepend,
    scrollRef,
    setErrorMessage,
    setHasMore,
    setIsLoadingOlder,
    setMessages,
    setNextCursor,
  ]);
}
