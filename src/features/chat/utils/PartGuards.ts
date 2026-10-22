import { MUSIC_TOOL_NAMES } from "../constants/ToolNames";
import type { ChatPart, MoodToolPart, MusicToolPart } from "../types/Chat";

const MUSIC_PART_TYPES: ReadonlySet<string> = new Set(
  MUSIC_TOOL_NAMES.map((name) => `tool-${name}`),
);

export const isMusicToolPart = (part: ChatPart): part is MusicToolPart =>
  MUSIC_PART_TYPES.has(part.type);

export const isMoodToolPart = (part: ChatPart): part is MoodToolPart =>
  part.type === "tool-logMood";

export const isTextPart = (part: ChatPart): part is Extract<ChatPart, { type: "text" }> =>
  part.type === "text";