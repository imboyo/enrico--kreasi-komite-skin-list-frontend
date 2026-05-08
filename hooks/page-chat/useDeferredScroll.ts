"use client";

import { useCallback, useLayoutEffect, useRef } from "react";

import type { ChatMessage } from "types/chat.types";

type PendingScrollAction =
  | { type: "bottom" }
  | { type: "preserve-prepend"; previousHeight: number }
  | null;

export function useDeferredScroll(messages: ChatMessage[]) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const pendingScrollActionRef = useRef<PendingScrollAction>(null);

  useLayoutEffect(() => {
    const container = scrollRef.current;
    const pendingScrollAction = pendingScrollActionRef.current;
    if (!container || !pendingScrollAction) return;

    if (pendingScrollAction.type === "preserve-prepend") {
      // Restore the user's previous viewport after prepending older rows.
      container.scrollTop = container.scrollHeight - pendingScrollAction.previousHeight;
    } else {
      // New messages should always land the user at the bottom of the thread.
      container.scrollTop = container.scrollHeight;
    }

    pendingScrollActionRef.current = null;
  }, [messages]);

  const scheduleScrollToBottom = useCallback(() => {
    pendingScrollActionRef.current = { type: "bottom" };
  }, []);

  const scheduleScrollPreservePrepend = useCallback((previousHeight: number) => {
    pendingScrollActionRef.current = { type: "preserve-prepend", previousHeight };
  }, []);

  return {
    scrollRef,
    scheduleScrollPreservePrepend,
    scheduleScrollToBottom,
  };
}
