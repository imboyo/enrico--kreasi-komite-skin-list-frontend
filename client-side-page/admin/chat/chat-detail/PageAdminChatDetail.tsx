"use client";

import { useAdminChats } from "@/client-side-page/admin/chat/useAdminChats";
import { useMemo } from "react";
import { QueryStateHandler } from "@/components/atomic/molecule/QueryStateHandler";
import { AdminChatThread } from "client-side-page/admin/chat/chat-detail/AdminChatThread";
import { LoadingState } from "client-side-page/admin/chat/chat-list/LoadingState";
import { motion } from "motion/react";

type PageAdminChatDetailProps = {
  threadUuid: string;
};

export function PageAdminChatDetail({
  threadUuid,
}: PageAdminChatDetailProps) {
  const { adminChatsQuery, conversations } = useAdminChats();

  const activeThread = useMemo(() => {
    return conversations.find(
      (thread) => thread.uuid === threadUuid,
    );
  }, [threadUuid, conversations]);

  return (
    <motion.div
      className="mx-auto flex h-[calc(100dvh-65px)] min-h-0 w-full max-w-125 flex-1 flex-col overflow-hidden px-4 py-4"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      {/* Section: Chat detail */}
      <QueryStateHandler
        query={adminChatsQuery}
        skeleton={<LoadingState />}
        isEmpty={!activeThread}
        errorTitle="Failed to load chat."
        emptyTitle="Chat not found."
        emptyDescription="Go back to the chat list and choose another conversation."
        contentClassName="flex min-h-0 flex-1 flex-col overflow-hidden"
      >
        {activeThread ? (
          <AdminChatThread
            key={activeThread.uuid}
            thread={activeThread}
          />
        ) : null}
      </QueryStateHandler>
    </motion.div>
  );
}
