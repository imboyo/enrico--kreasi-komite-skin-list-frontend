"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";

import { cn } from "libs/util/cn";

// Local UI representation of a chat message — decoupled from the backend DTO.
export type ChatMessage = {
  uuid: string;
  author: "USER" | "ADMIN";
  type: "text" | "image";
  text?: string;
  imageUrl?: string;
  imageAlt?: string;
  /** Present only on outgoing (USER) messages to track delivery state. */
  status?: "sending" | "sent" | "delivered" | "read";
  createdAt: string;
};

function formatTime(iso: string) {
  try {
    const date = new Date(iso);
    const now = new Date();

    const time = date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    );
    const startOfYesterday = new Date(startOfToday.getTime() - 86400000);
    // Within last 7 days (excluding today and yesterday)
    const startOfLastWeek = new Date(startOfToday.getTime() - 6 * 86400000);

    if (date >= startOfToday) {
      // Today: show time only
      return time;
    } else if (date >= startOfYesterday) {
      // Yesterday
      return `Kemarin, ${time}`;
    } else if (date >= startOfLastWeek) {
      // Within last 7 days: show weekday name
      const weekday = date.toLocaleDateString("id-ID", { weekday: "long" });
      return `${weekday}, ${time}`;
    } else {
      // Older: show full date
      const dateStr = date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
      return `${dateStr}, ${time}`;
    }
  } catch {
    return "";
  }
}

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
          "max-w-[80%] overflow-hidden rounded-2xl text-sm shadow-[0_2px_6px_rgba(60,60,60,0.06)]",
          "animate-[chat-pop_0.3s_cubic-bezier(0.34,1.56,0.64,1)_both]",
          isSelf
            ? "rounded-br-sm text-white [background:linear-gradient(to_bottom,#294936,#3a6b50)]"
            : "rounded-bl-sm bg-[#E1E3E4] text-foreground",
          // Tighten padding for image-only bubbles so the image fills the frame.
          message.type === "image" ? "p-1" : "px-3.5 py-2.5",
        )}
      >
        {/* Text message */}
        {message.type === "text" && (
          <p className="whitespace-pre-wrap wrap-break-word leading-relaxed">
            {message.text}
          </p>
        )}

        {/* Image message */}
        {message.type === "image" && message.imageUrl && (
          <div className="relative h-60 w-60 max-w-full overflow-hidden rounded-xl">
            <Image
              src={message.imageUrl}
              alt={message.imageAlt ?? "Attached image"}
              fill
              sizes="240px"
              className="object-cover"
              unoptimized
            />
          </div>
        )}
      </div>

      {/* suppressHydrationWarning: locale-based time formatting differs between server and client */}
      <div className="flex items-center gap-1 px-1">
        <span
          className="text-[10px] text-muted-foreground"
          suppressHydrationWarning
        >
          {formatTime(message.createdAt)}
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
        {isSelf && message.status === "delivered" && (
          <Icon
            icon="material-symbols:done-all-rounded"
            className="size-3 text-muted-foreground"
          />
        )}
        {isSelf && message.status === "read" && (
          <Icon
            icon="material-symbols:done-all-rounded"
            className="size-3 text-primary"
          />
        )}
      </div>
    </div>
  );
}
