"use client";

import ChatShell from "@/features/chat/components/ChatShell";
import RequireSession from "@/features/auth/components/RequireSession";
import { MOOD_COPY } from "../constants/MoodUi";
import MoodDashboard from "./MoodDashboard";

export default function MoodView() {
  return (
    <ChatShell>
      <div className="flex flex-col gap-8 pb-16 pt-6">
        <div className="flex flex-col gap-2">
          <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
            {MOOD_COPY.title}
          </h1>
          <p className="max-w-prose text-muted-foreground">{MOOD_COPY.subtitle}</p>
        </div>
        <RequireSession prompt={MOOD_COPY.signIn}>
          <MoodDashboard />
        </RequireSession>
      </div>
    </ChatShell>
  );
}