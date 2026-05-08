"use client";

import { Icon } from "@iconify/react";
import { cn } from "libs/util/cn";
import { formatTimeChat } from "libs/util/chat/format-time-chat";
import { ChatMessage } from "@/types/chat.types";

interface ChatBubbleProps {
  message: ChatMessage;
  // Which role is "self" (right-aligned, green bubble).
  // Defaults to "user" for the user-facing page; pass "admin" for the admin page.
  selfRole?: "USER" | "ADMIN";
}

export function ChatBubble({ message, selfRole = "USER" }: ChatBubbleProps) {
  const isSelf = message.author === selfRole;

  return (
    <div
      className={cn(
        "flex w-full flex-col gap-1",
        isSelf ? "items-end" : "items-start",
      )}
    >
      <div
        className={cn(
          "max-w-[80%] overflow-hidden px-3.5 py-2.5 rounded-2xl text-sm shadow-[0_2px_6px_rgba(60,60,60,0.06)]",
          "animate-[chat-pop_0.3s_cubic-bezier(0.34,1.56,0.64,1)_both]",
          isSelf
            ? "rounded-br-sm text-white [background:linear-gradient(to_bottom,#294936,#3a6b50)]"
            : "rounded-bl-sm bg-[#E1E3E4] text-foreground",
        )}
      >
        <p className="whitespace-pre-wrap wrap-break-word leading-relaxed">
          {message.text}
        </p>
      </div>

      {/* suppressHydrationWarning: locale-based time formatting differs between server and client */}
      <div className="flex items-center gap-1 px-1">
        <span
          className="text-[10px] text-muted-foreground"
          suppressHydrationWarning
        >
          {formatTimeChat(message.createdAt)}
        </span>

        {/* Read status icons — only shown on outgoing (self) messages */}
        {isSelf && message.status === "sending" && (
          <Icon
            icon="material-symbols:schedule-outline-rounded"
            className="size-3 text-muted-foreground"
          />
        )}
        {isSelf && message.status === "sent" && (
          <Icon
            icon="material-symbols:check-rounded"
            className="size-3 text-muted-foreground"
          />
        )}
      </div>
    </div>
  );
}
