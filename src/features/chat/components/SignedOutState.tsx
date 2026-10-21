"use client";

import { AUTH_COPY } from "@/features/auth/constants/AuthUi";
import { signInWithGoogle } from "@/features/auth/services/AuthClient";
import HeroSection from "@/shared/components/commons/HeroSection";
import { Button } from "@/shared/components/ui/button";
import { CHAT_COPY } from "../constants/ChatUi";
import ChatShell from "./ChatShell";

export default function SignedOutState() {
  return (
    <ChatShell>
      <div className="flex flex-1 flex-col pb-16">
        <HeroSection headline={CHAT_COPY.signedOut.headline} tagline={CHAT_COPY.signedOut.tagline}>
          <Button onClick={signInWithGoogle} className="h-12 rounded-full px-6 text-base">
            {AUTH_COPY.signIn}
          </Button>
        </HeroSection>
      </div>
    </ChatShell>
  );
}