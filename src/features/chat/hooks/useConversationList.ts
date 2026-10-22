import { useCallback, useEffect, useState } from "react";
import {
  deleteConversation,
  fetchConversationList,
} from "../services/ConversationApi";
import type { ConversationSummary } from "../types/Conversation";

export function useConversationList(isOpen: boolean) {
  const [items, setItems] = useState<ConversationSummary[] | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    let isCancelled = false;

    fetchConversationList()
      .catch(() => [] as ConversationSummary[])
      .then((list) => {
        if (!isCancelled) {
          setItems(list);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [isOpen]);

  const remove = useCallback(async (id: string) => {
    await deleteConversation(id);
    setItems((current) => current?.filter((item) => item.id !== id) ?? current);
  }, []);

  return { items, remove };
}