import { tool } from "ai";
import { z } from "zod";
import { MOOD_INTENSITY, MOOD_KEYS } from "@/features/mood/constants/Moods";
import { saveMoodEntry } from "@/features/mood/services/MoodRepository";

type MoodContext = {
  userId: string;
  conversationId: string;
};

const moodSchema = z.object({
  mood: z.enum(MOOD_KEYS).describe("Mood utama pengguna saat ini"),
  intensity: z
    .number()
    .int()
    .min(MOOD_INTENSITY.min)
    .max(MOOD_INTENSITY.max)
    .describe("Seberapa kuat perasaannya, 1 ringan sampai 5 sangat kuat"),
});

export const createMoodTools = ({ userId, conversationId }: MoodContext) => ({
  logMood: tool({
    description:
      "Catat mood pengguna saat ini. Panggil hanya jika pengguna mengungkapkan perasaan atau keadaan dirinya, maksimal sekali per pesan.",
    inputSchema: moodSchema,
    execute: async ({ mood, intensity }) => {
      await saveMoodEntry({ userId, conversationId, mood, intensity }).catch((error: unknown) =>
        console.error("mood log error:", error),
      );

      return { mood };
    },
  }),
});