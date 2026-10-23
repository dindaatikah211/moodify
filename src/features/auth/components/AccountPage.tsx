"use client";

import { MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ChatShell from "@/features/chat/components/ChatShell";
import StatusNote from "@/features/chat/components/StatusNote";
import { Button, buttonVariants } from "@/shared/components/ui/button";
import { ACTION_BUTTON_STYLE } from "@/shared/constants/Ui";
import { ACCOUNT_COPY } from "../constants/AccountUi";
import { AUTH_COPY } from "../constants/AuthUi";
import { authClient, signInWithGoogle } from "../services/AuthClient";
import DeleteAccountSection from "./DeleteAccountSection";

type ProfileProps = {
  name: string;
  email: string;
  image?: string | null;
};

function Profile({ name, email, image }: ProfileProps) {
  return (
    <div className="flex items-center gap-4">
      {image ? (
        <Image
          src={image}
          alt=""
          width={64}
          height={64}
          unoptimized
          className="size-16 rounded-full ring-1 ring-foreground/20"
        />
      ) : (
        <span className="grid size-16 place-items-center rounded-full bg-mint font-heading text-2xl">
          {name.slice(0, 1)}
        </span>
      )}
      <div className="min-w-0">
        <p className="truncate font-heading text-2xl font-semibold">{name}</p>
        <p className="truncate text-sm text-muted-foreground">{email}</p>
      </div>
    </div>
  );
}

function AccountContent() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <StatusNote label={ACCOUNT_COPY.loading} pending />;
  }

  if (!session) {
    return (
      <div className="flex flex-col items-start gap-4">
        <p>{ACCOUNT_COPY.signInPrompt}</p>
        <Button onClick={signInWithGoogle} className="rounded-full">
          {AUTH_COPY.signIn}
        </Button>
      </div>
    );
  }

  const { name, email, image } = session.user;

  return (
    <div className="flex flex-col gap-8">
      <Profile name={name} email={email} image={image} />
      <DeleteAccountSection />
    </div>
  );
}

export default function AccountPage() {
  const backLink = (
    <Link
      href="/chat"
      aria-label={ACCOUNT_COPY.back}
      className={buttonVariants(ACTION_BUTTON_STYLE)}
    >
      <MessageCircle />
      <span className="hidden sm:inline">{ACCOUNT_COPY.back}</span>
    </Link>
  );

  return (
    <ChatShell actions={backLink}>
      <div className="flex flex-col gap-8 pb-16 pt-6">
        <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
          {ACCOUNT_COPY.title}
        </h1>
        <AccountContent />
      </div>
    </ChatShell>
  );
}