import type { AdminSkinChatThread } from "backend-service/admin/skin-chat/index";

import { ConversationListItem } from "client-side-page/admin/chat/chat-list/conversation/ConversationListItem";

type ConversationListProps = {
  conversations: AdminSkinChatThread[];
};

export function ConversationList({ conversations }: ConversationListProps) {
  return (
    <div className="grid min-h-0 grid-cols-1 gap-2 overflow-y-auto lg:grid-cols-2 lg:gap-3">
      {/* Section: Filtered chat items */}
      {conversations.map((thread) => (
        <ConversationListItem
          key={thread.uuid}
          thread={thread}
        />
      ))}
    </div>
  );
}
