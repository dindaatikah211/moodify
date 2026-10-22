import { useEffect, useState } from "react";
import { fetchMoodEntries } from "../services/MoodApi";
import type { MoodEntryDto } from "../types/Mood";

type MoodState = {
  entries: MoodEntryDto[];
  loadedAt: Date;
};

export function useMoodEntries(days: number) {
  const [state, setState] = useState<MoodState | null>(null);

  useEffect(() => {
    let isCancelled = false;

    fetchMoodEntries(days)
      .catch(() => [] as MoodEntryDto[])
      .then((entries) => {
        if (!isCancelled) {
          setState({ entries, loadedAt: new Date() });
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [days]);

  return state;
}