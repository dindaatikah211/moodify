"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { cn } from "@/shared/lib/utils";

type CatMarkProps = {
  size: number;
  wiggle?: boolean;
  className?: string;
};

const WIGGLE = { rotate: [-8, 8, -8] };

const WIGGLE_TRANSITION = {
  duration: 0.9,
  repeat: Infinity,
  ease: "easeInOut",
} as const;

export default function CatMark({ size, wiggle = false, className }: CatMarkProps) {
  return (
    <motion.span
      animate={wiggle ? WIGGLE : { rotate: 0 }}
      transition={wiggle ? WIGGLE_TRANSITION : undefined}
      className={cn("inline-block shrink-0", className)}
    >
      <Image src="/logo.svg" alt="" width={size} height={size} priority />
    </motion.span>
  );
}