import type { InferUITools, UIDataTypes, UIMessage } from "ai";
import type { MUSIC_TOOL_NAMES } from "../constants/ToolNames";
import type { createMoodTools } from "../tools/MoodTools";
import type { createMusicTools } from "../tools/MusicTools";

type ChatTools = ReturnType<typeof createMusicTools> & ReturnType<typeof createMoodTools>;

export type ChatMessage = UIMessage<unknown, UIDataTypes, InferUITools<ChatTools>>;

export type ChatPart = ChatMessage["parts"][number];

export type MusicToolPart = Extract<
  ChatPart,
  { type: `tool-${(typeof MUSIC_TOOL_NAMES)[number]}` }
>;

export type MoodToolPart = Extract<ChatPart, { type: "tool-logMood" }>;