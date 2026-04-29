"use client";

import { motion } from "motion/react";
import { useState } from "react";

import { QueryStateHandler } from "components/atomic/molecule/QueryStateHandler";
import { ChatSearchInput } from "client-side-page/admin/chat/ChatSearchInput";
import { ConversationSection } from "client-side-page/admin/chat/ConversationSection";
import { LoadingState } from "client-side-page/admin/chat/LoadingState";
import { PageHeader } from "client-side-page/admin/chat/PageHeader";
import { useAdminChats } from "client-side-page/admin/chat/useAdminChats";
import { useVisibleConversations } from "client-side-page/admin/chat/useVisibleConversations";

export function PageAdminChat() {
  const [searchValue, setSearchValue] = useState("");
  const { adminChatsQuery, conversations } = useAdminChats();
  const visibleConversations = useVisibleConversations({
    conversations,
    searchValue,
  });

  return (
    <motion.div
      className="mx-auto flex h-[calc(100dvh-65px)] min-h-0 w-full max-w-125 flex-1 flex-col gap-4 px-4 py-4"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      {/* Section: Chat page header */}
      <PageHeader />

      {/* Section: Chat search filter */}
      <ChatSearchInput value={searchValue} onChange={setSearchValue} />

      <QueryStateHandler
        query={adminChatsQuery}
        skeleton={<LoadingState />}
        isEmpty={visibleConversations.length === 0}
        errorTitle="Failed to load chats."
        emptyTitle="No chats found."
        emptyDescription="Try another email or full name."
        contentClassName="flex min-h-0 flex-1 flex-col"
      >
        <ConversationSection conversations={visibleConversations} />
      </QueryStateHandler>
    </motion.div>
  );
}



