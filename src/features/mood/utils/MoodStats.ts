import type { MoodKey } from "../constants/Moods";
import type { MoodEntryDto } from "../types/Mood";

export type MoodCount = {
  mood: MoodKey;
  count: number;
};

export type CalendarDay = {
  date: Date;
  key: string;
  mood: MoodKey | null;
};

const toDayKey = (date: Date) => `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

export function countByMood(entries: MoodEntryDto[]): MoodCount[] {
  const counts = new Map<MoodKey, number>();

  entries.forEach(({ mood }) => counts.set(mood, (counts.get(mood) ?? 0) + 1));

  return [...counts.entries()]
    .map(([mood, count]) => ({ mood, count }))
    .sort((first, second) => second.count - first.count);
}

function groupByDay(entries: MoodEntryDto[]) {
  const groups = new Map<string, MoodEntryDto[]>();

  entries.forEach((entry) => {
    const key = toDayKey(new Date(entry.createdAt));
    groups.set(key, [...(groups.get(key) ?? []), entry]);
  });

  return groups;
}

export function buildCalendar(entries: MoodEntryDto[], days: number, today: Date): CalendarDay[] {
  const groups = groupByDay(entries);

  return Array.from({ length: days }, (_, index) => {
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - (days - 1 - index));
    const key = toDayKey(date);

    return { date, key, mood: countByMood(groups.get(key) ?? [])[0]?.mood ?? null };
  });
}