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
  tag: z
    .string()
    .describe("Satu tag genre atau mood dalam bahasa Inggris yang spesifik, contoh: ballad, mellow"),
});

const suggestionsSchema = z.object({
  tracks: z
    .array(
      z.object({
        title: z.string().describe("Judul lagu persis seperti di rilisan aslinya"),
        artist: z.string().describe("Nama artis utama yang benar"),
        reason: z
          .string()
          .describe("Alasan singkat lagu ini sesuai permintaan, misalnya tempo, instrumen, atau tema lirik"),
      }),
    )
    .min(1)
    .max(12)
    .describe("Lagu usulanmu yang benar-benar ada dan sesuai persis dengan permintaan pengguna"),
});

export const createMusicTools = (excludeIds: ReadonlySet<string>) => ({
  recommendSimilarTo: tool({
    description:
      "Cari lagu dengan vibes mirip sebuah lagu yang dikenal secara global. Lagu yang sudah pernah ditampilkan otomatis tidak diulang, jadi panggil lagi dengan lagu acuan yang sama saat pengguna meminta lagu lain.",
    inputSchema: songQuerySchema,
    execute: (query) => recommendSimilarTo(query, excludeIds),
  }),
  recommendByMood: tool({
    description:
      "Cadangan saja. Mengambil lagu terpopuler untuk sebuah tag genre secara umum, tanpa memahami tempo, intensitas, atau bahasa. Pakai hanya untuk permintaan genre yang luas, atau jika suggestTracks mengembalikan daftar kosong.",
    inputSchema: moodSchema,
    execute: ({ tag }) => recommendByMood(tag, excludeIds),
  }),
  suggestTracks: tool({
    description:
      "Jalur utama untuk permintaan lagu berdasarkan mood, suasana, situasi, tempo, bahasa, atau negara. Kamu memilih lagunya sendiri, lalu sistem memverifikasi bahwa judul dan artisnya benar-benar ada. Lagu yang sudah pernah ditampilkan otomatis tidak diulang.",
    inputSchema: suggestionsSchema,
    execute: ({ tracks }) => verifySuggestions(tracks, excludeIds),
  }),
});