import { tool } from "ai";
import { z } from "zod";
import {
  recommendByMood,
  recommendSimilarTo,
} from "@/features/music/services/RecommendationService";

const seedTrackSchema = z.object({
  title: z.string().describe("Judul lagu"),
  artist: z.string().describe("Nama artis"),
});

const moodSchema = z.object({
  tag: z.string().describe("Satu tag mood atau genre dalam bahasa Inggris, contoh: sad, chill"),
});

export const musicTools = {
  recommendSimilarTo: tool({
    description: "Cari lagu dengan vibes mirip sebuah lagu yang disebut pengguna",
    inputSchema: seedTrackSchema,
    execute: recommendSimilarTo,
  }),
  recommendByMood: tool({
    description: "Cari lagu populer berdasarkan mood atau genre",
    inputSchema: moodSchema,
    execute: ({ tag }) => recommendByMood(tag),
  }),
};