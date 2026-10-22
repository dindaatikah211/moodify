import type { MoodEntryDto } from "../types/Mood";

export async function fetchMoodEntries(days: number): Promise<MoodEntryDto[]> {
  const response = await fetch(`/api/moods?days=${days}`);

  if (!response.ok) {
    throw new Error(`Failed to load moods: ${response.status}`);
  }

  const { entries } = (await response.json()) as { entries: MoodEntryDto[] };

  return entries;
}