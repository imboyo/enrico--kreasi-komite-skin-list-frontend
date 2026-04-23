"use client";

import { useEffect, useRef } from "react";
import { Icon } from "@iconify/react";

import { Button } from "@/components/atomic/atom/Button";
import {
  ChatBubble,
  type ChatMessage,
} from "@/components/atomic/molecule/chat/ChatBubble";
import { ChatInput } from "@/components/atomic/molecule/chat/ChatInput";
import { ChatTopbar } from "@/components/atomic/organism/topbar/ChatTopbar";
import { useChatConversation } from "@/hooks/useChatConversation";
import { APP_URL } from "@/constant";

// Helper to build an ISO date relative to now.
function daysAgo(days: number, hour = 10, minute = 0) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
}

// Seed messages covering every relative-time label: today, yesterday, this week, older.
const SEED_MESSAGES: ChatMessage[] = [
  // Older (> 7 days) — shows full date
  {
    id: "seed-old-1",
    author: "admin",
    type: "text",
    text: "Hi! Welcome to Skin Committee. How can we help with your skincare routine today?",
    createdAt: daysAgo(10, 9, 0),
  },
  {
    id: "seed-old-2",
    author: "user",
    type: "text",
    text: "I've been struggling with dry skin lately.",
    status: "read",
    createdAt: daysAgo(10, 9, 5),
  },
  // This week (2–6 days ago) — shows weekday name
  {
    id: "seed-week-1",
    author: "admin",
    type: "text",
    text: "We recommend adding a hyaluronic acid serum to your routine.",
    createdAt: daysAgo(4, 14, 30),
  },
  {
    id: "seed-week-2",
    author: "user",
    type: "text",
    text: "Which brand do you suggest?",
    status: "read",
    createdAt: daysAgo(4, 14, 45),
  },
  // Yesterday — shows "Kemarin"
  {
    id: "seed-yest-1",
    author: "admin",
    type: "text",
    text: "We suggest The Ordinary HA 2% + B5 as a great starter.",
    createdAt: daysAgo(1, 11, 20),
  },
  {
    id: "seed-yest-2",
    author: "user",
    type: "text",
    text: "Got it, I'll try that. Thank you!",
    status: "delivered",
    createdAt: daysAgo(1, 11, 35),
  },
  // Today — shows time only
  {
    id: "seed-today-1",
    author: "admin",
    type: "text",
    text: "Good morning! How's your skin feeling after trying the serum?",
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "seed-today-2",
    author: "user",
    type: "text",
    text: "Much better! The dryness has noticeably reduced.",
    status: "sent",
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
];

export function PageChat() {
  const { messages, sendText, sendImage, sendFile } =
    useChatConversation(SEED_MESSAGES);

  // Auto-scroll to the newest message whenever the list grows.
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;
    element.scrollTop = element.scrollHeight;
  }, [messages.length]);

  return (
    // Fill the viewport so the composer sticks to the bottom. AppTopbar is
    // suppressed on this route, so we own the full column height.
    <div className="flex h-dvh min-h-0 flex-col bg-background">
      {/* Chat topbar section */}
      <ChatTopbar
        backHref={APP_URL.APP}
        title="Skin Committee"
        subtitle="Usually replies within an hour"
        rightSection={
          <Button
            variant="ghost"
            size="md"
            iconOnly
            aria-label="Conversation options"
            className="rounded-full"
          >
            <Icon icon="material-symbols:more-vert" />
          </Button>
        }
      />

      {/* Messages section */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-4"
      >
        <div className="flex flex-col gap-3">
          {messages.map((message) => (
            <ChatBubble key={message.id} message={message} />
          ))}
        </div>
      </div>

      {/* Composer section */}
      <ChatInput
        onSendText={sendText}
        onSendImage={sendImage}
        onSendFile={sendFile}
      />
    </div>
  );
}
