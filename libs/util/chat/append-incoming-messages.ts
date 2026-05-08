import { ChatMessage } from "@/types/chat.types";
import { SkinChatMessage } from "@/backend-service";
import { mapDescendingPageToRenderOrder } from "@/libs/util/chat/map-descending-page-to-render-order";

export function appendIncomingMessages(
  previousMessages: ChatMessage[],
  latestPage: SkinChatMessage[],
) {
  const knownMessageIds = new Set(
    previousMessages.map((message) => message.uuid),
  );
  const incomingMessages = mapDescendingPageToRenderOrder(latestPage).filter(
    (message) => !knownMessageIds.has(message.uuid),
  );

  if (incomingMessages.length === 0) return previousMessages;

  return [...previousMessages, ...incomingMessages];
}
