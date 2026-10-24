"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AccountButton from "@/features/auth/components/AccountButton";
import Brand from "@/shared/components/commons/Brand";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import { CHAT_COPY, HISTORY_COPY } from "../constants/ChatUi";
import { SIDEBAR_LINKS } from "../constants/NavItems";
import { useChatBusy } from "../hooks/useChatBusy";
import { useConversationNavigation } from "../hooks/useConversationNavigation";
import { isActivePath } from "../utils/NavPaths";
import ConversationList from "./ConversationList";

export default function Sidebar() {
  const pathname = usePathname();
  const { startNewChat } = useConversationNavigation();
  const isBusy = useChatBusy();

  return (
    <aside className="sticky top-0 hidden h-dvh w-72 shrink-0 flex-col gap-5 border-r border-border p-4 lg:flex">
      <Brand />
      <Button onClick={startNewChat} disabled={isBusy} className="h-11 rounded-full">
        <Plus />
        {CHAT_COPY.newChat}
      </Button>
      <section className="flex min-h-0 flex-1 flex-col gap-2">
        <h2 className="px-1 text-sm font-medium text-muted-foreground">{HISTORY_COPY.title}</h2>
        <ConversationList className="min-h-0 flex-1 overflow-y-auto" />
      </section>
      <nav className="flex flex-col gap-1">
        {SIDEBAR_LINKS.map(({ href, label, icon: Icon }) => {
          const isActive = isActivePath(pathname, href);

          return (
            <Link
              key={href}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-full px-4 py-2.5 text-sm font-medium hover:bg-card",
                isActive && "bg-mint hover:bg-mint",
              )}
            >
              <Icon className="size-4" />
              {label}
            </Link>
          );
        })}
      </nav>
      <AccountButton />
    </aside>
  );
}