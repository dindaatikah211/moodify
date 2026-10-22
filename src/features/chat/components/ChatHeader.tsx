import type { ReactNode } from "react";
import AccountButton from "@/features/auth/components/AccountButton";
import CatMark from "@/shared/components/commons/CatMark";
import { CHAT_COPY } from "../constants/ChatUi";

type ChatHeaderProps = {
  actions?: ReactNode;
};

export default function ChatHeader({ actions }: ChatHeaderProps) {
  return (
    <header className="sticky top-0 z-10 -mx-4 flex items-center justify-between bg-background px-4 py-4 after:pointer-events-none after:absolute after:inset-x-0 after:top-full after:h-4 after:bg-linear-to-b after:from-background after:to-transparent after:content-['']">
      <div className="flex items-center gap-2">
        <CatMark size={36} />
        <span className="hidden font-heading text-2xl font-semibold tracking-tight sm:inline">
          {CHAT_COPY.title}
        </span>
      </div>
      <div className="flex items-center gap-2">
        {actions}
        <AccountButton />
      </div>
    </header>
  );
}