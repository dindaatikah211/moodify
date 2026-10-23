"use client";

import { Button } from "@/shared/components/ui/button";
import { PWA_COPY } from "../constants/PwaUi";
import { usePwa } from "./PwaProvider";

export default function InstallApp() {
  const { canPrompt, isIos, isStandalone, install } = usePwa();

  if (isStandalone || (!canPrompt && !isIos)) {
    return null;
  }

  return (
    <section className="flex flex-col items-start gap-3 rounded-3xl bg-sky p-6">
      <h2 className="font-heading text-2xl font-semibold">{PWA_COPY.title}</h2>
      <p className="max-w-prose text-sm leading-relaxed">
        {canPrompt ? PWA_COPY.description : PWA_COPY.iosSteps}
      </p>
      {canPrompt && (
        <Button onClick={install} className="rounded-full">
          {PWA_COPY.install}
        </Button>
      )}
    </section>
  );
}