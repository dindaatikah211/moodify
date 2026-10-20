"use client";

import { Button } from "@/shared/components/ui/button";
import { CHAT_COPY, SUGGESTIONS } from "../constants/ChatUi";
import HeroSection from "./HeroSection";

type EmptyStateProps = {
  userName: string;
  onSelect: (text: string) => void;
};

export default function EmptyState({ userName, onSelect }: EmptyStateProps) {
  const [firstName] = userName.split(" ");

  return (
    <HeroSection headline={CHAT_COPY.headline} tagline={`Halo ${firstName}! ${CHAT_COPY.tagline}`}>
      {SUGGESTIONS.map((suggestion) => (
        <Button
          key={suggestion}
          variant="outline"
          onClick={() => onSelect(suggestion)}
          className="h-auto whitespace-normal rounded-full border-foreground/50 px-4 py-2 text-left font-normal"
        >
          {suggestion}
        </Button>
      ))}
    </HeroSection>
  );
}