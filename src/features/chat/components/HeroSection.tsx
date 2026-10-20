"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import CatMark from "@/shared/components/commons/CatMark";
import Squiggle from "@/shared/components/commons/Squiggle";
import { fadeUp, staggerContainer } from "@/shared/constants/Variants";
import type { Headline } from "../types/Hero";

type HeroSectionProps = {
  headline: Headline;
  tagline: string;
  children: ReactNode;
};

export default function HeroSection({ headline, tagline, children }: HeroSectionProps) {
  const { before, highlight, after } = headline;

  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="my-auto flex flex-col gap-8"
    >
      <motion.div variants={fadeUp} className="flex items-end justify-between gap-4">
        <h1 className="font-heading text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
          {before}
          <mark className="rounded-md bg-mint px-1.5 text-foreground">{highlight}</mark>
          {after}
        </h1>
        <CatMark size={96} />
      </motion.div>
      <motion.div variants={fadeUp} className="flex flex-col gap-4">
        <p className="max-w-md text-lg text-muted-foreground">{tagline}</p>
        <Squiggle className="h-4 w-40 text-primary" />
      </motion.div>
      <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
        {children}
      </motion.div>
    </motion.section>
  );
}