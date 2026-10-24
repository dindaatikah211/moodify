"use client";

import type { ReactNode } from "react";
import { authClient } from "@/features/auth/services/AuthClient";
import { cn } from "@/shared/lib/utils";
import BottomNav from "./BottomNav";
import ChatHeader from "./ChatHeader";
import MobileTopBar from "./MobileTopBar";
import Sidebar from "./Sidebar";

type ChatShellProps = {
  children: ReactNode;
};

const COLUMN_CLASS =
  "mx-auto flex min-h-dvh w-full min-w-0 max-w-2xl flex-1 flex-col overflow-x-clip px-4";

function GuestFrame({ children }: ChatShellProps) {
  return (
    <main className={COLUMN_CLASS}>
      <ChatHeader />
      {children}
    </main>
  );
}

function AppFrame({ children }: ChatShellProps) {
  return (
    <div className="flex min-h-dvh w-full">
      <Sidebar />
      <main className={cn(COLUMN_CLASS, "pb-[calc(4rem+env(safe-area-inset-bottom))] lg:pb-0")}>
        <MobileTopBar />
        {children}
      </main>
      <BottomNav />
    </div>
  );
}

export default function ChatShell({ children }: ChatShellProps) {
  const { data: session } = authClient.useSession();

  return session ? <AppFrame>{children}</AppFrame> : <GuestFrame>{children}</GuestFrame>;
}