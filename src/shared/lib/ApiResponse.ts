import { NextResponse } from "next/server";

export function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export function upstreamError(error: unknown) {
  console.error(error);
  return jsonError("Failed to fetch recommendations", 502);
}