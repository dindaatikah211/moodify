import { prisma } from "@/shared/lib/Prisma";
import { MOODS, type MoodKey } from "../constants/Moods";
import type { MoodEntryDto } from "../types/Mood";

const MS_PER_DAY = 86_400_000;

type SaveMoodInput = {
  userId: string;
  conversationId: string;
  mood: MoodKey;
  intensity: number;
};

const isMoodKey = (value: string): value is MoodKey => value in MOODS;

export const saveMoodEntry = (input: SaveMoodInput) => prisma.moodEntry.create({ data: input });

export async function listMoodEntries(userId: string, days: number): Promise<MoodEntryDto[]> {
  const entries = await prisma.moodEntry.findMany({
    where: { userId, createdAt: { gte: new Date(Date.now() - days * MS_PER_DAY) } },
    orderBy: { createdAt: "asc" },
    select: { id: true, mood: true, intensity: true, createdAt: true },
  });

  return entries.flatMap(({ id, mood, intensity, createdAt }) =>
    isMoodKey(mood) ? [{ id, mood, intensity, createdAt: createdAt.toISOString() }] : [],
  );
}