"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { PRIVACY_COPY } from "@/features/legal/constants/PrivacyContent";
import Brand from "@/shared/components/commons/Brand";
import { REVEAL } from "../constants/LandingMotion";
import { LANDING_COPY } from "../constants/LandingUi";

export default function LandingFooter() {
  return (
    <motion.footer
      {...REVEAL}
      className="mt-16 flex flex-col gap-5 border-t border-border py-10 lg:mt-24"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Brand href="/" />
        <Link
          href="/privacy"
          className="w-fit text-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
        >
          {PRIVACY_COPY.linkLabel}
        </Link>
      </div>
      <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
        {LANDING_COPY.footer}
      </p>
    </motion.footer>
  );
}