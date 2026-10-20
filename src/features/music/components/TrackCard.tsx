"use client";

import { ExternalLink, Pause, Play } from "lucide-react";
import Image from "next/image";
import { Button, buttonVariants } from "@/shared/components/ui/button";
import { TRACK_LINK_OPTIONS, TRACK_UI } from "../constants/TrackUi";
import type { Track } from "../types/Track";
import { useAudioPreviewContext } from "./AudioPreviewProvider";

type TrackCardProps = {
  track: Track;
};

export default function TrackCard({ track }: TrackCardProps) {
  const { playingId, toggle } = useAudioPreviewContext();
  const { previewUrl } = track;
  const isPlaying = playingId === track.id;
  const PlayIcon = isPlaying ? Pause : Play;

  return (
    <article className="flex items-center gap-3 rounded-xl border bg-card p-3 text-card-foreground">
      {track.coverUrl && (
        <Image
          src={track.coverUrl}
          alt=""
          width={56}
          height={56}
          unoptimized
          className="size-14 shrink-0 rounded-lg object-cover"
        />
      )}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{track.title}</p>
        <p className="truncate text-xs text-muted-foreground">{track.artist}</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {TRACK_LINK_OPTIONS.map(({ key, label }) => (
            <a
              key={key}
              href={track.links[key]}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({
                variant: "outline",
                size: "sm",
                className: "h-7 gap-1 px-2 text-xs",
              })}
            >
              {label}
              <ExternalLink className="size-3" />
            </a>
          ))}
        </div>
      </div>
      <Button
        size="icon"
        variant="secondary"
        disabled={!previewUrl}
        onClick={() => previewUrl && toggle(track.id, previewUrl)}
        aria-label={isPlaying ? TRACK_UI.pause : TRACK_UI.play}
      >
        <PlayIcon />
      </Button>
    </article>
  );
}