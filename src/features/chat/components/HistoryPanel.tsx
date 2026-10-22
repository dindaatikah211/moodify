"use client";

import { Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { formatShortDate } from "@/shared/lib/Format";
import { cn } from "@/shared/lib/utils";
import { CHAT_COPY, HISTORY_COPY } from "../constants/ChatUi";
import { useConversationList } from "../hooks/useConversationList";
import StatusNote from "./StatusNote";

type HistoryPanelProps = {
  isOpen: boolean;
  activeId: string;
  onClose: () => void;
  onOpen: (id: string) => void;
  onDeleted: (id: string) => void;
};

export default function HistoryPanel({
  isOpen,
  activeId,
  onClose,
  onOpen,
  onDeleted,
}: HistoryPanelProps) {
  const { items, remove } = useConversationList(isOpen);
  const [confirmingId, setConfirmingId] = useState<string | null>(null);

  const close = () => {
    setConfirmingId(null);
    onClose();
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setConfirmingId(null);
        onClose();
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  const handleDelete = async (id: string) => {
    if (confirmingId !== id) {
      setConfirmingId(id);
      return;
    }

    setConfirmingId(null);
    await remove(id);
    onDeleted(id);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.button
            type="button"
            aria-label={HISTORY_COPY.close}
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-foreground/30"
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label={HISTORY_COPY.title}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.25 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col gap-4 bg-background p-5 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-2xl font-semibold">{HISTORY_COPY.title}</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={close}
                aria-label={HISTORY_COPY.close}
                className="rounded-full"
              >
                <X />
              </Button>
            </div>
            {items === null ? (
              <StatusNote label={CHAT_COPY.loading} pending />
            ) : items.length === 0 ? (
              <p className="text-muted-foreground">{HISTORY_COPY.empty}</p>
            ) : (
              <ul data-lenis-prevent className="flex flex-1 flex-col gap-2 overflow-y-auto">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className={cn(
                      "flex items-center gap-2 rounded-2xl p-1",
                      item.id === activeId ? "bg-mint" : "bg-card",
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => onOpen(item.id)}
                      className="min-w-0 flex-1 rounded-xl px-3 py-2 text-left"
                    >
                      <span className="block truncate font-medium">{item.title}</span>
                      <span className="block text-xs text-foreground/70">
                        {formatShortDate(item.updatedAt)}
                      </span>
                    </button>
                    {confirmingId === item.id ? (
                      <Button
                        size="sm"
                        onClick={() => handleDelete(item.id)}
                        className="rounded-full"
                      >
                        {HISTORY_COPY.confirmDelete}
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        size="icon"
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
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}