"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getMessages, sendMessage } from "backend-service";

import type { ChatMessage } from "@/types/chat.types";
import { appendIncomingMessages } from "@/libs/util/chat/append-incoming-messages";
import { mapDescendingPageToRenderOrder } from "@/libs/util/chat/map-descending-page-to-render-order";

const PAGE_SIZE = 20;
const POLL_INTERVAL_MS = 45_000;

type PendingScrollAction =
  | { type: "bottom" }
  | { type: "preserve-prepend"; previousHeight: number }
  | null;

export function usePageChat() {
  // Local messages state is the source of truth after initial load — needed for
  // optimistic inserts on send and prepended pages from "load older" pagination.
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [isLoadingOlder, setIsLoadingOlder] = useState(false);
  const [isSendingText, setIsSendingText] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const pendingScrollActionRef = useRef<PendingScrollAction>(null);

  // Guard so we only seed local state once from the query result.
  const initializedRef = useRef(false);
  const messagesRef = useRef<ChatMessage[]>([]);
  const isPollingRef = useRef(false);

  const {
    data: queryData,
    isLoading: isInitialLoading,
    isError: isInitialError,
  } = useQuery({
    queryKey: ["skin-chat-messages"],
    queryFn: () => getMessages({ limit: PAGE_SIZE }),
    // Disable background refetches — we manage updates ourselves via local state.
    refetchOnWindowFocus: false,
    retry: 1,
  });

  // Seed local state once when the initial query resolves (onSuccess was removed in v5).
  useEffect(() => {
    if (!queryData || initializedRef.current) return;
    initializedRef.current = true;
    pendingScrollActionRef.current = { type: "bottom" };
    setMessages(mapDescendingPageToRenderOrder(queryData.data));
    setHasMore(queryData.meta.has_more);
    setNextCursor(queryData.meta.next_cursor);
  }, [queryData]);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useLayoutEffect(() => {
    const element = scrollRef.current;
    const pendingScrollAction = pendingScrollActionRef.current;
    if (!element || !pendingScrollAction) return;

    if (pendingScrollAction.type === "preserve-prepend") {
      // Restoring the offset by the height delta keeps the same message anchored
      // under the user's eye after older items are inserted above it.
      element.scrollTop =
        element.scrollHeight - pendingScrollAction.previousHeight;
    } else {
      element.scrollTop = element.scrollHeight;
    }

    pendingScrollActionRef.current = null;
  }, [messages]);

  useEffect(() => {
    if (!initializedRef.current || isInitialError) return;

    let cancelled = false;

    async function pollForNewMessages() {
      if (isPollingRef.current) return;
      isPollingRef.current = true;

      try {
        const response = await getMessages({ limit: PAGE_SIZE });

        if (cancelled) return;

        setErrorMessage(null);

        const nextMessages = appendIncomingMessages(
          messagesRef.current,
          response.data,
        );

        if (nextMessages === messagesRef.current) return;

        // Polling only appends newer messages, so scrolling to the bottom keeps
        // the newest activity visible when the chat updates in place.
        pendingScrollActionRef.current = { type: "bottom" };
        setMessages(nextMessages);
        setErrorMessage(null);
      } catch {
        if (!cancelled) {
          setErrorMessage("Failed to refresh chat.");
        }
      } finally {
        isPollingRef.current = false;
      }
    }

    const pollInterval = window.setInterval(() => {
      void pollForNewMessages();
    }, POLL_INTERVAL_MS);

    return () => {
      cancelled = true;
      window.clearInterval(pollInterval);
    };
  }, [queryData, isInitialError]);

  async function loadOlderMessages() {
    if (isLoadingOlder || !hasMore || !nextCursor) return;

    const scrollElement = scrollRef.current;
    const previousHeight = scrollElement?.scrollHeight ?? 0;

    setIsLoadingOlder(true);
    setErrorMessage(null);

    try {
      const response = await getMessages({
        before: nextCursor,
        limit: PAGE_SIZE,
      });
      const olderMessages = mapDescendingPageToRenderOrder(response.data);

      if (olderMessages.length > 0) {
        pendingScrollActionRef.current = {
          type: "preserve-prepend",
          previousHeight,
        };
        setMessages((previousMessages) => [
          ...olderMessages,
          ...previousMessages,
        ]);
      }

      setHasMore(response.meta.has_more);
      setNextCursor(response.meta.next_cursor);
    } catch {
      setErrorMessage("Failed to load older messages.");
    } finally {
      setIsLoadingOlder(false);
    }
  }

  async function handleSendText(text: string) {
    const trimmedText = text.trim();

    if (!trimmedText) return;

    const optimisticId = `optimistic-${Date.now()}-${crypto.randomUUID()}`;

    const optimisticMessage: ChatMessage = {
      uuid: optimisticId,
      author: "USER",
      text: trimmedText,
      status: "sending",
      createdAt: new Date().toISOString(),
    };

    pendingScrollActionRef.current = { type: "bottom" };

    setMessages((previousMessages) => [...previousMessages, optimisticMessage]);

    setIsSendingText(true);
    setErrorMessage(null);

    try {
      const response = await sendMessage({ message: trimmedText });

      const serverMessageId = response.message_id;

      const confirmedMessage: ChatMessage = {
        uuid: serverMessageId ? `server-${serverMessageId}` : optimisticId,
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
      setErrorMessage("Failed to send message.");

      setMessages((previousMessages) =>
        previousMessages.filter((message) => message.uuid !== optimisticId),
      );
    } finally {
      setIsSendingText(false);
    }
  }

  return {
    errorMessage,
    hasMore,
    isInitialError,
    isInitialLoading,
    isLoadingOlder,
    isSendingText,
    loadOlderMessages,
    messages,
    handleSendText,
    scrollRef,
  };
}
