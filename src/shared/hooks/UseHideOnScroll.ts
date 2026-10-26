"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";

const TOP_OFFSET = 80;
const IDLE_MS = 150;

export function useHideOnScroll() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const idleTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    clearTimeout(idleTimer.current);
    setHidden(current > previous && current > TOP_OFFSET);
    idleTimer.current = setTimeout(() => setHidden(false), IDLE_MS);
  });

  useEffect(() => () => clearTimeout(idleTimer.current), []);

  return hidden;
}