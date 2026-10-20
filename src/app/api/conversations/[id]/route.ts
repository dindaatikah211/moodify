import { NextResponse } from "next/server";
import { z } from "zod";
import { getSession } from "@/features/auth/services/Session";
import { saveConversation } from "@/features/chat/services/ConversationRepository";
import type { ChatMessage } from "@/features/chat/types/Chat";
import { saveConversationBodySchema } from "@/features/chat/types/ConversationSchema";
import { jsonError } from "@/shared/lib/ApiResponse";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PUT(request: Request, { params }: RouteContext) {
  const session = await getSession(request);

  if (!session) {
    return jsonError("Unauthorized", 401);
  }

  const { id } = await params;
  const body = saveConversationBodySchema.safeParse(await request.json().catch(() => null));

  if (!z.uuid().safeParse(id).success || !body.success) {
    return jsonError("Invalid request", 400);
  }

  const messages = body.data.messages as unknown as ChatMessage[];
  const isSaved = await saveConversation({ id, userId: session.user.id, messages });

  return isSaved ? NextResponse.json({ ok: true }) : jsonError("Not found", 404);
}