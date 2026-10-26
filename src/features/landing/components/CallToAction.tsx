"use client";

import { motion } from "motion/react";
import CatMark from "@/shared/components/commons/CatMark";
import { fadeUp } from "@/shared/constants/Variants";
import { REVEAL_STAGGER } from "../constants/LandingMotion";
import { LANDING_COPY } from "../constants/LandingUi";
import CtaLink from "./CtaLink";

export default function CallToAction() {
  const { title, text } = LANDING_COPY.closing;

  return (
    <motion.section
      {...REVEAL_STAGGER}
      className="flex flex-col items-start justify-between gap-8 rounded-[2rem] bg-primary p-8 sm:flex-row sm:items-center sm:p-12 lg:p-16"
    >
      <motion.div variants={fadeUp} className="flex flex-col gap-3">
        <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          {title}
        </h2>
        <p className="max-w-md">{text}</p>
        <CtaLink className="mt-2 h-12 w-fit rounded-full bg-foreground px-6 text-base text-background hover:bg-foreground/85" />
      </motion.div>
      <motion.div variants={fadeUp} className="shrink-0">
        <CatMark size={120} />
      </motion.div>
    </motion.section>
  );
}