"use client";

import { History, Plus, Smile } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "@/shared/components/ui/button";
import { ACTION_BUTTON_STYLE } from "@/shared/constants/Ui";
import { CHAT_COPY } from "../constants/ChatUi";

type ChatActionsProps = {
  isBusy: boolean;
  hasMessages: boolean;
  onNewChat: () => void;
  onOpenHistory: () => void;
};

export default function ChatActions({
  isBusy,
  hasMessages,
  onNewChat,
  onOpenHistory,
}: ChatActionsProps) {
  return (
    <>
      <Button
        {...ACTION_BUTTON_STYLE}
        onClick={onOpenHistory}
        disabled={isBusy}
        aria-label={CHAT_COPY.history}
      >
        <History />
        <span className="hidden sm:inline">{CHAT_COPY.history}</span>
      </Button>
      <Link
        href="/mood"
        aria-label={CHAT_COPY.moodPage}
        className={buttonVariants(ACTION_BUTTON_STYLE)}
      >
        <Smile />
        <span className="hidden sm:inline">{CHAT_COPY.moodPage}</span>
      </Link>
      <Button
        {...ACTION_BUTTON_STYLE}
        onClick={onNewChat}
        disabled={isBusy || !hasMessages}
        aria-label={CHAT_COPY.newChat}
      >
        <Plus />
        <span className="hidden sm:inline">{CHAT_COPY.newChat}</span>
      </Button>
    </>
  );
}