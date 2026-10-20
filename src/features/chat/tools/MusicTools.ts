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
        title: z.string().describe("Judul lagu persis seperti di rilisan aslinya"),
        artist: z.string().describe("Nama artis utama yang benar"),
        reason: z
          .string()
          .describe("Alasan singkat lagu ini sesuai nuansa yang diminta, misalnya tema lirik atau tempo"),
      }),
    )
    .min(1)
    .max(12)
    .describe("Lagu usulanmu yang benar-benar ada dan sesuai permintaan pengguna"),
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
      "Cari lagu populer berdasarkan mood atau genre secara umum, tanpa membedakan bahasa atau negara. Lagu yang sudah pernah ditampilkan otomatis tidak diulang.",
    inputSchema: moodSchema,
    execute: ({ tag }) => recommendByMood(tag, excludeIds),
  }),
  suggestTracks: tool({
    description:
      "Verifikasi lagu usulanmu sendiri di katalog musik. Wajib dipakai untuk permintaan lagu berbahasa atau berasal dari negara tertentu, dan untuk permintaan dengan nuansa atau intensitas khusus. Hanya lagu yang judul dan artisnya terbukti cocok yang akan ditampilkan.",
    inputSchema: suggestionsSchema,
    execute: ({ tracks }) => verifySuggestions(tracks, excludeIds),
  }),
});