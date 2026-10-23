"use client";

import { LogOut } from "lucide-react";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import { AUTH_COPY } from "../constants/AuthUi";
import { authClient, signInWithGoogle, signOut } from "../services/AuthClient";
import UserAvatar from "./UserAvatar";

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
        <UserAvatar key={image ?? "none"} name={name} image={image} size={36} />
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