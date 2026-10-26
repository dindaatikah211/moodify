"use client";

import { motion } from "motion/react";
import { TRACK_TONES } from "@/features/music/constants/TrackUi";
import { fadeUp, staggerContainer } from "@/shared/constants/Variants";
import { cn } from "@/shared/lib/utils";
import { REVEAL_STAGGER, TRACK_HOVER } from "../constants/LandingMotion";
import { LANDING_COPY } from "../constants/LandingUi";

function Record() {
  return (
    <span className="relative size-14 shrink-0 rounded-full bg-foreground">
      <span className="absolute inset-[30%] rounded-full bg-primary" />
      <span className="absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background" />
    </span>
  );
}

export default function DemoConversation() {
  const { user, reply, tracks } = LANDING_COPY.demo;

  return (
    <motion.section
      {...REVEAL_STAGGER}
      className="flex w-full max-w-xl flex-col gap-4 justify-self-center rounded-[2rem] bg-card p-6 sm:p-8 lg:justify-self-end"
    >
      <motion.p
        variants={fadeUp}
        className="max-w-[85%] self-end rounded-3xl rounded-br-md bg-primary px-4 py-2.5 font-medium text-primary-foreground"
      >
        {user}
      </motion.p>
      <motion.p variants={fadeUp} className="leading-relaxed">
        {reply}
      </motion.p>
      <motion.ul variants={staggerContainer} className="flex flex-col gap-3">
        {tracks.map((track, index) => (
          <motion.li
            key={track.title}
            variants={fadeUp}
            whileHover={TRACK_HOVER}
            className={cn(
              "flex items-center gap-4 rounded-3xl p-3",
              TRACK_TONES[index % TRACK_TONES.length],
            )}
          >
            <Record />
            <div className="min-w-0">
              <p className="truncate font-heading text-lg font-semibold leading-tight">
                {track.title}
              </p>
              <p className="truncate text-sm text-foreground/75">{track.artist}</p>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </motion.section>
  );
}