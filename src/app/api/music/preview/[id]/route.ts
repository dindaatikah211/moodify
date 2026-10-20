import { NextResponse } from "next/server";
import { getSession } from "@/features/auth/services/Session";
import { getDeezerPreviewUrl } from "@/features/music/services/DeezerService";
import { jsonError, upstreamError } from "@/shared/lib/ApiResponse";

const TRACK_ID_PATTERN = /^\d+$/;

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(request: Request, { params }: RouteContext) {
  const session = await getSession(request);

  if (!session) {
    return jsonError("unauthorized", 401);
  }

  const { id } = await params;

  if (!TRACK_ID_PATTERN.test(id)) {
    return jsonError("Invalid track id", 400);
  }

  try {
    const previewUrl = await getDeezerPreviewUrl(id);

    return previewUrl
      ? NextResponse.json({ previewUrl })
      : jsonError("Preview not found", 404);
  } catch (error) {
    return upstreamError(error);
  }
}