import type { AdminChatConversation } from "@/mock-backend/admin/chat/chats";

import { ConversationListItem } from "./ConversationListItem";

type ConversationListProps = {
  conversations: AdminChatConversation[];
};

export function ConversationList({ conversations }: ConversationListProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto">
      {/* Section: Filtered chat items */}
      {conversations.map((conversation) => (
        <ConversationListItem
          key={conversation.id}
          conversation={conversation}
        />
      ))}
    </div>
  );
}
