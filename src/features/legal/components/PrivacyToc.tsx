"use client";

import { motion } from "motion/react";
import { fadeUp } from "@/shared/constants/Variants";
import { cn } from "@/shared/lib/utils";
import { PRIVACY_SECTIONS } from "../constants/PrivacyContent";
import { PRIVACY_TOC_COPY } from "../constants/PrivacyUi";
import { useActiveSection } from "../hooks/UseActiveSection";
import { sectionId } from "../utils/SectionId";

const SECTION_IDS = PRIVACY_SECTIONS.map((_, index) => sectionId(index));

export default function PrivacyToc() {
  const activeId = useActiveSection(SECTION_IDS);

  return (
    <motion.nav
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      aria-label={PRIVACY_TOC_COPY.title}
      className="hidden lg:sticky lg:top-24 lg:block lg:self-start"
    >
      <p className="mb-4 text-sm font-medium text-muted-foreground">{PRIVACY_TOC_COPY.title}</p>
      <ol className="flex flex-col border-l border-border">
        {PRIVACY_SECTIONS.map(({ title }, index) => {
          const id = SECTION_IDS[index];
          const isActive = id === activeId;

          return (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-sm leading-snug text-muted-foreground transition-colors hover:text-foreground",
                  isActive && "border-primary font-medium text-foreground",
                )}
              >
                {title}
              </a>
            </li>
          );
        })}
      </ol>
    </motion.nav>
  );
}