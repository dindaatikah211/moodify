import { NextResponse } from "next/server";
import type { RateLimitResult } from "./RateLimit";

type RateLimitExceeded = Extract<RateLimitResult, { allowed: false }>;

export function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export function upstreamError(error: unknown) {
  console.error(error);
  return jsonError("Failed to fetch recommendations", 502);
}

export function rateLimitedResponse(limit: RateLimitExceeded) {
  return NextResponse.json(
    { error: "rate_limited", scope: limit.scope },
    { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
  );
}