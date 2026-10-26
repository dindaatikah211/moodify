"use client";

import { motion } from "motion/react";
import { fadeUp, staggerContainer } from "@/shared/constants/Variants";
import { cn } from "@/shared/lib/utils";
import { SIGNED_OUT_COPY } from "../constants/SignedOutUi";

export default function SignedOutPerks() {
  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="flex w-full max-w-xl flex-col gap-6 justify-self-center rounded-[2rem] bg-card p-6 sm:p-8 lg:justify-self-end"
    >
      <motion.h2
        variants={fadeUp}
        className="font-heading text-2xl font-semibold tracking-tight"
      >
        {SIGNED_OUT_COPY.title}
      </motion.h2>
      <ul className="flex flex-col gap-5">
        {SIGNED_OUT_COPY.perks.map(({ icon: Icon, tone, title, text }) => (
          <motion.li key={title} variants={fadeUp} className="flex gap-4">
            <span className={cn("grid size-12 shrink-0 place-items-center rounded-full", tone)}>
              <Icon className="size-6" />
            </span>
            <div className="flex flex-col gap-1">
              <h3 className="font-heading text-lg font-semibold leading-tight">{title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
            </div>
          </motion.li>
        ))}
      </ul>
    </motion.section>
  );
}