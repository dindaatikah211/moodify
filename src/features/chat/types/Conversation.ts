import type { ChatMessage } from "./Chat";

export type StoredConversation = {
  id: string;
  messages: ChatMessage[];
};

export type ConversationSummary = {
  id: string;
  title: string;
  updatedAt: string;
};