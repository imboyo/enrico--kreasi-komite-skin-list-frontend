"use client";

import { useCallback, useState } from "react";

import type {
  ChatMessage,
} from "@/components/atomic/molecule/chat/ChatBubble";

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * Manages a single admin conversation for the current user.
 * Holds the message list locally and exposes senders for text / image / file.
 * Replace with an API-backed implementation when the backend is ready.
 */
export function useChatConversation(initialMessages: ChatMessage[] = []) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);

  const append = useCallback((message: ChatMessage) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  const sendText = useCallback(
    (text: string) => {
      append({
        id: createId(),
        author: "user",
        type: "text",
        text,
        createdAt: new Date().toISOString(),
      });
    },
    [append],
  );

  const sendImage = useCallback(
    (file: File) => {
      // TODO: upload file to API and replace imageUrl with the returned URL.
      // Local object URL lets us preview instantly; swap for the uploaded URL after the API call.
      const imageUrl = URL.createObjectURL(file);
      append({
        id: createId(),
        author: "user",
        type: "image",
        imageUrl,
        imageAlt: file.name,
        createdAt: new Date().toISOString(),
      });
    },
    [append],
  );

  const sendFile = useCallback(
    (file: File) => {
      // TODO: upload file to API and replace fileUrl with the returned URL.
      const fileUrl = URL.createObjectURL(file);
      append({
        id: createId(),
        author: "user",
        type: "file",
        fileUrl,
        fileName: file.name,
        fileSizeBytes: file.size,
        createdAt: new Date().toISOString(),
      });
    },
    [append],
  );

  return { messages, sendText, sendImage, sendFile };
}
