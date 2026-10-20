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
import { MAX_TOOL_STEPS } from "@/shared/constants/Ai";
import { jsonError } from "@/shared/lib/ApiResponse";
import { chatModel } from "@/shared/lib/ChatModel";

export const maxDuration = 30;

export async function POST(request: Request) {
  const session = await getSession(request);

  if (!session) {
    return jsonError("Unauthorized", 401);
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
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
}