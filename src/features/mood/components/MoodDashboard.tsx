"use client";

import StatusNote from "@/features/chat/components/StatusNote";
import { MOOD_COPY } from "../constants/MoodUi";
import { MOOD_WINDOW_DAYS } from "../constants/Moods";
import { useMoodEntries } from "../hooks/useMoodEntries";
import { buildCalendar, countByMood } from "../utils/MoodStats";
import MoodBars from "./MoodBars";
import MoodCalendar from "./MoodCalendar";

export default function MoodDashboard() {
  const state = useMoodEntries(MOOD_WINDOW_DAYS);

  if (!state) {
    return <StatusNote label={MOOD_COPY.loading} pending />;
  }

  const { entries, loadedAt } = state;

  if (entries.length === 0) {
    return <p className="max-w-prose text-muted-foreground">{MOOD_COPY.empty}</p>;
  }

  return (
    <div className="flex flex-col gap-10">
      <section className="flex flex-col gap-4">
        <h2 className="font-heading text-2xl font-semibold">{MOOD_COPY.frequentTitle}</h2>
        <MoodBars counts={countByMood(entries)} />
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="font-heading text-2xl font-semibold">{MOOD_COPY.calendarTitle}</h2>
        <MoodCalendar days={buildCalendar(entries, MOOD_WINDOW_DAYS, loadedAt)} />
      </section>
    </div>
  );
}