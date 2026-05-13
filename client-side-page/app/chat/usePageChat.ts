"use client";

import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { cleanMessages, getMessages, sendMessage } from "backend-service/index";

import { useToast } from "components/provider/Toast";
import type { ChatMessage } from "types/chat.types";

import { mapDescendingPageToRenderOrder } from "libs/util/chat/map-descending-page-to-render-order";
import { useDeferredScroll } from "@/hooks/useDeferredScroll";
import { CHAT_REFRESH_INTERVAL_MS, CHAT_PAGE_SIZE } from "config";

export function usePageChat() {
  const { showToast } = useToast();

  // Local state owns the thread after the first query resolves so optimistic
  // inserts, refresh replacements, and pagination can all be coordinated in one place.
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [isLoadingOlder, setIsLoadingOlder] = useState(false);
  const [isSendingText, setIsSendingText] = useState(false);
  const [isDeletingConversation, setIsDeletingConversation] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { scrollRef, scheduleScrollPreservePrepend, scheduleScrollToBottom } =
    useDeferredScroll(messages);

  const isFirstLoadRef = useRef(true);

  const {
    data: queryData,
    isLoading: isInitialLoading,
    isError: isInitialError,
  } = useQuery({
    queryKey: ["skin-chat-messages"],
    queryFn: () => getMessages({ limit: CHAT_PAGE_SIZE }),
    refetchInterval: CHAT_REFRESH_INTERVAL_MS,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  // Replace the entire message list whenever the query refetches (auto-refresh or initial load).
  useEffect(() => {
    if (!queryData) return;

    const freshMessages = mapDescendingPageToRenderOrder(queryData.data);
    let isCurrentQuery = true;

    // Defer the local mirror update so the effect does not synchronously cascade
    // renders while React Query publishes fresh server state.
    queueMicrotask(() => {
      if (!isCurrentQuery) return;

      setMessages(freshMessages);
      setHasMore(queryData.meta.has_more);
      setNextCursor(queryData.meta.next_cursor);
      setErrorMessage(null);

      if (isFirstLoadRef.current) {
        isFirstLoadRef.current = false;
        scheduleScrollToBottom();
      }
    });

    return () => {
      isCurrentQuery = false;
    };
  }, [queryData, scheduleScrollToBottom]);

  // Load older messages (pagination backward).
  async function loadOlderMessages() {
    if (isLoadingOlder || !hasMore || !nextCursor) return;

    // Capture the current height so we can restore the viewport after the prepend.
    const previousHeight = scrollRef.current?.scrollHeight ?? 0;

    setIsLoadingOlder(true);
    setErrorMessage(null);

    try {
      const response = await getMessages({
        before: nextCursor,
        limit: CHAT_PAGE_SIZE,
      });
      const olderMessages = mapDescendingPageToRenderOrder(response.data);

      if (olderMessages.length > 0) {
        scheduleScrollPreservePrepend(previousHeight);
        setMessages((prev) => [...olderMessages, ...prev]);
      }

      setHasMore(response.meta.has_more);
      setNextCursor(response.meta.next_cursor);
    } catch {
      setErrorMessage("Pesan sebelumnya gagal dimuat.");
    } finally {
      setIsLoadingOlder(false);
    }
  }

  // Send a text message as user.
  async function handleSendText(text: string) {
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
    setMessages((prev) => [...prev, optimisticMessage]);
    setIsSendingText(true);
    setErrorMessage(null);

    try {
      const response = await sendMessage({ message: trimmedText });
      const confirmedMessage: ChatMessage = {
        uuid: response.message_id
          ? `server-${response.message_id}`
          : optimisticId,
        author: "USER",
        text: response.message ?? trimmedText,
        status: "sent",
        createdAt: response.created_at ?? optimisticMessage.createdAt,
      };

      setMessages((prev) =>
        prev.map((m) => (m.uuid === optimisticId ? confirmedMessage : m)),
      );
    } catch {
      setErrorMessage("Pesan gagal dikirim.");
      // Remove the optimistic row when the request fails so the thread stays honest.
      setMessages((prev) => prev.filter((m) => m.uuid !== optimisticId));
    } finally {
      setIsSendingText(false);
    }
  }

  // Delete the entire conversation.
  async function handleDeleteConversation() {
    if (isDeletingConversation) return false;

    setIsDeletingConversation(true);
    setErrorMessage(null);

    try {
      await cleanMessages();

      // Reset the local thread immediately so the UI matches the cleared backend state.
      setMessages([]);
      setHasMore(false);
      setNextCursor(null);
      scheduleScrollToBottom();

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
  }

  return {
    errorMessage,
    handleDeleteConversation,
    handleSendText,
    hasMore,
    isDeletingConversation,
    isInitialError,
    isInitialLoading,
    isLoadingOlder,
    isSendingText,
    loadOlderMessages,
    messages,
    scrollRef,
  };
}
