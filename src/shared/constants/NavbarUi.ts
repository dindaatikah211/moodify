import type { Variants } from "motion/react";

const TRANSITION = { duration: 0.25, ease: "easeOut" } as const;

export const NAVBAR_COPY = {
  home: "Beranda",
} as const;

export const NAVBAR_VARIANTS: Variants = {
  initial: { opacity: 0, y: -16 },
  shown: { opacity: 1, y: 0, transition: TRANSITION },
  hidden: { opacity: 1, y: "-100%", transition: TRANSITION },
};