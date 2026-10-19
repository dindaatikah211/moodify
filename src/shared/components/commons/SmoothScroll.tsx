"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";
import { LENIS_OPTIONS } from "@/shared/constants/Scroll";

type SmoothScrollProps = {
  children: ReactNode;
};

export default function SmoothScroll({ children }: SmoothScrollProps) {
  return (
    <ReactLenis root options={LENIS_OPTIONS}>
      {children}
    </ReactLenis>
  );
}