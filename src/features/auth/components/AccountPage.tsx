"use client";

import { Repeat } from "lucide-react";
import ChatShell from "@/features/chat/components/ChatShell";
import InstallApp from "@/features/pwa/components/InstallApp";
import { Button } from "@/shared/components/ui/button";
import { ACTION_BUTTON_STYLE } from "@/shared/constants/Ui";
import { ACCOUNT_COPY } from "../constants/AccountUi";
import { authClient, switchAccount } from "../services/AuthClient";
import DeleteAccountSection from "./DeleteAccountSection";
import RequireSession from "./RequireSession";
import UserAvatar from "./UserAvatar";

type ProfileProps = {
  name: string;
  email: string;
  image?: string | null;
};

function Profile({ name, email, image }: ProfileProps) {
  return (
    <div className="flex items-center gap-4">
      <UserAvatar key={image ?? "none"} name={name} image={image} size={64} className="text-2xl" />
      <div className="min-w-0 flex-1">
        <p className="truncate font-heading text-2xl font-semibold">{name}</p>
        <p className="truncate text-sm text-muted-foreground">{email}</p>
      </div>
      <Button
        {...ACTION_BUTTON_STYLE}
        onClick={switchAccount}
        aria-label={ACCOUNT_COPY.switchAccount}
      >
        <Repeat />
        <span className="hidden sm:inline">{ACCOUNT_COPY.switchAccount}</span>
      </Button>
    </div>
  );
}

function AccountContent() {
  const { data: session } = authClient.useSession();

  if (!session) {
    return null;
  }

  const { name, email, image } = session.user;

  return (
    <div className="flex flex-col gap-8">
      <Profile name={name} email={email} image={image} />
      <InstallApp />
      <DeleteAccountSection />
    </div>
  );
}

export default function AccountPage() {
  return (
    <ChatShell>
      <div className="flex flex-col gap-8 pb-16 pt-6">
        <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
          {ACCOUNT_COPY.title}
        </h1>
        <RequireSession prompt={ACCOUNT_COPY.signInPrompt}>
          <AccountContent />
        </RequireSession>
      </div>
    </ChatShell>
  );
}