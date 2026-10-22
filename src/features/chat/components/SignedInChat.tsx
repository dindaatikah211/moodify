"use client";

import { useState } from "react";
import { useActiveConversation } from "../hooks/useActiveConversation";
import ChatSession from "./ChatSession";
import HistoryPanel from "./HistoryPanel";
import LoadingState from "./LoadingState";

type SignedInChatProps = {
  userName: string;
};

export default function SignedInChat({ userName }: SignedInChatProps) {
  const { conversation, startNew, open } = useActiveConversation();
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  if (!conversation) {
    return <LoadingState />;
  }

  const closeHistory = () => setIsHistoryOpen(false);

  const handleOpen = (id: string) => {
    closeHistory();

    if (id !== conversation.id) {
      open(id);
    }
  };

  const handleDeleted = (id: string) => {
    if (id === conversation.id) {
      startNew();
    }
  };

  return (
    <>
      <ChatSession
        key={conversation.id}
        conversation={conversation}
        userName={userName}
        onNewChat={startNew}
        onOpenHistory={() => setIsHistoryOpen(true)}
      />
      <HistoryPanel
        isOpen={isHistoryOpen}
        activeId={conversation.id}
        onClose={closeHistory}
        onOpen={handleOpen}
        onDeleted={handleDeleted}
      />
    </>
  );
}