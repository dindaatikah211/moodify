import type { InferUITools, UIDataTypes, UIMessage } from "ai";
import type { musicTools } from "../tools/MusicTools";

export type ChatMessage = UIMessage<unknown, UIDataTypes, InferUITools<typeof musicTools>>;

export type ChatPart = ChatMessage["parts"][number];

export type MusicToolPart = Extract<ChatPart, { type: `tool-${keyof typeof musicTools}` }>;