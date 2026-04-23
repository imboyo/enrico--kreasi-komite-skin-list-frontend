"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";

import { cn } from "@/util/cn";

export type ChatAuthor = "user" | "admin";
export type ChatMessageType = "text" | "image" | "file";
export type ChatMessageStatus = "sending" | "sent" | "delivered" | "read";

export interface ChatMessage {
  id: string;
  author: ChatAuthor;
  type: ChatMessageType;
  status?: ChatMessageStatus; // only relevant for user messages
  createdAt: string; // ISO
  // Text mode
  text?: string;
  // Image mode (either a URL or a local object URL for previews)
  imageUrl?: string;
  imageAlt?: string;
  // File mode
  fileUrl?: string;
  fileName?: string;
  fileSizeBytes?: number;
}

function formatBytes(bytes?: number) {
  if (!bytes && bytes !== 0) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatTime(iso: string) {
  try {
    const date = new Date(iso);
    const now = new Date();

    const time = date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
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
      const dateStr = date.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
      return `${dateStr}, ${time}`;
    }
  } catch {
    return "";
  }
}

interface ChatBubbleProps {
  message: ChatMessage;
}

export function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.author === "user";

  return (
    <div
      className={cn(
        "flex w-full flex-col gap-1",
        isUser ? "items-end" : "items-start",
      )}
    >
      <div
        className={cn(
          "max-w-[80%] overflow-hidden rounded-2xl text-sm shadow-[0_2px_6px_rgba(60,60,60,0.06)]",
          "animate-[chat-pop_0.3s_cubic-bezier(0.34,1.56,0.64,1)_both]",
          isUser
            ? "rounded-br-sm text-primary-foreground [background:linear-gradient(to_bottom,#0C5252,#2D6A6A)]"
            : "rounded-bl-sm bg-[#E1E3E4] text-foreground",
          // Tighten padding for image-only bubbles so the image fills the frame.
          message.type === "image" ? "p-1" : "px-3.5 py-2.5",
        )}
      >
        {message.type === "text" && (
          <p className="whitespace-pre-wrap wrap-break-word leading-relaxed">
            {message.text}
          </p>
        )}

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

        {message.type === "file" && (
          <a
            href={message.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex items-center gap-3 rounded-xl",
              isUser ? "text-primary-foreground" : "text-foreground",
            )}
          >
            <span
              className={cn(
                "flex size-9 shrink-0 items-center justify-center rounded-lg",
                isUser ? "bg-primary-foreground/15" : "bg-muted",
              )}
            >
              <Icon
                icon="material-symbols:description-outline-rounded"
                className="size-5"
              />
            </span>
            <span className="flex min-w-0 flex-col">
              <span className="truncate font-medium">{message.fileName}</span>
              <span
                className={cn(
                  "truncate text-xs",
                  isUser
                    ? "text-primary-foreground/80"
                    : "text-muted-foreground",
                )}
              >
                {formatBytes(message.fileSizeBytes)}
              </span>
            </span>
          </a>
        )}
      </div>

      {/* suppressHydrationWarning: locale-based time formatting differs between server and client */}
      <div className="flex items-center gap-1 px-1">
        <span className="text-[10px] text-muted-foreground" suppressHydrationWarning>
          {formatTime(message.createdAt)}
        </span>

        {/* Read status icons — only shown on outgoing (user) messages */}
        {isUser && message.status === "sending" && (
          <Icon icon="material-symbols:schedule-outline-rounded" className="size-3 text-muted-foreground" />
        )}
        {isUser && message.status === "sent" && (
          <Icon icon="material-symbols:check-rounded" className="size-3 text-muted-foreground" />
        )}
        {isUser && message.status === "delivered" && (
          <Icon icon="material-symbols:done-all-rounded" className="size-3 text-muted-foreground" />
        )}
        {isUser && message.status === "read" && (
          <Icon icon="material-symbols:done-all-rounded" className="size-3 text-primary" />
        )}
      </div>
    </div>
  );
}
