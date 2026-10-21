import type { ChatStatus } from "ai";
import { useEffect, useRef } from "react";
import { saveConversation } from "../services/ConversationApi";
import type { ChatMessage } from "../types/Chat";

const BUSY_STATUSES: readonly ChatStatus[] = ["submitted", "streaming"];
const SETTLED_STATUSES: readonly ChatStatus[] = ["ready", "error"];

export function useAutoSave(conversationId: string, messages: ChatMessage[], status: ChatStatus) {
  const previousStatus = useRef(status);

  useEffect(() => {
    const hasSettled =
      BUSY_STATUSES.includes(previousStatus.current) && SETTLED_STATUSES.includes(status);
    previousStatus.current = status;

    if (hasSettled && messages.length > 0) {
      saveConversation(conversationId, messages).catch(() => undefined);
    }
  }, [conversationId, messages, status]);
}