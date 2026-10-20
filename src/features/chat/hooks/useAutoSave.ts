import type { ChatStatus } from "ai";
import { useEffect, useRef } from "react";
import { saveConversation } from "../services/ConversationApi";
import type { ChatMessage } from "../types/Chat";

export function useAutoSave(conversationId: string, messages: ChatMessage[], status: ChatStatus) {
  const previousStatus = useRef(status);

  useEffect(() => {
    const hasFinished = previousStatus.current !== "ready" && status === "ready";
    previousStatus.current = status;

    if (hasFinished && messages.length > 0) {
      saveConversation(conversationId, messages).catch(() => undefined);
    }
  }, [conversationId, messages, status]);
}