import { MOODS } from "../constants/Moods";
import type { MoodCount } from "../utils/MoodStats";

type MoodBarsProps = {
  counts: MoodCount[];
};

export default function MoodBars({ counts }: MoodBarsProps) {
  const max = Math.max(...counts.map(({ count }) => count));

  return (
    <ul className="flex flex-col gap-3">
      {counts.map(({ mood, count }) => (
        <li key={mood} className="grid grid-cols-[5rem_1fr_2rem] items-center gap-3 text-sm">
          <span>{MOODS[mood].label}</span>
          <span
            className="h-6 rounded-full ring-1 ring-foreground/30"
            style={{ width: `${(count / max) * 100}%`, backgroundColor: MOODS[mood].color }}
          />
          <span className="text-right tabular-nums">{count}</span>
        </li>
      ))}
    </ul>
  );
}