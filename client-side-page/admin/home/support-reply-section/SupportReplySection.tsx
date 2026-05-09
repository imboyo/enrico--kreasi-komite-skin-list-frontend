"use client";

import { useQuery } from "@tanstack/react-query";

import { QueryStateHandler } from "@/components/atomic/molecule/QueryStateHandler";
import { listAdminSkinChatThread } from "@/backend-service/admin/skin-chat";

import { Header } from "./Header";
import { LoadingState } from "./LoadingState";
import { SuccessState } from "./SuccessState";

export function SupportReplySection() {
  const supportReplyQuery = useQuery({
    queryKey: ["admin-latest-skin-chat-threads"],
    queryFn: async () => {
      return await listAdminSkinChatThread({
        limit: 10,
        populate: ["user"],
        sort: [{ field: "last_message_at", direction: "DESC" }],
      });
    },
  });

  const threads = supportReplyQuery.data?.data ?? [];

  return (
    <>
      <section className="flex flex-col gap-4">
        <Header />
        <QueryStateHandler
          query={supportReplyQuery}
          skeleton={<LoadingState />}
          isEmpty={threads.length === 0}
          errorTitle="Failed to load support conversations."
          emptyTitle="No conversations found."
          emptyDescription="There are no customer chats at the moment."
        >
          <SuccessState
            totalCount={supportReplyQuery.data?.meta.total ?? 0}
            threads={threads}
          />
        </QueryStateHandler>
      </section>
    </>
  );
}
