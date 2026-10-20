import type { Track } from "@/features/music/types/Track";
import type { MusicToolPart } from "../types/Chat";

export type ToolSummary = {
  tracks: Track[];
  isSearching: boolean;
  hasFailure: boolean;
};

const isSettled = (part: MusicToolPart) =>
  part.state === "output-available" || part.state === "output-error";

export function summarizeToolParts(parts: MusicToolPart[]): ToolSummary {
  const tracks = new Map<string, Track>();

  parts.forEach((part) => {
    if (part.state === "output-available") {
      part.output.forEach((track) => tracks.set(track.id, track));
    }
  });

  return {
    tracks: [...tracks.values()],
    isSearching: parts.some((part) => !isSettled(part)),
    hasFailure: parts.some((part) => part.state === "output-error"),
  };
}