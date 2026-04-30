"use client";

import { Icon } from "@iconify/react";
import { useEffect, useRef } from "react";

import { ChatBubble } from "components/atomic/molecule/chat/ChatBubble";
import { ChatInput } from "components/atomic/molecule/chat/ChatInput";
import { ChatTopbar } from "components/atomic/organism/topbar/ChatTopbar";
import { APP_URL } from "constant";
import { useChatConversation } from "hooks/useChatConversation";
import type { AdminChatConversation } from "mock-backend/admin/chat/chats";

type AdminChatThreadProps = {
  conversation: AdminChatConversation;
};

export function AdminChatThread({ conversation }: AdminChatThreadProps) {
  const { messages, sendText, sendImage, sendFile } = useChatConversation(
    conversation.messages,
  );
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;
    element.scrollTop = element.scrollHeight;
  }, [messages.length]);

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-border/70 bg-background">
      <ChatTopbar
        backHref={APP_URL.ADMIN_CHATS}
        title={conversation.fullName}
        subtitle={conversation.lastSeenLabel}
        rightSection={
          <span className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Icon icon="material-symbols:admin-panel-settings-outline-rounded" />
          </span>
        }
      />

      {/* Section: Messages */}
      <div
        ref={scrollRef}
        className="min-h-0 flex-1 overflow-y-auto px-4 pb-30 pt-4"
      >
        <div className="flex flex-col gap-3 pb-4">
          {messages.map((message) => (
            <ChatBubble key={message.id} message={message} />
          ))}
        </div>
      </div>

      {/* Section: Fixed admin composer */}
      <div className="fixed bottom-0 left-1/2 z-20 w-full max-w-125 -translate-x-1/2 px-4">
        <ChatInput
          onSendText={sendText}
          onSendImage={sendImage}
          onSendFile={sendFile}
          placeholder={`Reply to ${conversation.fullName}`}
        />
      </div>
    </div>
  );
}
