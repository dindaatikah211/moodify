import { useCallback, useEffect, useState } from "react";
import { fetchLatestConversation } from "../services/ConversationApi";
import type { StoredConversation } from "../types/Conversation";

const createEmptyConversation = (): StoredConversation => ({
  id: crypto.randomUUID(),
  messages: [],
});

export function useActiveConversation() {
  const [conversation, setConversation] = useState<StoredConversation | null>(null);

  useEffect(() => {
    let isCancelled = false;

    fetchLatestConversation()
      .catch(() => null)
      .then((latest) => {
        if (!isCancelled) {
          setConversation(latest ?? createEmptyConversation());
        }
      });

    return () => {
      isCancelled = true;
    };
  }, []);

  const startNew = useCallback(() => setConversation(createEmptyConversation()), []);

  return { conversation, startNew };
}