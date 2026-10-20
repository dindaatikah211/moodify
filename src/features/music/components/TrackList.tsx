"use client";

import { motion } from "motion/react";
import { fadeUp, staggerContainer } from "@/shared/constants/Variants";
import { cn } from "@/shared/lib/utils";
import { TRACK_TONES } from "../constants/TrackUi";
import type { Track } from "../types/Track";
import TrackCard from "./TrackCard";

type TrackListProps = {
  tracks: Track[];
};

export default function TrackList({ tracks }: TrackListProps) {
  return (
    <motion.ul
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid w-full gap-3"
    >
      {tracks.map((track, index) => (
        <motion.li
          key={track.id}
          variants={fadeUp}
          className={cn("rounded-3xl", TRACK_TONES[index % TRACK_TONES.length])}
        >
          <TrackCard track={track} />
        </motion.li>
      ))}
    </motion.ul>
  );
}