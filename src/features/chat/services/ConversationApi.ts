import type { ChatMessage } from "../types/Chat";
import type { StoredConversation } from "../types/Conversation";

const CONVERSATIONS_URL = "/api/conversations";

export async function fetchLatestConversation(): Promise<StoredConversation | null> {
  const response = await fetch(`${CONVERSATIONS_URL}/latest`);

  if (!response.ok) {
    throw new Error(`Failed to load conversation: ${response.status}`);
  }

  const { conversation } = (await response.json()) as {
    conversation: StoredConversation | null;
  };

  return conversation;
}

export async function saveConversation(id: string, messages: ChatMessage[]): Promise<void> {
  const response = await fetch(`${CONVERSATIONS_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  });

  if (!response.ok) {
    throw new Error(`Failed to save conversation: ${response.status}`);
  }
}