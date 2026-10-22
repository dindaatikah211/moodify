import { MOOD_COPY } from "../constants/MoodUi";
import { MOODS } from "../constants/Moods";
import type { CalendarDay } from "../utils/MoodStats";

type MoodCalendarProps = {
  days: CalendarDay[];
};

const dayFormatter = new Intl.DateTimeFormat("id-ID", {
  weekday: "long",
  day: "numeric",
  month: "long",
});

export default function MoodCalendar({ days }: MoodCalendarProps) {
  const offset = (days[0].date.getDay() + 6) % 7;

  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-7 gap-2 text-center text-xs text-muted-foreground">
        {MOOD_COPY.weekdays.map((weekday) => (
          <span key={weekday}>{weekday}</span>
        ))}
      </div>
      <ol className="grid grid-cols-7 gap-2">
        {Array.from({ length: offset }, (_, index) => (
          <li key={`blank-${index}`} aria-hidden="true" />
        ))}
        {days.map(({ date, key, mood }) => {
          const description = `${dayFormatter.format(date)}: ${mood ? MOODS[mood].label : MOOD_COPY.noMood}`;

          return (
            <li
              key={key}
              title={description}
              aria-label={description}
              className="grid aspect-square place-items-center rounded-xl text-xs ring-1 ring-foreground/20"
              style={{ backgroundColor: mood ? MOODS[mood].color : undefined }}
            >
              {date.getDate()}
            </li>
          );
        })}
      </ol>
    </div>
  );
}