import type { ChatMessage } from "./Chat";

export type StoredConversation = {
  id: string;
  messages: ChatMessage[];
};