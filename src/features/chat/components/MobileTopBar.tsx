"use client";

import { Plus } from "lucide-react";
import Brand from "@/shared/components/commons/Brand";
import { Button } from "@/shared/components/ui/button";
import { STICKY_BAR_CLASS } from "@/shared/constants/Ui";
import { cn } from "@/shared/lib/utils";
import { CHAT_COPY } from "../constants/ChatUi";
import { useChatBusy } from "../hooks/useChatBusy";
import { useConversationNavigation } from "../hooks/useConversationNavigation";

export default function MobileTopBar() {
  const { startNewChat } = useConversationNavigation();
  const isBusy = useChatBusy();

  return (
    <header className={cn(STICKY_BAR_CLASS, "lg:hidden")}>
      <Brand />
      <Button
        variant="outline"
        size="icon"
        onClick={startNewChat}
        disabled={isBusy}
        aria-label={CHAT_COPY.newChat}
        className="rounded-full border-foreground/50"
      >
        <Plus />
      </Button>
    </header>
  );
}