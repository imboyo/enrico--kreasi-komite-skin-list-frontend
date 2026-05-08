// Shared types for skin-chat endpoints

export type SkinChatMessage = {
  uuid: string;
  message: string;
  sender_role: "USER" | "ADMIN";
  created_at: string;
};

export type SkinChatMeta = {
  limit: number;
  has_more: boolean;
  next_cursor: string | null;
  last_cleared_at: string | null;
};

export type GetMessagesPayload = {
  after?: string;
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
