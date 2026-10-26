"use client";

import { Smartphone } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/shared/components/ui/button";
import { REVEAL } from "@/shared/constants/Reveal";
import { PWA_COPY } from "../constants/PwaUi";
import { usePwa } from "./PwaProvider";

export default function InstallApp() {
  const { canPrompt, isIos, isStandalone, install } = usePwa();

  if (isStandalone || (!canPrompt && !isIos)) {
    return null;
  }

  return (
    <motion.section
      {...REVEAL}
      className="flex flex-col gap-4 rounded-3xl bg-sky p-5 sm:flex-row sm:items-center sm:gap-5"
    >
      <span className="grid size-12 shrink-0 place-items-center rounded-full bg-background">
        <Smartphone className="size-6" />
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <h2 className="font-heading text-lg font-semibold leading-tight">{PWA_COPY.title}</h2>
        <p className="text-sm leading-relaxed text-foreground/75">
          {canPrompt ? PWA_COPY.description : PWA_COPY.iosSteps}
        </p>
      </div>
      {canPrompt && (
        <Button onClick={install} className="h-10 shrink-0 rounded-full px-5">
          {PWA_COPY.install}
        </Button>
      )}
    </motion.section>
  );
}