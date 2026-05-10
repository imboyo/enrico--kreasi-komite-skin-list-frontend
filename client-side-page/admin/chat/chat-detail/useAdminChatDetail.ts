"use client";

import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getAdminSkinChatThreadMessages } from "backend-service/admin/skin-chat";
import { replyAdminSkinChatThread } from "backend-service/admin/skin-chat";

import type { AdminSkinChatMessage } from "backend-service/admin/skin-chat";
import { useDeferredScroll } from "@/hooks/useDeferredScroll";
import { CHAT_PAGE_SIZE, CHAT_REFRESH_INTERVAL_MS } from "config";

export function useAdminChatDetail(threadUuid: string) {
  const [messages, setMessages] = useState<AdminSkinChatMessage[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [isLoadingOlder, setIsLoadingOlder] = useState(false);
  const [isSendingText, setIsSendingText] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { scrollRef, scheduleScrollPreservePrepend, scheduleScrollToBottom } =
    useDeferredScroll(messages);

  const isFirstLoadRef = useRef(true);

  const {
    data: queryData,
    isLoading: isInitialLoading,
    isError: isInitialError,
  } = useQuery({
    queryKey: ["admin-skin-chat-messages", threadUuid],
    queryFn: () =>
      getAdminSkinChatThreadMessages(threadUuid, { limit: CHAT_PAGE_SIZE }),
    refetchInterval: CHAT_REFRESH_INTERVAL_MS,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  // Replace the entire message list whenever the query refetches (auto-refresh or initial load).
  useEffect(() => {
    if (!queryData) return;

    const freshMessages = [...queryData.data].reverse();

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMessages(freshMessages);
    setHasMore(queryData.meta.has_more);
    setNextCursor(queryData.meta.next_cursor);
    setErrorMessage(null);

    if (isFirstLoadRef.current) {
      isFirstLoadRef.current = false;
      scheduleScrollToBottom();
    }
  }, [queryData, scheduleScrollToBottom]);

  // Load older messages (pagination backward).
  async function loadOlderMessages() {
    if (isLoadingOlder || !hasMore || !nextCursor) return;

    const previousHeight = scrollRef.current?.scrollHeight ?? 0;

    setIsLoadingOlder(true);
    setErrorMessage(null);

    try {
      const response = await getAdminSkinChatThreadMessages(threadUuid, {
        before: nextCursor,
        limit: CHAT_PAGE_SIZE,
      });

      const olderMessages = [...response.data].reverse();

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

  // Send a text reply as admin.
  async function handleSendText(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;

    const optimisticId = `optimistic-${Date.now()}-${crypto.randomUUID()}`;
    const optimisticMessage: AdminSkinChatMessage = {
      uuid: optimisticId,
      message: trimmed,
      created_at: new Date().toISOString(),
      sender_role: "ADMIN",
    };

    scheduleScrollToBottom();
    setMessages((prev) => [...prev, optimisticMessage]);
    setIsSendingText(true);
    setErrorMessage(null);

    try {
      const response = await replyAdminSkinChatThread(threadUuid, {
        message: trimmed,
      });

      const confirmedMessage: AdminSkinChatMessage = {
        uuid: response.message_id,
        message: response.message,
        created_at: response.created_at,
        sender_role: "ADMIN",
        thread_id: response.thread_id,
      };

      setMessages((prev) =>
        prev.map((m) => (m.uuid === optimisticId ? confirmedMessage : m)),
      );
    } catch {
      setErrorMessage("Pesan gagal dikirim.");
      setMessages((prev) => prev.filter((m) => m.uuid !== optimisticId));
    } finally {
      setIsSendingText(false);
    }
  }

  return {
    errorMessage,
    handleSendText,
    hasMore,
    isInitialError,
    isInitialLoading,
    isLoadingOlder,
    isSendingText,
    loadOlderMessages,
    messages,
    scrollRef,
  };
}
