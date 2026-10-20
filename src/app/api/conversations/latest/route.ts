import { NextResponse } from "next/server";
import { getSession } from "@/features/auth/services/Session";
import { findLatestConversation } from "@/features/chat/services/ConversationRepository";
import { jsonError } from "@/shared/lib/ApiResponse";

export async function GET(request: Request) {
  const session = await getSession(request);

  if (!session) {
    return jsonError("Unauthorized", 401);
  }

  const conversation = await findLatestConversation(session.user.id);

  return NextResponse.json({ conversation });
}