import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  isStepCount,
  streamText,
  toUIMessageStream,
} from "ai";
import { getSession } from "@/features/auth/services/Session";
import { SYSTEM_PROMPT } from "@/features/chat/constants/SystemPrompt";
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

export async function POST(request: Request) {
  const session = await getSession(request);

  if (!session) {
    return jsonError("unauthorized", 401);
  }

  const limit = await consumeRateLimit(session.user.id, CHAT_RATE_LIMITS);

  if (!limit.allowed) {
    return rateLimitedResponse(limit);
  }

  const { messages }: { messages?: ChatMessage[] } = await request.json();

  if (!Array.isArray(messages) || messages.length === 0) {
    return jsonError("messages are required", 400);
  }

  const result = streamText({
    model: chatModel,
    system: SYSTEM_PROMPT,
    messages: await convertToModelMessages(messages),
    tools: createMusicTools(collectShownTrackIds(messages)),
    stopWhen: isStepCount(MAX_TOOL_STEPS),
    maxRetries: MODEL_RETRIES,
    onError: ({ error }) => console.error("chat stream error:", error),
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream, onError: toClientErrorCode }),
  });
}