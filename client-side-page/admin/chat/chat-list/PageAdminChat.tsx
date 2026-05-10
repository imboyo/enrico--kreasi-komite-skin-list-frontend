"use client";

import { motion } from "motion/react";

import { MobilePagination } from "components/atomic/molecule/MobilePagination";
import { QueryStateHandler } from "components/atomic/molecule/QueryStateHandler";
import { ChatSearchInput } from "client-side-page/admin/chat/chat-list/ChatSearchInput";
import { Conversation } from "client-side-page/admin/chat/chat-list/conversation/Conversation";
import { LoadingState } from "client-side-page/admin/chat/chat-list/LoadingState";
import { useAdminChats } from "client-side-page/admin/chat/useAdminChats";

export function PageAdminChat() {
  const {
    adminChatsQuery,
    conversations,
    currentPage,
    totalPages,
    totalCount,
    searchValue,
    handlePageChange,
    handleSearchChange,
  } = useAdminChats();

  return (
    <motion.div
      className="mx-auto flex h-[calc(100dvh-65px)] min-h-0 w-full max-w-125 flex-1 flex-col gap-4 px-4 py-4 sm:max-w-160 md:max-w-3xl lg:max-w-240 lg:gap-6 lg:px-6 xl:max-w-7xl"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <ChatSearchInput value={searchValue} onChange={handleSearchChange} />

      <QueryStateHandler
        query={adminChatsQuery}
        skeleton={<LoadingState />}
        isEmpty={conversations.length === 0}
        errorTitle="Failed to load chats."
        emptyTitle="No chats found."
        emptyDescription="Try another email or full name."
        contentClassName="flex min-h-0 flex-1 flex-col"
      >
        <Conversation conversations={conversations} totalCount={totalCount} />
      </QueryStateHandler>

      <MobilePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </motion.div>
  );
}
