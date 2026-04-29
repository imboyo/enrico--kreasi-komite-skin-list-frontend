import type { AdminChatConversation } from "@/mock-backend/admin/chat/chats";

import { ConversationList } from "./ConversationList";

type ConversationSectionProps = {
  conversations: AdminChatConversation[];
};

export function ConversationSection({ conversations }: ConversationSectionProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4">
      <section className="flex min-h-0 flex-1 flex-col gap-2">
        {/* Section: Chat list summary */}
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold text-foreground">
            Conversations
          </h2>
          <span className="text-xs text-muted-foreground">
            {conversations.length} result{conversations.length === 1 ? "" : "s"}
          </span>
        </div>

        <ConversationList conversations={conversations} />
      </section>
    </div>
  );
}

