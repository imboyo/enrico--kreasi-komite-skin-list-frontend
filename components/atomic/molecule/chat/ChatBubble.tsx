"use client";

import { useSyncExternalStore } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { cn } from "libs/util/cn";
import { formatTimeChat } from "libs/util/chat/format-time-chat";
import { ChatMessage } from "@/types/chat.types";
import type { AdminChatMessage } from "@/mock-backend/admin/chat/chats";
import type { AdminSkinChatMessage } from "backend-service/admin/skin-chat";

type ChatBubbleMessage = ChatMessage | AdminChatMessage | AdminSkinChatMessage;

interface ChatBubbleProps {
  message: ChatBubbleMessage;
  // Which role is "self" (right-aligned, green bubble).
  // Defaults to "USER" for the user-facing page; pass "ADMIN" for the admin page.
  selfRole?: "USER" | "ADMIN" | "user" | "admin";
}

function isSkinChatMessage(
  message: ChatBubbleMessage,
): message is AdminSkinChatMessage {
  return "sender_role" in message;
}

function renderMessageContent(message: ChatBubbleMessage) {
  if (isSkinChatMessage(message)) {
    return (
      <p className="whitespace-pre-wrap wrap-break-word leading-relaxed">
        {message.message}
      </p>
    );
  }

  if ("type" in message && message.type === "image" && message.imageUrl) {
    return (
      <div className="flex flex-col gap-2">
        {/* Local object URLs and arbitrary uploaded files are not a good fit for next/image here. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={message.imageUrl}
          alt={message.imageAlt ?? "Chat attachment"}
          className="max-h-60 w-full rounded-xl object-cover"
        />
        {message.text ? (
          <p className="whitespace-pre-wrap wrap-break-word leading-relaxed">
            {message.text}
          </p>
        ) : null}
      </div>
    );
  }

  if ("type" in message && message.type === "file" && message.fileUrl) {
    return (
      <div className="flex flex-col gap-2">
        <Link
          href={message.fileUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-black/10 px-3 py-2 text-sm font-medium underline-offset-4 hover:underline"
        >
          <Icon icon="material-symbols:attach-file-rounded" className="size-4" />
          <span className="truncate">{message.fileName ?? "Attachment"}</span>
        </Link>
        {message.text ? (
          <p className="whitespace-pre-wrap wrap-break-word leading-relaxed">
            {message.text}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <p className="whitespace-pre-wrap wrap-break-word leading-relaxed">
      {message.text}
    </p>
  );
}

export function ChatBubble({ message, selfRole = "USER" }: ChatBubbleProps) {
  const isSelf = isSkinChatMessage(message)
    ? message.sender_role.toLowerCase() === selfRole.toLowerCase()
    : message.author.toLowerCase() === selfRole.toLowerCase();

  const createdAt = isSkinChatMessage(message)
    ? message.created_at
    : message.createdAt;

  // Defer time formatting to client-only so toLocaleTimeString respects the
  // browser's timezone instead of the server's during SSR.
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const formattedTime = isClient ? formatTimeChat(createdAt) : "";

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
        {renderMessageContent(message)}
      </div>

      <div className="flex items-center gap-1 px-1">
        <span className="text-[10px] text-muted-foreground">
          {formattedTime}
        </span>

        {/* Read status icons — only shown on outgoing (self) messages and only for non-skin-chat messages */}
        {isSelf && !isSkinChatMessage(message) && message.status === "sending" && (
          <Icon
            icon="material-symbols:schedule-outline-rounded"
            className="size-3 text-muted-foreground"
          />
        )}
        {isSelf &&
          !isSkinChatMessage(message) &&
          (message.status === "sent" ||
            message.status === "delivered" ||
            message.status === "read") && (
          <Icon
            icon="material-symbols:check-rounded"
            className="size-3 text-muted-foreground"
          />
        )}
      </div>
    </div>
  );
}
