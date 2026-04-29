"use client";

import { useAdminChats } from "@/client-side-page/admin/chat/useAdminChats";
import { useMemo } from "react";
import { QueryStateHandler } from "@/components/atomic/molecule/QueryStateHandler";
import { AdminChatThread } from "client-side-page/admin/chat/chat-detail/AdminChatThread";
import { LoadingState } from "@/client-side-page/admin/chat/LoadingState";
import { motion } from "motion/react";

type PageAdminChatDetailProps = {
  conversationId: string;
};

export function PageAdminChatDetail({
  conversationId,
}: PageAdminChatDetailProps) {
  const { adminChatsQuery, conversations } = useAdminChats();

  const activeConversation = useMemo(() => {
    return conversations.find(
      (conversation) => conversation.id === conversationId,
    );
  }, [conversationId, conversations]);

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
        isEmpty={!activeConversation}
        errorTitle="Failed to load chat."
        emptyTitle="Chat not found."
        emptyDescription="Go back to the chat list and choose another conversation."
        contentClassName="flex min-h-0 flex-1 flex-col overflow-hidden"
      >
        {activeConversation ? (
          <AdminChatThread
            key={activeConversation.id}
            conversation={activeConversation}
          />
        ) : null}
      </QueryStateHandler>
    </motion.div>
  );
}
