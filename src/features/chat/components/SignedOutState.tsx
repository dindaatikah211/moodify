"use client";

import { AUTH_COPY } from "@/features/auth/constants/AuthUi";
import { signInWithGoogle } from "@/features/auth/services/AuthClient";
import HeroSection from "@/shared/components/commons/HeroSection";
import { Button } from "@/shared/components/ui/button";
import { CHAT_COPY } from "../constants/ChatUi";
import ChatShell from "./ChatShell";
import SignedOutPerks from "./SignedOutPerks";

export default function SignedOutState() {
  return (
    <ChatShell>
      <div className="grid flex-1 content-center items-center gap-12 py-8 sm:py-12 lg:grid-cols-2 lg:gap-16">
        <HeroSection headline={CHAT_COPY.signedOut.headline} tagline={CHAT_COPY.signedOut.tagline}>
          <Button onClick={signInWithGoogle} className="h-12 rounded-full px-6 text-base">
            {AUTH_COPY.signIn}
          </Button>
        </HeroSection>
        <SignedOutPerks />
      </div>
    </ChatShell>
  );
}