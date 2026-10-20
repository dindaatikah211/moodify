import { prisma } from "./Prisma";

const PURGE_PROBABILITY = 0.02;

export type RateLimit = {
  scope: string;
  windowSeconds: number;
  max: number;
};

export type RateLimitResult =
  | { allowed: true }
  | { allowed: false; scope: string; retryAfterSeconds: number };

async function recordHit(userId: string, { scope, windowSeconds }: RateLimit, now: number) {
  const windowMs = windowSeconds * 1000;
  const windowStart = Math.floor(now / windowMs) * windowMs;
  const windowEnd = windowStart + windowMs;
  const key = `${userId}:${scope}:${windowStart}`;

  const { count } = await prisma.rateLimitWindow.upsert({
    where: { key },
    create: { key, count: 1, expiresAt: new Date(windowEnd) },
    update: { count: { increment: 1 } },
    select: { count: true },
  });

  return { count, retryAfterSeconds: Math.ceil((windowEnd - now) / 1000) };
}

const purgeExpired = () =>
  prisma.rateLimitWindow.deleteMany({ where: { expiresAt: { lt: new Date() } } });

export async function consumeRateLimit(
  userId: string,
  limits: readonly RateLimit[],
): Promise<RateLimitResult> {
  const now = Date.now();

  if (Math.random() < PURGE_PROBABILITY) {
    await purgeExpired().catch(() => undefined);
  }

  for (const limit of limits) {
    const { count, retryAfterSeconds } = await recordHit(userId, limit, now);

    if (count > limit.max) {
      return { allowed: false, scope: limit.scope, retryAfterSeconds };
    }
  }

  return { allowed: true };
}