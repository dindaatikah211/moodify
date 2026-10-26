import { fadeUp, staggerContainer } from "./Variants";

const REVEAL_VIEWPORT = { once: true, amount: 0.2 } as const;

export const REVEAL = {
  variants: fadeUp,
  initial: "hidden",
  whileInView: "visible",
  viewport: REVEAL_VIEWPORT,
} as const;

export const REVEAL_STAGGER = {
  variants: staggerContainer,
  initial: "hidden",
  whileInView: "visible",
  viewport: REVEAL_VIEWPORT,
} as const;