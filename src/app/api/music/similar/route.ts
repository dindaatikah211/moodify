import { NextResponse, type NextRequest } from "next/server";
import { recommendSimilarTo } from "@/features/music/services/RecommendationService";
import { jsonError, upstreamError } from "@/shared/lib/ApiResponse";

export async function GET(request: NextRequest) {
  const title = request.nextUrl.searchParams.get("title");
  const artist = request.nextUrl.searchParams.get("artist");

  if (!title || !artist) {
    return jsonError("title and artist are required", 400);
  }

  try {
    const tracks = await recommendSimilarTo({ title, artist });
    return NextResponse.json({ tracks });
  } catch (error) {
    return upstreamError(error);
  }
}