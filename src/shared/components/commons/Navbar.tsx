"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { PAGE_CONTAINER } from "@/shared/constants/Layout";
import { NAVBAR_VARIANTS } from "@/shared/constants/NavbarUi";
import { useHideOnScroll } from "@/shared/hooks/UseHideOnScroll";
import { cn } from "@/shared/lib/utils";
import Brand from "./Brand";

type NavbarProps = {
  children?: ReactNode;
};

export default function Navbar({ children }: NavbarProps) {
  const hidden = useHideOnScroll();

  return (
    <motion.header
      variants={NAVBAR_VARIANTS}
      initial="initial"
      animate={hidden ? "hidden" : "shown"}
      className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur-md"
    >
      <div className={cn(PAGE_CONTAINER, "flex h-16 items-center justify-between")}>
        <Brand href="/" />
        {children}
      </div>
    </motion.header>
  );
}