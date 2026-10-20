"use client";

import { Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/shared/components/ui/button";
import { fadeUp, staggerContainer } from "@/shared/constants/Variants";
import { CHAT_COPY, SUGGESTIONS } from "../constants/ChatUi";

type EmptyStateProps = {
  onSelect: (text: string) => void;
};

export default function EmptyState({ onSelect }: EmptyStateProps) {
  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="my-auto flex flex-col items-center gap-6 text-center"
    >
      <motion.div variants={fadeUp} className="flex flex-col items-center gap-3">
        <Sparkles className="size-8 text-primary" />
        <h1 className="text-3xl font-semibold tracking-tight">{CHAT_COPY.title}</h1>
        <p className="max-w-md text-muted-foreground">{CHAT_COPY.tagline}</p>
      </motion.div>
      <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-2">
        {SUGGESTIONS.map((suggestion) => (
          <Button
            key={suggestion}
            variant="outline"
            size="sm"
            onClick={() => onSelect(suggestion)}
            className="h-auto whitespace-normal py-2 text-left"
          >
            {suggestion}
          </Button>
        ))}
      </motion.div>
    </motion.section>
  );
}