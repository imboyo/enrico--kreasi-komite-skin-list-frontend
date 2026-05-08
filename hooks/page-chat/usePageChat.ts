"use client";

import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getMessages } from "backend-service";

import { useToast } from "components/provider/Toast";
import type { ChatMessage } from "types/chat.types";

import { PAGE_SIZE } from "./constants";
import { useDeferredScroll } from "./useDeferredScroll";
import { useHandleDeleteConversation } from "./useHandleDeleteConversation";
import { useHandleSendText } from "./useHandleSendText";
import { useLoadOlderMessages } from "./useLoadOlderMessages";
import { usePageChatPolling } from "./usePageChatPolling";
import { useSeedInitialMessages } from "./useSeedInitialMessages";

export function usePageChat() {
  const { showToast } = useToast();

  // Local state owns the thread after the first query resolves so optimistic
  // inserts, polling merges, and pagination can all be coordinated in one place.
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [isLoadingOlder, setIsLoadingOlder] = useState(false);
  const [isDeletingConversation, setIsDeletingConversation] = useState(false);
  const [isSendingText, setIsSendingText] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { scrollRef, scheduleScrollPreservePrepend, scheduleScrollToBottom } =
    useDeferredScroll(messages);

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
    // Polling and mutation flows manage freshness after the initial seed.
    refetchOnWindowFocus: false,
    retry: 1,
  });

  useSeedInitialMessages({
    initializedRef,
    messagesRef,
    queryData,
    scheduleScrollToBottom,
    setHasMore,
    setMessages,
    setNextCursor,
  });

  // Keep the ref current so async callbacks always read the latest message list.
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  usePageChatPolling({
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
  });

  const loadOlderMessages = useLoadOlderMessages({
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
  });

  const handleSendText = useHandleSendText({
    isDeletingConversation,
    scheduleScrollToBottom,
    setErrorMessage,
    setIsSendingText,
    setMessages,
  });

  const handleDeleteConversation = useHandleDeleteConversation({
    isDeletingConversation,
    messagesRef,
    scheduleScrollToBottom,
    setErrorMessage,
    setHasMore,
    setIsDeletingConversation,
    setMessages,
    setNextCursor,
    showToast,
  });

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
