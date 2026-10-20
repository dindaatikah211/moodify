import { tool } from "ai";
import { z } from "zod";
import {
  recommendByMood,
  recommendSimilarTo,
  verifySuggestions,
} from "@/features/music/services/RecommendationService";

const songQuerySchema = z.object({
  title: z.string().describe("Judul lagu"),
  artist: z.string().optional().describe("Nama artis jika kamu yakin, kosongkan jika tidak yakin"),
});

const moodSchema = z.object({
  tag: z.string().describe("Satu tag mood atau genre dalam bahasa Inggris, contoh: sad, chill"),
});

const suggestionsSchema = z.object({
  tracks: z
    .array(
      z.object({
        title: z.string().describe("Judul lagu"),
        artist: z.string().describe("Nama artis yang benar"),
      }),
    )
    .min(1)
    .max(10)
    .describe("Lagu usulanmu yang vibesnya cocok dengan permintaan pengguna"),
});

export const createMusicTools = (excludeIds: ReadonlySet<string>) => ({
  recommendSimilarTo: tool({
    description:
      "Cari lagu dengan vibes mirip sebuah lagu. Lagu yang sudah pernah ditampilkan otomatis tidak diulang, jadi panggil lagi dengan lagu acuan yang sama saat pengguna meminta lagu lain.",
    inputSchema: songQuerySchema,
    execute: (query) => recommendSimilarTo(query, excludeIds),
  }),
  recommendByMood: tool({
    description:
      "Cari lagu populer berdasarkan mood atau genre. Lagu yang sudah pernah ditampilkan otomatis tidak diulang, jadi panggil lagi dengan tag yang sama saat pengguna meminta lagu lain.",
    inputSchema: moodSchema,
    execute: ({ tag }) => recommendByMood(tag, excludeIds),
  }),
  suggestTracks: tool({
    description:
      "Verifikasi lagu usulanmu sendiri di katalog musik. Pakai untuk lagu Indonesia atau lokal, atau saat tool lain tidak menemukan apa pun. Hanya lagu yang terbukti ada yang akan ditampilkan.",
    inputSchema: suggestionsSchema,
    execute: ({ tracks }) => verifySuggestions(tracks, excludeIds),
  }),
});