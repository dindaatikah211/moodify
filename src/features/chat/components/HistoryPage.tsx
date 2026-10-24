"use client";

import RequireSession from "@/features/auth/components/RequireSession";
import { HISTORY_COPY } from "../constants/ChatUi";
import ChatShell from "./ChatShell";
import ConversationList from "./ConversationList";

export default function HistoryPage() {
  return (
    <ChatShell>
      <div className="flex flex-col gap-6 pb-16 pt-6">
        <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
          {HISTORY_COPY.title}
        </h1>
        <RequireSession prompt={HISTORY_COPY.signIn}>
          <ConversationList />
        </RequireSession>
      </div>
    </ChatShell>
  );
}