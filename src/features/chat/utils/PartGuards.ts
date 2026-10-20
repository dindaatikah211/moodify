import type { ChatPart, MusicToolPart } from "../types/Chat";

export const isMusicToolPart = (part: ChatPart): part is MusicToolPart =>
  part.type.startsWith("tool-");