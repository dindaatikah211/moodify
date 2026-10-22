import type { ChatMessage } from "../types/Chat";
import type { ConversationSummary, StoredConversation } from "../types/Conversation";

const CONVERSATIONS_URL = "/api/conversations";

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init);

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function fetchLatestConversation(): Promise<StoredConversation | null> {
  const { conversation } = await request<{ conversation: StoredConversation | null }>(
    `${CONVERSATIONS_URL}/latest`,
  );

  return conversation;
}

export async function fetchConversation(id: string): Promise<StoredConversation> {
  const { conversation } = await request<{ conversation: StoredConversation }>(
    `${CONVERSATIONS_URL}/${id}`,
  );

  return conversation;
}

export async function fetchConversationList(): Promise<ConversationSummary[]> {
  const { conversations } = await request<{ conversations: ConversationSummary[] }>(
    CONVERSATIONS_URL,
  );

  return conversations;
}

export async function saveConversation(id: string, messages: ChatMessage[]): Promise<void> {
  await request(`${CONVERSATIONS_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  });
}

export async function deleteConversation(id: string): Promise<void> {
  await request(`${CONVERSATIONS_URL}/${id}`, { method: "DELETE" });
}