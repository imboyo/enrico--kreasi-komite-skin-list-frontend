"use client";

import { useEffect, type MutableRefObject } from "react";

import { mapDescendingPageToRenderOrder } from "libs/util/chat/map-descending-page-to-render-order";

import type {
  MessagesQueryData,
  MessagesRef,
  SetBoolean,
  SetMessages,
  SetNullableString,
} from "hooks/chat/page-chat/types";

type UseSeedInitialMessagesParams = {
  initializedRef: MutableRefObject<boolean>;
  messagesRef: MessagesRef;
  queryData: MessagesQueryData | undefined;
  scheduleScrollToBottom: () => void;
  setHasMore: SetBoolean;
  setMessages: SetMessages;
  setNextCursor: SetNullableString;
};

export function useSeedInitialMessages({
  initializedRef,
  messagesRef,
  queryData,
  scheduleScrollToBottom,
  setHasMore,
  setMessages,
  setNextCursor,
}: UseSeedInitialMessagesParams) {
  useEffect(() => {
    if (!queryData || initializedRef.current) return;

    const seededMessages = mapDescendingPageToRenderOrder(queryData.data);

    initializedRef.current = true;
    // Keep the ref aligned immediately so polling cannot read a stale cursor.
    messagesRef.current = seededMessages;
    scheduleScrollToBottom();
    setMessages(seededMessages);
    setHasMore(queryData.meta.has_more);
    setNextCursor(queryData.meta.next_cursor);
  }, [
    initializedRef,
    messagesRef,
    queryData,
    scheduleScrollToBottom,
    setHasMore,
    setMessages,
    setNextCursor,
  ]);
}
