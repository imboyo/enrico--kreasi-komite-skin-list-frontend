import type { Metadata } from "next";
import { PageAdminChatDetail } from "@/client-side-page/admin/chat/chat-detail/PageAdminChatDetail";

export const metadata: Metadata = {
  title: "Chat Detail",
};

type AdminChatDetailPageProps = {
  params: Promise<{
    conversationId: string;
  }>;
};

export default async function AdminChatDetailPage({
  params,
}: AdminChatDetailPageProps) {
  const { conversationId } = await params;

  return <PageAdminChatDetail threadUuid={conversationId} />;
}
