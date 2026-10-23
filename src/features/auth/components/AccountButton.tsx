"use client";

import { LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import { AUTH_COPY } from "../constants/AuthUi";
import { authClient, signInWithGoogle, signOut } from "../services/AuthClient";

export default function AccountButton() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return null;
  }

  if (!session) {
    return (
      <Button
        variant="outline"
        onClick={signInWithGoogle}
        className="rounded-full border-foreground/50"
      >
        {AUTH_COPY.signIn}
      </Button>
    );
  }

  const { image, name } = session.user;

  return (
    <div className="flex items-center gap-2">
      <Link href="/account" aria-label={AUTH_COPY.account} className="rounded-full">
        {image ? (
          <Image
            src={image}
            alt={name}
            width={36}
            height={36}
            unoptimized
            className="size-9 rounded-full ring-1 ring-foreground/20"
          />
        ) : (
          <span className="grid size-9 place-items-center rounded-full bg-mint font-heading">
            {name.slice(0, 1)}
          </span>
        )}
      </Link>
      <Button
        variant="ghost"
        size="icon"
        onClick={signOut}
        aria-label={AUTH_COPY.signOut}
        className="rounded-full"
      >
        <LogOut />
      </Button>
    </div>
  );
}