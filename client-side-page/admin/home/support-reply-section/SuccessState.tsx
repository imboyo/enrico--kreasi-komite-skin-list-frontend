import { Icon } from "@iconify/react";

import type { AdminSupportConversation } from "@/mock-backend/admin/dashboard/support-reply";

type SuccessStateProps = {
  pendingCount: number;
  pendingConversations: AdminSupportConversation[];
};

function formatPendingTime(isoDate: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(isoDate));
}

export const SuccessState = ({
  pendingCount,
  pendingConversations,
}: SuccessStateProps) => {
  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-border/70 bg-card/90 px-4 py-4 text-foreground shadow-[0_10px_30px_rgba(60,60,60,0.08)]">
      {/* Section: Pending reply summary */}
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
              Waiting for reply
            </p>
            <p className="text-3xl font-semibold leading-none">
              {pendingCount.toString()}
            </p>
          </div>
        </div>
      </div>

      {/* Section: Pending conversation preview */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-medium text-foreground">
            Latest pending conversations
          </p>
          <span className="text-xs text-muted-foreground">Newest first</span>
        </div>

        <div className="flex flex-col gap-2">
          {pendingConversations.slice(0, 3).map((conversation) => (
            <div
              key={conversation.id}
              className="flex flex-col gap-2 rounded-2xl border border-border/60 bg-muted/35 px-3 py-3"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-medium">{conversation.userName}</p>
                <span className="shrink-0 text-[11px] text-muted-foreground">
                  {formatPendingTime(conversation.latestMessageAt)}
                </span>
              </div>

              <p className="line-clamp-2 text-sm text-muted-foreground">
                {conversation.latestMessage}
              </p>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
};
