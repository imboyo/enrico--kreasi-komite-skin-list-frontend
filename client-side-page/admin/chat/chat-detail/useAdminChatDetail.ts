"use client";

import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getAdminSkinChatThreadMessages } from "backend-service/admin/skin-chat";
import { replyAdminSkinChatThread } from "backend-service/admin/skin-chat";

import type { AdminSkinChatMessage } from "backend-service/admin/skin-chat";

import { useDeferredScroll } from "hooks/chat/page-chat/useDeferredScroll";

const PAGE_SIZE = 20;
const POLL_INTERVAL_MS = 45_000;

export function useAdminChatDetail(threadUuid: string) {
  const [messages, setMessages] = useState<AdminSkinChatMessage[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [isLoadingOlder, setIsLoadingOlder] = useState(false);
  const [isSendingText, setIsSendingText] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { scrollRef, scheduleScrollPreservePrepend, scheduleScrollToBottom } =
    useDeferredScroll(messages);

  const initializedRef = useRef(false);
  const messagesRef = useRef<AdminSkinChatMessage[]>([]);
  const isPollingRef = useRef(false);

  const {
    data: queryData,
    isLoading: isInitialLoading,
    isError: isInitialError,
  } = useQuery({
    queryKey: ["admin-skin-chat-messages", threadUuid],
    queryFn: () =>
      getAdminSkinChatThreadMessages(threadUuid, { limit: PAGE_SIZE }),
    refetchOnWindowFocus: false,
    retry: 1,
  });

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  // Seed initial messages from the first query.
  useEffect(() => {
    if (!queryData || initializedRef.current) return;

    const seededMessages = [...queryData.data].reverse();

    initializedRef.current = true;
    messagesRef.current = seededMessages;
    scheduleScrollToBottom();
    setMessages(seededMessages);
    setHasMore(queryData.meta.has_more);
    setNextCursor(queryData.meta.next_cursor);
  }, [queryData, scheduleScrollToBottom]);

  // Poll for new incoming messages (from the user side).
  useEffect(() => {
    if (!initializedRef.current || isInitialError) return;

    let isCancelled = false;

    async function pollForNewMessages() {
      if (isPollingRef.current) return;
      isPollingRef.current = true;

      try {
        // Fetch the latest page to check for new messages from the user.
        const response = await getAdminSkinChatThreadMessages(threadUuid, {
          limit: PAGE_SIZE,
        });
        if (isCancelled) return;

        setErrorMessage(null);

        const knownIds = new Set(messagesRef.current.map((m) => m.id));
        const newMessages = response.data
          .filter((m) => !knownIds.has(m.id))
          .reverse();

        if (newMessages.length === 0) return;

        scheduleScrollToBottom();
        const merged = [...messagesRef.current, ...newMessages];
        messagesRef.current = merged;
        setMessages(merged);
      } catch {
        if (!isCancelled) setErrorMessage("Chat gagal diperbarui.");
      } finally {
        isPollingRef.current = false;
      }
    }

    const intervalId = window.setInterval(
      () => void pollForNewMessages(),
      POLL_INTERVAL_MS,
    );

    return () => {
      isCancelled = true;
      window.clearInterval(intervalId);
    };
  }, [initializedRef, isInitialError, isPollingRef, messagesRef, scheduleScrollToBottom, setErrorMessage, threadUuid]);

  // Load older messages (pagination backward).
  async function loadOlderMessages() {
    if (isLoadingOlder || !hasMore || !nextCursor) return;

    const previousHeight = scrollRef.current?.scrollHeight ?? 0;

    setIsLoadingOlder(true);
    setErrorMessage(null);

    try {
      const response = await getAdminSkinChatThreadMessages(threadUuid, {
        before: nextCursor,
        limit: PAGE_SIZE,
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
      id: optimisticId,
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
        id: response.message_id,
        message: response.message,
        created_at: response.created_at,
        sender_role: "ADMIN",
        thread_id: response.thread_id,
      };

      setMessages((prev) =>
        prev.map((m) => (m.id === optimisticId ? confirmedMessage : m)),
      );
    } catch {
      setErrorMessage("Pesan gagal dikirim.");
      setMessages((prev) => prev.filter((m) => m.id !== optimisticId));
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
