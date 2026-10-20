"use client";

import { motion } from "motion/react";
import CatMark from "@/shared/components/commons/CatMark";
import Squiggle from "@/shared/components/commons/Squiggle";
import { Button } from "@/shared/components/ui/button";
import { fadeUp, staggerContainer } from "@/shared/constants/Variants";
import { CHAT_COPY, SUGGESTIONS } from "../constants/ChatUi";

type EmptyStateProps = {
  onSelect: (text: string) => void;
};

export default function EmptyState({ onSelect }: EmptyStateProps) {
  const { before, highlight, after } = CHAT_COPY.headline;

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
        <p className="max-w-md text-lg text-muted-foreground">{CHAT_COPY.tagline}</p>
        <Squiggle className="h-4 w-40 text-primary" />
      </motion.div>
      <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
        {SUGGESTIONS.map((suggestion) => (
          <Button
            key={suggestion}
            variant="outline"
            onClick={() => onSelect(suggestion)}
            className="h-auto whitespace-normal rounded-full border-foreground/50 px-4 py-2 text-left font-normal"
          >
            {suggestion}
          </Button>
        ))}
      </motion.div>
    </motion.section>
  );
}