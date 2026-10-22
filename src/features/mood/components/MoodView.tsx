"use client";

import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { AUTH_COPY } from "@/features/auth/constants/AuthUi";
import { authClient, signInWithGoogle } from "@/features/auth/services/AuthClient";
import ChatShell from "@/features/chat/components/ChatShell";
import StatusNote from "@/features/chat/components/StatusNote";
import { Button, buttonVariants } from "@/shared/components/ui/button";
import { ACTION_BUTTON_STYLE } from "@/shared/constants/Ui";
import { MOOD_COPY } from "../constants/MoodUi";
import MoodDashboard from "./MoodDashboard";

function MoodContent() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <StatusNote label={MOOD_COPY.loading} pending />;
  }

  if (!session) {
    return (
      <div className="flex flex-col items-start gap-4">
        <p>{MOOD_COPY.signIn}</p>
        <Button onClick={signInWithGoogle} className="rounded-full">
          {AUTH_COPY.signIn}
        </Button>
      </div>
    );
  }

  return <MoodDashboard />;
}

export default function MoodView() {
  const backLink = (
    <Link href="/chat" aria-label={MOOD_COPY.back} className={buttonVariants(ACTION_BUTTON_STYLE)}>
      <MessageCircle />
      <span className="hidden sm:inline">{MOOD_COPY.back}</span>
    </Link>
  );

  return (
    <ChatShell actions={backLink}>
      <div className="flex flex-col gap-8 pb-16 pt-6">
        <div className="flex flex-col gap-2">
          <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
            {MOOD_COPY.title}
          </h1>
          <p className="max-w-prose text-muted-foreground">{MOOD_COPY.subtitle}</p>
        </div>
        <MoodContent />
      </div>
    </ChatShell>
  );
}