import { Icon } from "@iconify/react";
import Link from "next/link";

import { APP_URL } from "constant";
import type { AdminSkinChatThread } from "backend-service/admin/skin-chat/index";
import { getInitials } from "libs/util/get-initials";
import { getPreviewMessage } from "libs/util/get-preview-message";

type ConversationListItemProps = {
  thread: AdminSkinChatThread;
};

export function ConversationListItem({
  thread,
}: ConversationListItemProps) {
  return (
    <Link
      href={`${APP_URL.ADMIN_CHATS}/${thread.uuid}`}
      className="flex w-full items-center gap-3 rounded-2xl bg-card p-3 text-left transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
        {getInitials(thread.user.full_name)}
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="truncate text-sm font-semibold text-foreground">
          {thread.user.full_name}
        </span>
        <span className="truncate text-xs text-muted-foreground">
          {thread.user.email}
        </span>
        <span className="truncate text-xs text-foreground/80">
          {getPreviewMessage(thread)}
        </span>
      </span>
      <Icon
        icon="lucide:chevron-right"
        className="size-4 shrink-0 text-muted-foreground"
      />
    </Link>
  );
}
