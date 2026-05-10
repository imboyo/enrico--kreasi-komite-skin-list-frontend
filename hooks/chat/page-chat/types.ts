import type { Dispatch, MutableRefObject, SetStateAction } from "react";

import type { GetMessagesResponse } from "backend-service/index";
import type { ShowToastOptions } from "components/provider/toast-context";

import type { ChatMessage } from "types/chat.types";

export type MessagesQueryData = GetMessagesResponse;

export type SetMessages = Dispatch<SetStateAction<ChatMessage[]>>;
export type SetBoolean = Dispatch<SetStateAction<boolean>>;
export type SetNullableString = Dispatch<SetStateAction<string | null>>;

export type MessagesRef = MutableRefObject<ChatMessage[]>;
export type BooleanRef = MutableRefObject<boolean>;
export type ScrollContainerRef = MutableRefObject<HTMLDivElement | null>;

export type ShowToast = (message: string, options?: ShowToastOptions) => void;
