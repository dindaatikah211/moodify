import { NextResponse, type NextRequest } from "next/server";
import { recommendByMood } from "@/features/music/services/RecommendationService";
import { jsonError, upstreamError } from "@/shared/lib/ApiResponse";

export async function GET(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get("tag");

  if (!tag) {
    return jsonError("tag is required", 400);
  }

  try {
    const tracks = await recommendByMood(tag);
    return NextResponse.json({ tracks });
  } catch (error) {
    return upstreamError(error);
  }
}