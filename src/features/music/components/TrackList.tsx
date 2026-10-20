"use client";

import { motion } from "motion/react";
import { fadeUp, staggerContainer } from "@/shared/constants/Variants";
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
      className="grid w-full gap-2"
    >
      {tracks.map((track) => (
        <motion.li key={track.id} variants={fadeUp}>
          <TrackCard track={track} />
        </motion.li>
      ))}
    </motion.ul>
  );
}