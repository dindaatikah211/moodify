"use client";

import { motion } from "motion/react";
import { fadeUp } from "@/shared/constants/Variants";
import { cn } from "@/shared/lib/utils";
import { REVEAL, REVEAL_STAGGER } from "../constants/LandingMotion";
import { LANDING_COPY, STEP_TONES } from "../constants/LandingUi";

export default function HowItWorks() {
  return (
    <section className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
      <motion.h2
        {...REVEAL}
        className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl lg:sticky lg:top-8 lg:self-start"
      >
        {LANDING_COPY.stepsTitle}
      </motion.h2>
      <motion.ol {...REVEAL_STAGGER} className="flex flex-col gap-8">
        {LANDING_COPY.steps.map((step, index) => (
          <motion.li key={step.title} variants={fadeUp} className="flex gap-4">
            <span
              className={cn(
                "grid size-12 shrink-0 place-items-center rounded-full font-heading text-xl font-semibold",
                STEP_TONES[index],
              )}
            >
              {index + 1}
            </span>
            <div className="flex flex-col gap-1">
              <h3 className="font-heading text-2xl font-semibold">{step.title}</h3>
              <p className="max-w-md text-muted-foreground">{step.text}</p>
            </div>
          </motion.li>
        ))}
      </motion.ol>
    </section>
  );
}