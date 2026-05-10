import { useMemo } from "react";

import type { AdminSkinChatThread } from "backend-service/admin/skin-chat/index";

type UseVisibleConversationsParams = {
  conversations: AdminSkinChatThread[];
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
    return conversations.filter((thread) => {
      return (
        thread.user.full_name.toLowerCase().includes(normalizedSearch) ||
        (thread.user.email ?? "").toLowerCase().includes(normalizedSearch)
      );
    });
  }, [conversations, searchValue]);
}

