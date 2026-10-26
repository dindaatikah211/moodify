"use client";

import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import Navbar from "@/shared/components/commons/Navbar";
import { buttonVariants } from "@/shared/components/ui/button";
import { PAGE_CONTAINER } from "@/shared/constants/Layout";
import { NAVBAR_COPY } from "@/shared/constants/NavbarUi";
import { fadeUp, staggerContainer } from "@/shared/constants/Variants";
import { cn } from "@/shared/lib/utils";
import { PRIVACY_COPY, PRIVACY_SECTIONS } from "../constants/PrivacyContent";
import { sectionId } from "../utils/SectionId";
import PrivacySectionItem from "./PrivacySectionItem";
import PrivacyToc from "./PrivacyToc";

export default function PrivacyPage() {
  return (
    <>
      <Navbar>
        <Link href="/" className={cn(buttonVariants({ variant: "ghost" }), "rounded-full")}>
          <ArrowLeft />
          {NAVBAR_COPY.home}
        </Link>
      </Navbar>
      <div className={cn(PAGE_CONTAINER, "pb-16 sm:pb-24")}>
        <div className="grid gap-10 pt-6 sm:pt-10 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-16">
          <PrivacyToc />
          <motion.main
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex max-w-3xl flex-col gap-10 sm:gap-12"
          >
            <motion.div variants={fadeUp} className="flex flex-col gap-3">
              <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
                {PRIVACY_COPY.title}
              </h1>
              <p className="text-sm text-muted-foreground">{PRIVACY_COPY.updatedAt}</p>
              <p className="max-w-prose leading-relaxed">{PRIVACY_COPY.intro}</p>
            </motion.div>
            {PRIVACY_SECTIONS.map((section, index) => (
              <PrivacySectionItem
                key={section.title}
                id={sectionId(index)}
                index={index}
                {...section}
              />
            ))}
            <motion.div
              variants={fadeUp}
              className="flex flex-col gap-2 rounded-3xl bg-card p-6 sm:p-8"
            >
              <p className="max-w-prose leading-relaxed">{PRIVACY_COPY.contactLabel}</p>
              <a
                href={`mailto:${PRIVACY_COPY.contactEmail}`}
                className="w-fit font-heading text-xl font-semibold underline underline-offset-4 transition-colors hover:text-primary"
              >
                {PRIVACY_COPY.contactEmail}
              </a>
            </motion.div>
          </motion.main>
        </div>
      </div>
    </>
  );
}