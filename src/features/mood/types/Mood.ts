import type { MoodKey } from "../constants/Moods";

export type MoodEntryDto = {
  id: string;
  mood: MoodKey;
  intensity: number;
  createdAt: string;
};