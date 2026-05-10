import type { AdminSkinChatThread } from "backend-service/admin/skin-chat/index";

import { ConversationList } from "client-side-page/admin/chat/chat-list/conversation/ConversationList";

type ConversationSectionProps = {
  conversations: AdminSkinChatThread[];
  totalCount: number;
};

export function Conversation({ conversations, totalCount }: ConversationSectionProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4">
      <section className="flex min-h-0 flex-1 flex-col gap-2">
        {/* Section: Chat list summary */}
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold text-foreground">
            Conversations
          </h2>
          <span className="text-xs text-muted-foreground">
            {totalCount} result{totalCount === 1 ? "" : "s"}
          </span>
        </div>

        <ConversationList conversations={conversations} />
      </section>
    </div>
  );
}

