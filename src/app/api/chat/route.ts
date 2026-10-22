import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  isStepCount,
  streamText,
  toUIMessageStream,
} from "ai";
import { z } from "zod";
import { getSession } from "@/features/auth/services/Session";
import { SYSTEM_PROMPT } from "@/features/chat/constants/SystemPrompt";
import { createMoodTools } from "@/features/chat/tools/MoodTools";
import { createMusicTools } from "@/features/chat/tools/MusicTools";
import type { ChatMessage } from "@/features/chat/types/Chat";
import { collectShownTrackIds } from "@/features/chat/utils/ShownTracks";
import { MAX_TOOL_STEPS, MODEL_RETRIES } from "@/shared/constants/Ai";
import { CHAT_RATE_LIMITS } from "@/shared/constants/RateLimit";
import { toClientErrorCode } from "@/shared/lib/AiErrors";
import { jsonError, rateLimitedResponse } from "@/shared/lib/ApiResponse";
import { chatModel } from "@/shared/lib/ChatModel";
import { consumeRateLimit } from "@/shared/lib/RateLimit";

export const maxDuration = 60;

type ChatRequestBody = {
  id?: string;
  messages?: ChatMessage[];
};

export async function POST(request: Request) {
  const session = await getSession(request);

  if (!session) {
    return jsonError("unauthorized", 401);
  }

  const limit = await consumeRateLimit(session.user.id, CHAT_RATE_LIMITS);

  if (!limit.allowed) {
    return rateLimitedResponse(limit);
  }

  const { id, messages }: ChatRequestBody = await request.json();

  if (!id || !z.uuid().safeParse(id).success || !Array.isArray(messages) || messages.length === 0) {
    return jsonError("Invalid request", 400);
  }

  const result = streamText({
    model: chatModel,
    system: SYSTEM_PROMPT,
    messages: await convertToModelMessages(messages),
    tools: {
      ...createMusicTools(collectShownTrackIds(messages)),
      ...createMoodTools({ userId: session.user.id, conversationId: id }),
    },
    stopWhen: isStepCount(MAX_TOOL_STEPS),
    maxRetries: MODEL_RETRIES,
    onError: ({ error }) => console.error("chat stream error:", error),
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream, onError: toClientErrorCode }),
  });
}