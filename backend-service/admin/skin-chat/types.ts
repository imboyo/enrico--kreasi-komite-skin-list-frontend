export type AdminSkinChatAccountRole = "ADMIN" | "USER";

export type AdminSkinChatAccountStatus =
  | "INITIALIZING"
  | "ACTIVE"
  | "INACTIVE"
  | "TO_DELETED";

export type AdminSkinChatSortDirection = "ASC" | "DESC";

export type AdminSkinChatSortDto<TField extends string = string> = {
  field: TField;
  direction: AdminSkinChatSortDirection;
};

export type AdminSkinChatFilterOperator =
  | "eq"
  | "neq"
  | "gt"
  | "gte"
  | "lt"
  | "lte"
  | "like"
  | "ilike"
  | "in"
  | "notIn"
  | "isNull"
  | "isNotNull"
  | "between"
  | "notBetween";

export type AdminSkinChatFilterItem<TField extends string = string> = {
  field: TField;
  operator: AdminSkinChatFilterOperator;
  value?: unknown;
};

export type AdminSkinChatFilterDto<TField extends string = string> = {
  and?: AdminSkinChatFilterItem<TField>[];
  or?: AdminSkinChatFilterItem<TField>[];
};

export type AdminSkinChatThreadListField =
  | "last_message_at"
  | "created_at"
  | "updated_at"
  | "user.full_name";

export type AdminSkinChatThreadFilterField =
  | "last_message_at"
  | "created_at"
  | "updated_at"
  | "user.full_name"
  | "user.email"
  | "user.phone_number"
  | "user.role"
  | "user.status";

export type AdminSkinChatUser = {
  id: string;
  full_name: string;
  email: string | null;
  phone_number: string;
  role: AdminSkinChatAccountRole;
  status: AdminSkinChatAccountStatus;
};

export type AdminSkinChatMessage = {
  id: string;
  message: string;
  created_at: string;
  sender_role: AdminSkinChatAccountRole;
  thread_id?: string;
};

export type AdminSkinChatThread = {
  uuid: string;
  last_message_at: string | null;
  created_at: string;
  updated_at: string;
  user: AdminSkinChatUser;
  messages: AdminSkinChatMessage[];
};

export type ListAdminSkinChatThreadPayload = {
  page?: number;
  limit?: number;
  search?: string;
  populate?: "user"[];
  sort?: AdminSkinChatSortDto<AdminSkinChatThreadListField>[];
  filter?: AdminSkinChatFilterDto<AdminSkinChatThreadFilterField>;
};

export type AdminSkinChatThreadListMeta = {
  total: number;
  page: number;
  limit: number;
  total_pages: number;
};

export type ListAdminSkinChatThreadResponse = {
  data: AdminSkinChatThread[];
  meta: AdminSkinChatThreadListMeta;
};

export type GetAdminSkinChatThreadMessagesPayload = {
  before?: string;
  limit?: number;
};

export type AdminSkinChatThreadMessagesMeta = {
  limit: number;
  has_more: boolean;
  next_cursor: string | null;
};

export type GetAdminSkinChatThreadMessagesResponse = {
  data: AdminSkinChatMessage[];
  meta: AdminSkinChatThreadMessagesMeta;
};

export type CleanAdminSkinChatThreadResponse = {
  thread_id: string;
  deleted_count: number;
};

export type ReplyAdminSkinChatThreadPayload = {
  message: string;
};

export type ReplyAdminSkinChatThreadResponse = {
  thread_id: string;
  message_id: string;
  message: string;
  created_at: string;
};
