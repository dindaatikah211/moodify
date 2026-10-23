"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import StatusNote from "@/features/chat/components/StatusNote";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { ACCOUNT_COPY } from "../constants/AccountUi";
import { deleteAccount, reauthenticate } from "../services/AuthClient";
import { isReauthRequired } from "../utils/AuthErrors";

type Phase = "idle" | "confirming" | "deleting" | "reauth" | "failed";

export default function DeleteAccountSection() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("idle");
  const [typed, setTyped] = useState("");

  const cancel = () => {
    setTyped("");
    setPhase("idle");
  };

  const confirmDeletion = async () => {
    setPhase("deleting");

    const { error } = await deleteAccount();

    if (!error) {
      router.replace("/");
      return;
    }

    setPhase(isReauthRequired(error) ? "reauth" : "failed");
  };

  const renderPhase = () => {
    switch (phase) {
      case "idle":
        return (
          <Button
            variant="destructive"
            onClick={() => setPhase("confirming")}
            className="w-fit rounded-full"
          >
            {ACCOUNT_COPY.deleteStart}
          </Button>
        );
      case "confirming":
        return (
          <div className="flex flex-col gap-3">
            <label htmlFor="confirm-delete" className="text-sm">
              {ACCOUNT_COPY.confirmLabel}
            </label>
            <Input
              id="confirm-delete"
              value={typed}
              onChange={(event) => setTyped(event.target.value)}
              autoComplete="off"
              className="h-11 max-w-xs rounded-full bg-background px-4"
            />
            <div className="flex gap-2">
              <Button
                variant="destructive"
                disabled={typed.trim() !== ACCOUNT_COPY.confirmWord}
                onClick={confirmDeletion}
                className="rounded-full"
              >
                {ACCOUNT_COPY.confirmAction}
              </Button>
              <Button variant="outline" onClick={cancel} className="rounded-full">
                {ACCOUNT_COPY.cancel}
              </Button>
            </div>
          </div>
        );
      case "deleting":
        return <StatusNote label={ACCOUNT_COPY.deleting} pending />;
      case "reauth":
        return (
          <div className="flex flex-col items-start gap-3">
            <p className="text-sm">{ACCOUNT_COPY.reauthMessage}</p>
            <Button onClick={reauthenticate} className="rounded-full">
              {ACCOUNT_COPY.reauthAction}
            </Button>
          </div>
        );
      case "failed":
        return (
          <div className="flex flex-col items-start gap-3">
            <p className="text-sm">{ACCOUNT_COPY.failed}</p>
            <Button variant="outline" onClick={cancel} className="rounded-full">
              {ACCOUNT_COPY.cancel}
            </Button>
          </div>
        );
    }
  };

  return (
    <section className="flex flex-col gap-4 rounded-3xl bg-card p-6">
      <h2 className="font-heading text-2xl font-semibold">{ACCOUNT_COPY.deleteTitle}</h2>
      <p className="max-w-prose text-sm leading-relaxed text-muted-foreground">
        {ACCOUNT_COPY.deleteDescription}
      </p>
      {renderPhase()}
    </section>
  );
}