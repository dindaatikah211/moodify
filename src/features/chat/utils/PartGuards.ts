import type { ChatPart, MusicToolPart } from "../types/Chat";

export const isMusicToolPart = (part: ChatPart): part is MusicToolPart =>
  part.type.startsWith("tool-");

export const isTextPart = (part: ChatPart): part is Extract<ChatPart, { type: "text" }> =>
  part.type === "text";