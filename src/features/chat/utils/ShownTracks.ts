import type { ChatMessage } from "../types/Chat";
import { isMusicToolPart } from "./PartGuards";

export function collectShownTrackIds(messages: ChatMessage[]): Set<string> {
  const ids = new Set<string>();

  messages.forEach((message) => {
    message.parts.filter(isMusicToolPart).forEach((part) => {
      if (part.state === "output-available") {
        part.output.forEach((track) => ids.add(track.id));
      }
    });
  });

  return ids;
}