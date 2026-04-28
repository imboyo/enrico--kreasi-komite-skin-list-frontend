"use client";

import { useQuery } from "@tanstack/react-query";

import { QueryStateHandler } from "@/components/atomic/molecule/QueryStateHandler";
import { getAdminSupportReplySummary } from "@/mock-backend/admin/dashboard/support-reply";

import { Header } from "./Header";
import { LoadingState } from "./LoadingState";
import { SuccessState } from "./SuccessState";

export function SupportReplySection() {
  const supportReplyQuery = useQuery({
    queryKey: ["admin-support-reply-summary"],
    queryFn: async () => {
      return await getAdminSupportReplySummary();
    },
  });

  const supportReplySummary = supportReplyQuery.data?.data;
  const pendingConversations = supportReplySummary?.pendingConversations ?? [];

  return (
    <>
      <section className="flex flex-col gap-4">
        <Header />
        <QueryStateHandler
          query={supportReplyQuery}
          skeleton={<LoadingState />}
          isEmpty={pendingConversations.length === 0}
          errorTitle="Failed to load support conversations."
          emptyTitle="No pending conversations."
          emptyDescription="No user conversations are waiting for a reply."
        >
          <SuccessState
            pendingCount={supportReplySummary?.pendingCount ?? 0}
            pendingConversations={pendingConversations}
          />
        </QueryStateHandler>
      </section>
    </>
  );
}
