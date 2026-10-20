import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  isStepCount,
  streamText,
  toUIMessageStream,
  type UIMessage,
} from "ai";
import { SYSTEM_PROMPT } from "@/features/chat/constants/SystemPrompt";
import { musicTools } from "@/features/chat/tools/MusicTools";
import { MAX_TOOL_STEPS } from "@/shared/constants/Ai";
import { jsonError } from "@/shared/lib/ApiResponse";
import { chatModel } from "@/shared/lib/ChatModel";

export const maxDuration = 30;

export async function POST(request: Request) {
  const { messages }: { messages?: UIMessage[] } = await request.json();

  if (!Array.isArray(messages) || messages.length === 0) {
    return jsonError("messages are required", 400);
  }

  const result = streamText({
    model: chatModel,
    system: SYSTEM_PROMPT,
    messages: await convertToModelMessages(messages),
    tools: musicTools,
    stopWhen: isStepCount(MAX_TOOL_STEPS),
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
}