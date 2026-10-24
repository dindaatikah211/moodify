"use client";

import { Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { formatShortDate } from "@/shared/lib/Format";
import { cn } from "@/shared/lib/utils";
import { HISTORY_COPY } from "../constants/ChatUi";
import { useChatBusy } from "../hooks/useChatBusy";
import { useConversationNavigation } from "../hooks/useConversationNavigation";
import { useConversations } from "./ConversationProvider";
import StatusNote from "./StatusNote";

type ConversationListProps = {
  className?: string;
};

export default function ConversationList({ className }: ConversationListProps) {
  const { items, active, remove } = useConversations();
  const { openConversation } = useConversationNavigation();
  const isBusy = useChatBusy();
  const [confirmingId, setConfirmingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (confirmingId !== id) {
      setConfirmingId(id);
      return;
    }

    setConfirmingId(null);
    await remove(id);
  };

  if (items === null) {
    return <StatusNote label={HISTORY_COPY.loading} pending />;
  }

  if (items.length === 0) {
    return <p className="text-sm text-muted-foreground">{HISTORY_COPY.empty}</p>;
  }

  return (
    <ul data-lenis-prevent className={cn("flex flex-col gap-2", className)}>
      {items.map((item) => (
        <li
          key={item.id}
          className={cn(
            "flex items-center gap-2 rounded-2xl p-1",
            item.id === active?.id ? "bg-mint" : "bg-card",
          )}
        >
          <button
            type="button"
            disabled={isBusy}
            onClick={() => openConversation(item.id)}
            className="min-w-0 flex-1 rounded-xl px-3 py-2 text-left disabled:opacity-60"
          >
            <span className="block truncate text-sm font-medium">{item.title}</span>
            <span className="block text-xs text-foreground/70">
              {formatShortDate(item.updatedAt)}
            </span>
          </button>
          {confirmingId === item.id ? (
            <Button
              size="sm"
              disabled={isBusy}
              onClick={() => handleDelete(item.id)}
              className="rounded-full"
            >
              {HISTORY_COPY.confirmDelete}
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              disabled={isBusy}
              onClick={() => handleDelete(item.id)}
              aria-label={HISTORY_COPY.delete}
              className="rounded-full"
            >
              <Trash2 />
            </Button>
          )}
        </li>
      ))}
    </ul>
  );
}