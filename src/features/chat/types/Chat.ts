import type { InferUITools, UIDataTypes, UIMessage } from "ai";
import type { createMusicTools } from "../tools/MusicTools";

type MusicTools = ReturnType<typeof createMusicTools>;

export type ChatMessage = UIMessage<unknown, UIDataTypes, InferUITools<MusicTools>>;

export type ChatPart = ChatMessage["parts"][number];

export type MusicToolPart = Extract<ChatPart, { type: `tool-${keyof MusicTools}` }>;