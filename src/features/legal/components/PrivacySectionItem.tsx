"use client";

import { motion } from "motion/react";
import { fadeUp } from "@/shared/constants/Variants";
import { cn } from "@/shared/lib/utils";
import { PRIVACY_TONES } from "../constants/PrivacyUi";
import type { PrivacySection } from "../types/Privacy";

type PrivacySectionItemProps = PrivacySection & {
  id: string;
  index: number;
};

export default function PrivacySectionItem({
  id,
  index,
  title,
  text,
  items,
}: PrivacySectionItemProps) {
  return (
    <motion.section
      id={id}
      variants={fadeUp}
      className="flex scroll-mt-24 flex-col gap-4 border-t border-border pt-8"
    >
      <div className="flex items-center gap-3">
        <span
          className={cn(
            "grid size-9 shrink-0 place-items-center rounded-full font-heading text-base font-semibold",
            PRIVACY_TONES[index % PRIVACY_TONES.length],
          )}
        >
          {index + 1}
        </span>
        <h2 className="font-heading text-2xl font-semibold">{title}</h2>
      </div>
      {text && <p className="max-w-prose leading-relaxed sm:pl-12">{text}</p>}
      {items && (
        <ul className="flex max-w-prose list-disc flex-col gap-2 pl-5 leading-relaxed marker:text-primary sm:pl-17">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </motion.section>
  );
}