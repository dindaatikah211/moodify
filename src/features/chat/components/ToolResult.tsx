import TrackList from "@/features/music/components/TrackList";
import { CHAT_COPY } from "../constants/ChatUi";
import type { MusicToolPart } from "../types/Chat";
import StatusNote from "./StatusNote";

type ToolResultProps = {
  part: MusicToolPart;
};

export default function ToolResult({ part }: ToolResultProps) {
  if (part.state === "output-error") {
    return <StatusNote label={CHAT_COPY.toolError} />;
  }

  if (part.state !== "output-available") {
    return <StatusNote label={CHAT_COPY.searching} pending />;
  }

  if (part.output.length === 0) {
    return <StatusNote label={CHAT_COPY.noResults} />;
  }

  return <TrackList tracks={part.output} />;
}