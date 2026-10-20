"use client";

import { MotionConfig } from "motion/react";
import { authClient } from "@/features/auth/services/AuthClient";
import { AudioPreviewProvider } from "@/features/music/components/AudioPreviewProvider";
import LoadingState from "./LoadingState";
import SignedInChat from "./SignedInChat";
import SignedOutState from "./SignedOutState";

function ChatBody() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <LoadingState />;
  }

  if (!session) {
    return <SignedOutState />;
  }

  return <SignedInChat key={session.user.id} userName={session.user.name} />;
}

export default function ChatView() {
  return (
    <MotionConfig reducedMotion="user">
      <AudioPreviewProvider>
        <ChatBody />
      </AudioPreviewProvider>
    </MotionConfig>
  );
}