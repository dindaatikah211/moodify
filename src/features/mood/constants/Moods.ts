export const MOODS = {
  happy: { label: "Senang", color: "#d9ebb0" },
  calm: { label: "Tenang", color: "#bcd3f8" },
  energetic: { label: "Semangat", color: "#f28b6d" },
  sad: { label: "Sedih", color: "#8fa6d6" },
  heartbroken: { label: "Galau", color: "#f8c9dc" },
  tired: { label: "Lelah", color: "#e3c9a6" },
  anxious: { label: "Cemas", color: "#d8c9f2" },
  angry: { label: "Marah", color: "#e8908a" },
} as const;

export type MoodKey = keyof typeof MOODS;

export const MOOD_KEYS = Object.keys(MOODS) as [MoodKey, ...MoodKey[]];

export const MOOD_INTENSITY = { min: 1, max: 5 } as const;

export const MOOD_WINDOW_DAYS = 28;
export const MAX_MOOD_WINDOW_DAYS = 90;