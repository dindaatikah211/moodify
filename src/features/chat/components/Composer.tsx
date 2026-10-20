"use client";

import { SendHorizontal } from "lucide-react";
import type { FormEvent } from "react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { CHAT_COPY } from "../constants/ChatUi";

type ComposerProps = {
  value: string;
  disabled: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

export default function Composer({ value, disabled, onChange, onSubmit }: ComposerProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <div className="sticky bottom-0 bg-background pb-4 pt-2">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={CHAT_COPY.placeholder}
          className="h-12 rounded-full border-foreground/25 bg-card px-5 text-base md:text-base"
        />
        <Button
          type="submit"
          size="icon"
          disabled={disabled || !value.trim()}
          aria-label={CHAT_COPY.send}
          className="size-12 shrink-0 rounded-full"
        >
          <SendHorizontal />
        </Button>
      </form>
      <p className="mt-2 text-xs text-muted-foreground">{CHAT_COPY.privacy}</p>
    </div>
  );
}