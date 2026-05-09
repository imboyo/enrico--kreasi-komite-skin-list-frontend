"use client";

import type { RefObject } from "react";

import { ChatBubble } from "components/atomic/molecule/chat/ChatBubble";
import { MessagesSkeleton } from "@/components/atomic/molecule/MessageSkeleton";
import { ChatMessage } from "@/types/chat.types";

interface MessagesSectionProps {
  errorMessage: string | null;
  hasMore: boolean;
  isInitialError: boolean;
  isInitialLoading: boolean;
  isLoadingOlder: boolean;
  loadOlderMessages: () => Promise<void>;
  messages: ChatMessage[];
  scrollRef: RefObject<HTMLDivElement | null>;
}

export function MessagesSection({
  errorMessage,
  hasMore,
  isInitialError,
  isInitialLoading,
  isLoadingOlder,
  loadOlderMessages,
  messages,
  scrollRef,
}: MessagesSectionProps) {
  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4">
      {/* Load more older messages button — only shown when more history exists */}
      {!isInitialLoading && hasMore && (
        <div className="mb-3 flex justify-center">
          <button
            onClick={() => void loadOlderMessages()}
            disabled={isLoadingOlder}
            className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground shadow-sm transition-colors hover:bg-muted disabled:opacity-50"
          >
            {isLoadingOlder ? "Memuat..." : "Muat pesan sebelumnya"}
          </button>
        </div>
      )}

      {(errorMessage || isInitialError) && (
        <p className="pb-3 text-center text-xs text-destructive">
          {errorMessage ?? "Riwayat chat gagal dimuat."}
        </p>
      )}

      {/* Loading skeleton section */}
      {isInitialLoading ? (
        <MessagesSkeleton />
      ) : (
        <div className="flex flex-col gap-3">
          {messages.map((message) => (
            <ChatBubble key={message.uuid} message={message} selfRole="USER" />
          ))}
        </div>
      )}
    </div>
  );
}
