import { Icon } from "@iconify/react";

import { ChatThreadPreviewLink } from "@/components/atomic/atom/ChatThreadPreviewLink";
import type { AdminSkinChatThread } from "@/backend-service/admin/skin-chat";

type SuccessStateProps = {
  totalCount: number;
  threads: AdminSkinChatThread[];
};

function formatMessageTime(isoDate: string | null) {
  if (!isoDate) return "-";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(isoDate));
}

function getLatestMessageText(thread: AdminSkinChatThread): string {
  if (!thread.messages || thread.messages.length === 0) return "No messages";
  const latestMessage = thread.messages[thread.messages.length - 1];
  return latestMessage?.message ?? "No messages";
}

export const SuccessState = ({ totalCount, threads }: SuccessStateProps) => {
  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-border/70 bg-card/90 px-4 py-4 text-foreground shadow-[0_10px_30px_rgba(60,60,60,0.08)]">
      {/* Section: Total conversation summary */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-400">
            <Icon
              icon="material-symbols:support-agent-rounded"
              width={20}
              height={20}
            />
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-muted-foreground">
              Total conversations
            </p>
            <p className="text-3xl font-semibold leading-none">
              {totalCount.toString()}
            </p>
          </div>
        </div>
      </div>

      {/* Section: Latest conversation preview */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-medium text-foreground">Latest 10 chats</p>
          <span className="text-xs text-muted-foreground">Newest first</span>
        </div>

        <div className="flex flex-col gap-2">
          {threads.map((thread) => (
            <ChatThreadPreviewLink
              key={thread.uuid}
              href={`/admin/chats/${thread.uuid}`}
              customerName={thread.user.full_name}
              timestampLabel={formatMessageTime(thread.last_message_at)}
              latestMessage={getLatestMessageText(thread)}
            />
          ))}
        </div>
      </div>
    </article>
  );
};
