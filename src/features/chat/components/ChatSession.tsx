"use client";

import { useChat } from "@ai-sdk/react";
import { useState } from "react";
import { CHAT_COPY } from "../constants/ChatUi";
import { useAutoSave } from "../hooks/useAutoSave";
import { useStickToBottom } from "../hooks/useStickToBottom";
import type { ChatMessage } from "../types/Chat";
import type { StoredConversation } from "../types/Conversation";
import { describeChatError } from "../utils/ChatError";
import ChatActions from "./ChatActions";
import ChatShell from "./ChatShell";
import Composer from "./Composer";
import EmptyState from "./EmptyState";
import MessageBubble from "./MessageBubble";
import StatusNote from "./StatusNote";

type ChatSessionProps = {
  conversation: StoredConversation;
  userName: string;
  onNewChat: () => void;
  onOpenHistory: () => void;
};

export default function ChatSession({
  conversation,
  userName,
  onNewChat,
  onOpenHistory,
}: ChatSessionProps) {
  const { messages, sendMessage, status, error } = useChat<ChatMessage>({
    id: conversation.id,
    messages: conversation.messages,
  });
  const [input, setInput] = useState("");
  const stickToBottom = useStickToBottom(messages, status);
  const isBusy = status === "submitted" || status === "streaming";

  useAutoSave(conversation.id, messages, status);

  const submit = (text: string) => {
    const trimmed = text.trim();

    if (!trimmed || isBusy) {
      return;
    }

    stickToBottom();
    sendMessage({ text: trimmed });
    setInput("");
  };

  return (
    <ChatShell
      actions={
        <ChatActions
          isBusy={isBusy}
          hasMessages={messages.length > 0}
          onNewChat={onNewChat}
          onOpenHistory={onOpenHistory}
        />
      }
    >
      <div className="flex min-w-0 flex-1 flex-col gap-5 pb-10 pt-6">
        {messages.length === 0 ? (
          <EmptyState userName={userName} onSelect={submit} />
        ) : (
          messages.map((message) => <MessageBubble key={message.id} message={message} />)
        )}
        {status === "submitted" && <StatusNote label={CHAT_COPY.typing} pending />}
        {error && <StatusNote label={describeChatError(error)} />}
      </div>
      <Composer
        value={input}
        disabled={isBusy}
        onChange={setInput}
        onSubmit={() => submit(input)}
      />
    </ChatShell>
  );
}