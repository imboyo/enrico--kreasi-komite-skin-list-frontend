import { useMemo } from "react";

import type { AdminChatConversation } from "@/mock-backend/admin/chat/chats";

type UseVisibleConversationsParams = {
  conversations: AdminChatConversation[];
  searchValue: string;
};

export function useVisibleConversations({
  conversations,
  searchValue,
}: UseVisibleConversationsParams) {
  return useMemo(() => {
    const normalizedSearch = searchValue.trim().toLowerCase();

    if (!normalizedSearch) return conversations;

    // Admin chat search is intentionally scoped to identity fields so message
    // content does not unexpectedly hide or reveal conversations.
    return conversations.filter((conversation) => {
      return (
        conversation.fullName.toLowerCase().includes(normalizedSearch) ||
        conversation.email.toLowerCase().includes(normalizedSearch)
      );
    });
  }, [conversations, searchValue]);
}

