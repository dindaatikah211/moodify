"use client";

import { useActiveConversation } from "../hooks/useActiveConversation";
import ChatSession from "./ChatSession";
import LoadingState from "./LoadingState";

type SignedInChatProps = {
  userName: string;
};

export default function SignedInChat({ userName }: SignedInChatProps) {
  const { conversation, startNew } = useActiveConversation();

  if (!conversation) {
    return <LoadingState />;
  }

  return (
    <ChatSession
      key={conversation.id}
      conversation={conversation}
      userName={userName}
      onNewChat={startNew}
    />
  );
}