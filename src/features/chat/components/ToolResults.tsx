import TrackList from "@/features/music/components/TrackList";
import { CHAT_COPY } from "../constants/ChatUi";
import type { MusicToolPart } from "../types/Chat";
import { summarizeToolParts } from "../utils/ToolSummary";
import StatusNote from "./StatusNote";

type ToolResultsProps = {
  parts: MusicToolPart[];
};

export default function ToolResults({ parts }: ToolResultsProps) {
  const { tracks, isSearching, hasFailure } = summarizeToolParts(parts);
  const isEmpty = !isSearching && tracks.length === 0;

  return (
    <div className="flex w-full flex-col gap-3">
      {tracks.length > 0 && <TrackList tracks={tracks} />}
      {isSearching && <StatusNote label={CHAT_COPY.searching} pending />}
      {isEmpty && (
        <StatusNote label={hasFailure ? CHAT_COPY.toolError : CHAT_COPY.noResults} />
      )}
    </div>
  );
}