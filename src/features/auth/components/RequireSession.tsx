"use client";

import type { ReactNode } from "react";
import StatusNote from "@/features/chat/components/StatusNote";
import { Button } from "@/shared/components/ui/button";
import { AUTH_COPY } from "../constants/AuthUi";
import { authClient, signInWithGoogle } from "../services/AuthClient";

type RequireSessionProps = {
  prompt: string;
  children: ReactNode;
};

export default function RequireSession({ prompt, children }: RequireSessionProps) {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <StatusNote label={AUTH_COPY.loading} pending />;
  }

  if (!session) {
    return (
      <div className="flex flex-col items-start gap-4">
        <p>{prompt}</p>
        <Button onClick={signInWithGoogle} className="rounded-full">
          {AUTH_COPY.signIn}
        </Button>
      </div>
    );
  }

  return <>{children}</>;
}