"use client";

import { ChatInput } from "@/components/atomic/molecule/chat/ChatInput";
import { ChatTopbar } from "@/components/atomic/organism/topbar/ChatTopbar";
import { RightSection } from "@/client-side-page/app/chat/RightSection";
import { MessagesSection } from "client-side-page/app/chat/MessagesSection";
import { usePageChat } from "@/client-side-page/app/chat/usePageChat";
import { APP_URL } from "@/constant";

export function PageChat() {
  const {
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
  } = usePageChat();

  return (
    // Fill the viewport so the composer sticks to the bottom. AppTopbar is
    // suppressed on this route, so we own the full column height.
    <div className="mx-auto flex h-dvh min-h-0 max-w-125 flex-col bg-background">
      {/* Chat topbar section */}
      <ChatTopbar
        backHref={APP_URL.APP}
        title="Skin Committee"
        subtitle="Usually replies within an hour"
        rightSection={<RightSection />}
      />

      {/* Messages section */}
      <MessagesSection
        errorMessage={errorMessage}
        hasMore={hasMore}
        isInitialError={isInitialError}
        isInitialLoading={isInitialLoading}
        isLoadingOlder={isLoadingOlder}
        loadOlderMessages={loadOlderMessages}
        messages={messages}
        scrollRef={scrollRef}
      />

      {/* Composer section */}
      <ChatInput
        onSendText={handleSendText}
        disabled={isSendingText}
      />
    </div>
  );
}
