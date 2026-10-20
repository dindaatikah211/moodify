import type { ReactNode } from "react";
import ChatHeader from "./ChatHeader";

type ChatShellProps = {
  actions?: ReactNode;
  children: ReactNode;
};

export default function ChatShell({ actions, children }: ChatShellProps) {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col overflow-x-clip px-4">
      <ChatHeader actions={actions} />
      {children}
    </main>
  );
}