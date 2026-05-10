"use client";

import { Icon } from "@iconify/react";

import { ChatBubble } from "components/atomic/molecule/chat/ChatBubble";
import { ChatInput } from "components/atomic/molecule/chat/ChatInput";
import { ChatTopbar } from "components/atomic/organism/topbar/ChatTopbar";
import { MessagesSkeleton } from "components/atomic/molecule/MessageSkeleton";
import { APP_URL } from "constant";

import type { AdminSkinChatThread } from "backend-service/admin/skin-chat";

import { useAdminChatDetail } from "./useAdminChatDetail";

type AdminChatThreadProps = {
  thread: AdminSkinChatThread;
};

export function AdminChatThread({ thread }: AdminChatThreadProps) {
  const {
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
  } = useAdminChatDetail(thread.uuid);

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-border/70 bg-background">
      <ChatTopbar
        backHref={APP_URL.ADMIN_CHATS}
        title={thread.user.full_name}
        subtitle={thread.user.email}
        rightSection={
          <span className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Icon icon="material-symbols:admin-panel-settings-outline-rounded" />
          </span>
        }
      />

      {/* Section: Messages */}
      <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto px-4 pt-4">
        {/* Load more older messages button */}
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

        {/* Error message section */}
        {(errorMessage || isInitialError) && (
          <p className="pb-3 text-center text-xs text-destructive">
            {errorMessage ?? "Riwayat chat gagal dimuat."}
          </p>
        )}

        {/* Messages content section */}
        {isInitialLoading ? (
          <MessagesSkeleton />
        ) : (
          <div className="flex flex-col gap-3 pb-4">
            {messages.map((message) => (
              <ChatBubble
                key={message.uuid}
                message={message}
                selfRole="ADMIN"
              />
            ))}
          </div>
        )}
      </div>

      {/* Section: Fixed admin composer */}
      <div className="shrink-0">
        <ChatInput
          onSendText={handleSendText}
          disabled={isSendingText}
          placeholder={`Balas ke ${thread.user.full_name}`}
        />
      </div>
    </div>
  );
}
