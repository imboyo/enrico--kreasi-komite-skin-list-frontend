// Shared types for skin-chat endpoints

export type SkinChatMessage = {
  id: number;
  message: string;
  sender_role: "USER" | "ADMIN";
  created_at: string;
};

export type SkinChatMeta = {
  limit: number;
  has_more: boolean;
  next_cursor: string | null;
};

export type GetMessagesPayload = {
  before?: string;
  limit?: number;
};

export type GetMessagesResponse = {
  data: SkinChatMessage[];
  meta: SkinChatMeta;
};

export type SendMessagePayload = {
  message: string;
};

export type SendMessageResponse = {
  thread_id: number;
  message_id: number;
  message: string;
  created_at: string;
};

export type CleanMessagesResponse = {
  thread_id: number | null;
  deleted_count: number;
};
