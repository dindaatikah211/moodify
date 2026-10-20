export const CHAT_RATE_LIMITS = [
  { scope: "minute", windowSeconds: 60, max: 5 },
  { scope: "day", windowSeconds: 86_400, max: 30 },
] as const;