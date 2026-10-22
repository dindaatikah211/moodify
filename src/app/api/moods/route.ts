import { NextResponse } from "next/server";
import { getSession } from "@/features/auth/services/Session";
import { MAX_MOOD_WINDOW_DAYS, MOOD_WINDOW_DAYS } from "@/features/mood/constants/Moods";
import { listMoodEntries } from "@/features/mood/services/MoodRepository";
import { jsonError } from "@/shared/lib/ApiResponse";

const parseDays = (value: string | null) => {
  const days = Number(value);

  return Number.isInteger(days) && days > 0 ? Math.min(days, MAX_MOOD_WINDOW_DAYS) : MOOD_WINDOW_DAYS;
};

export async function GET(request: Request) {
  const session = await getSession(request);

  if (!session) {
    return jsonError("unauthorized", 401);
  }

  const days = parseDays(new URL(request.url).searchParams.get("days"));
  const entries = await listMoodEntries(session.user.id, days);

  return NextResponse.json({ entries });
}