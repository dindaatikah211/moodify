"use client";

import { useChat } from "@ai-sdk/react";
import { useState } from "react";
import { AudioPreviewProvider } from "@/features/music/components/AudioPreviewProvider";
import { CHAT_COPY } from "../constants/ChatUi";
import { useStickToBottom } from "../hooks/useStickToBottom";
import type { ChatMessage } from "../types/Chat";
import Composer from "./Composer";
import EmptyState from "./EmptyState";
import MessageBubble from "./MessageBubble";
import StatusNote from "./StatusNote";

export default function ChatView() {
  const { messages, sendMessage, status, error } = useChat<ChatMessage>();
  const [input, setInput] = useState("");
  const stickToBottom = useStickToBottom(messages, status);
  const isBusy = status === "submitted" || status === "streaming";

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
    <AudioPreviewProvider>
      <main className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col px-4">
        <div className="flex flex-1 flex-col gap-4 py-8">
          {messages.length === 0 ? (
            <EmptyState onSelect={submit} />
          ) : (
            messages.map((message) => <MessageBubble key={message.id} message={message} />)
          )}
          {status === "submitted" && <StatusNote label={CHAT_COPY.typing} pending />}
          {error && <StatusNote label={CHAT_COPY.requestError} />}
        </div>
        <Composer
          value={input}
          disabled={isBusy}
          onChange={setInput}
          onSubmit={() => submit(input)}
        />
      </main>
    </AudioPreviewProvider>
  );
}