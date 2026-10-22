import { NextResponse } from "next/server";
import { getSession } from "@/features/auth/services/Session";
import { listConversations } from "@/features/chat/services/ConversationRepository";
import { jsonError } from "@/shared/lib/ApiResponse";

export async function GET(request: Request) {
  const session = await getSession(request);

  if (!session) {
    return jsonError("unauthorized", 401);
  }

  const conversations = await listConversations(session.user.id);

  return NextResponse.json({ conversations });
}