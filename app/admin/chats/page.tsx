import type { Metadata } from "next";

import { PageAdminChat } from "client-side-page/admin/chat/chat-list/PageAdminChat";

export const metadata: Metadata = {
  title: "Chats",
};

export default function AdminChatPage() {
  return <PageAdminChat />;
}
