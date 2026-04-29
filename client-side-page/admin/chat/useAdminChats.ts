import { useMemo } from "react";

import { useQuery } from "@tanstack/react-query";

import { getAdminChats } from "@/mock-backend/admin/chat/chats";

export function useAdminChats() {
  const adminChatsQuery = useQuery({
    queryKey: ["admin-chats"],
    queryFn: async () => {
      return await getAdminChats();
    },
  });

  const conversations = useMemo(() => {
    return adminChatsQuery.data?.data ?? [];
  }, [adminChatsQuery.data?.data]);

  return {
    adminChatsQuery,
    conversations,
  };
}

