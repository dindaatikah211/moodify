"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { authClient } from "@/features/auth/services/AuthClient";
import {
  deleteConversation,
  fetchConversation,
  fetchConversationList,
  fetchLatestConversation,
} from "../services/ConversationApi";
import type { ChatMessage } from "../types/Chat";
import type { ConversationSummary, StoredConversation } from "../types/Conversation";

type ConversationState = {
  userId: string | null;
  active: StoredConversation | null;
  items: ConversationSummary[] | null;
};

type ConversationContextValue = {
  active: StoredConversation | null;
  items: ConversationSummary[] | null;
  open: (id: string) => Promise<void>;
  startNew: () => void;
  remove: (id: string) => Promise<void>;
  syncSaved: (id: string, messages: ChatMessage[]) => Promise<void>;
};

type ConversationProviderProps = {
  children: ReactNode;
};

const EMPTY_STATE: ConversationState = { userId: null, active: null, items: null };

const ConversationContext = createContext<ConversationContextValue | null>(null);

const createEmptyConversation = (): StoredConversation => ({
  id: crypto.randomUUID(),
  messages: [],
});

export function ConversationProvider({ children }: ConversationProviderProps) {
  const { data: session } = authClient.useSession();
  const userId = session?.user.id ?? null;
  const [state, setState] = useState<ConversationState>(EMPTY_STATE);
  const isCurrent = userId !== null && state.userId === userId;
  const active = isCurrent ? state.active : null;
  const items = isCurrent ? state.items : null;

  useEffect(() => {
    if (!userId) {
      return;
    }

    let isCancelled = false;

    Promise.all([
      fetchLatestConversation().catch(() => null),
      fetchConversationList().catch(() => [] as ConversationSummary[]),
    ]).then(([latest, list]) => {
      if (!isCancelled) {
        setState({ userId, active: latest ?? createEmptyConversation(), items: list });
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [userId]);

  const patch = useCallback(
    (changes: Partial<ConversationState>) => setState((current) => ({ ...current, ...changes })),
    [],
  );

  const open = useCallback(
    async (id: string) => {
      const stored = await fetchConversation(id).catch(() => null);

      if (stored) {
        patch({ active: stored });
      }
    },
    [patch],
  );

  const startNew = useCallback(() => patch({ active: createEmptyConversation() }), [patch]);

  const remove = useCallback(async (id: string) => {
    await deleteConversation(id);
    const replacement = createEmptyConversation();

    setState((current) => ({
      ...current,
      items: current.items?.filter((item) => item.id !== id) ?? current.items,
      active: current.active?.id === id ? replacement : current.active,
    }));
  }, []);

  const syncSaved = useCallback(
    async (id: string, messages: ChatMessage[]) => {
      setState((current) =>
        current.active?.id === id ? { ...current, active: { id, messages } } : current,
      );

      const list = await fetchConversationList().catch(() => null);

      if (list) {
        patch({ items: list });
      }
    },
    [patch],
  );

  const value = useMemo(
    () => ({ active, items, open, startNew, remove, syncSaved }),
    [active, items, open, startNew, remove, syncSaved],
  );

  return <ConversationContext.Provider value={value}>{children}</ConversationContext.Provider>;
}

export function useConversations() {
  const context = useContext(ConversationContext);

  if (!context) {
    throw new Error("useConversations must be used within ConversationProvider");
  }

  return context;
}