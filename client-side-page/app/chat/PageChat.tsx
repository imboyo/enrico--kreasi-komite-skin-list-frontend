"use client";

import { ChatInput } from "@/components/atomic/molecule/chat/ChatInput";
import { ChatTopbar } from "@/components/atomic/organism/topbar/ChatTopbar";
import { RightSection } from "@/client-side-page/app/chat/RightSection";
import { MessagesSection } from "client-side-page/app/chat/MessagesSection";
import { usePageChat } from "client-side-page/app/chat/usePageChat";
import { APP_URL } from "@/constant";
import { Icon } from "@iconify/react";

const CHAT_SUPPORT_POINTS = [
  "Analisa kondisi kulit",
  "Rekomendasi produk",
  "Panduan pemakaian",
];

export function PageChat() {
  const {
    errorMessage,
    handleDeleteConversation,
    hasMore,
    isInitialError,
    isInitialLoading,
    isDeletingConversation,
    isLoadingOlder,
    isSendingText,
    loadOlderMessages,
    messages,
    handleSendText,
    scrollRef,
  } = usePageChat();

  return (
    // AppTopbar is suppressed on this route, so this shell owns the available viewport height.
    <section className="mx-auto grid h-[calc(100dvh-2rem)] min-h-0 w-full max-w-7xl grid-cols-1 overflow-hidden rounded-lg bg-card shadow-[0_24px_80px_rgba(31,41,55,0.16)] lg:grid-cols-[minmax(18rem,1fr)_minmax(30rem,42rem)]">
      {/* Desktop support context section */}
      <aside className="hidden min-h-0 flex-col justify-between overflow-hidden border-r border-border/70 bg-[#f6f3ee] px-8 py-8 lg:flex">
        <div className="space-y-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent text-accent-foreground shadow-sm">
            <Icon
              icon="material-symbols:chat-bubble-outline-rounded"
              className="size-6"
            />
          </div>

          <div className="max-w-120 space-y-3">
            <p className="text-sm font-semibold uppercase text-secondary">
              Konsultasi Chat
            </p>
            <h1 className="text-4xl font-semibold leading-tight text-foreground">
              Tanya Komite Skin dengan ruang baca yang lebih lega.
            </h1>
            <p className="text-base leading-7 text-muted-foreground">
              Kirim pertanyaan seputar kondisi kulit, rutinitas, dan produk yang
              ingin kamu gunakan.
            </p>
          </div>

          <div className="grid max-w-150 gap-3">
            {CHAT_SUPPORT_POINTS.map((point) => (
              <div
                key={point}
                className="flex items-center gap-3 rounded-lg border border-border/70 bg-card/85 px-4 py-3 text-sm font-medium text-foreground shadow-sm"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                  <Icon
                    icon="material-symbols:check-rounded"
                    className="size-4"
                  />
                </span>
                {point}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-border/70 bg-background/80 p-5">
          <p className="text-sm font-semibold text-foreground">
            Estimasi balasan
          </p>
          <p className="mt-1 text-2xl font-semibold text-accent-foreground">
            1 jam
          </p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Ceritakan detail keluhan dan produk yang sedang dipakai agar jawaban
            lebih tepat.
          </p>
        </div>
      </aside>

      {/* Chat conversation section */}
      <div className="flex min-h-0 min-w-0 flex-col bg-background lg:border-l lg:border-white/50">
        {/* Chat topbar section */}
        <ChatTopbar
          backHref={APP_URL.APP}
          title="Komite Skin"
          subtitle="Biasanya membalas dalam satu jam"
          rightSection={
            <RightSection
              isDeletingConversation={isDeletingConversation}
              onDeleteConversation={handleDeleteConversation}
            />
          }
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
          disabled={isSendingText || isDeletingConversation}
        />
      </div>
    </section>
  );
}
