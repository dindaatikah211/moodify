import { useCallback, useEffect, useState } from "react";
import { fetchConversation, fetchLatestConversation } from "../services/ConversationApi";
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

  const open = useCallback(async (id: string) => {
    const stored = await fetchConversation(id).catch(() => null);

    if (stored) {
      setConversation(stored);
    }
  }, []);

  return { conversation, startNew, open };
}