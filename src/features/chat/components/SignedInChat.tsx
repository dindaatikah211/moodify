"use client";

import { useConversations } from "./ConversationProvider";
import ChatSession from "./ChatSession";
import LoadingState from "./LoadingState";

type SignedInChatProps = {
  userName: string;
};

export default function SignedInChat({ userName }: SignedInChatProps) {
  const { active } = useConversations();

  if (!active) {
    return <LoadingState />;
  }

  return <ChatSession key={active.id} conversation={active} userName={userName} />;
}