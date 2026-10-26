"use client";

import { motion } from "motion/react";
import { fadeUp } from "@/shared/constants/Variants";
import type { PrivacySection } from "../types/Privacy";

type PrivacySectionCardProps = PrivacySection & {
  id: string;
};

export default function PrivacySectionCard({ id, title, text, items }: PrivacySectionCardProps) {
  return (
    <motion.section
      id={id}
      variants={fadeUp}
      className="flex scroll-mt-24 flex-col gap-3 rounded-[2rem] bg-card p-6 sm:p-8"
    >
      <h2 className="font-heading text-2xl font-semibold">{title}</h2>
      {text && <p className="max-w-prose leading-relaxed">{text}</p>}
      {items && (
        <ul className="flex max-w-prose list-disc flex-col gap-2 pl-5 leading-relaxed marker:text-primary">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </motion.section>
  );
}