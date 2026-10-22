import Link from "next/link";
import { MOODS } from "@/features/mood/constants/Moods";
import { CHAT_COPY } from "../constants/ChatUi";
import type { MoodToolPart } from "../types/Chat";

type MoodNoteProps = {
  part: MoodToolPart;
};

export default function MoodNote({ part }: MoodNoteProps) {
  if (part.state !== "output-available") {
    return null;
  }

  const { label, color } = MOODS[part.output.mood];

  return (
    <p className="flex items-center gap-2 text-xs text-muted-foreground">
      <span
        className="size-2.5 rounded-full ring-1 ring-foreground/30"
        style={{ backgroundColor: color }}
      />
      <span>
        {CHAT_COPY.moodLogged} {label}
      </span>
      <Link href="/mood" className="underline underline-offset-4 hover:text-foreground">
        {CHAT_COPY.moodHistory}
      </Link>
    </p>
  );
}