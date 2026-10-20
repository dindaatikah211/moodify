"use client";

import { ExternalLink, Pause, Play } from "lucide-react";
import Image from "next/image";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
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
    <article className="flex items-center gap-4 p-3">
      <div className="relative size-16 shrink-0">
        {track.coverUrl && (
          <Image
            src={track.coverUrl}
            alt=""
            width={64}
            height={64}
            unoptimized
            className={cn(
              "size-16 rounded-full object-cover ring-1 ring-foreground/20",
              isPlaying && "animate-spin [animation-duration:6s] motion-reduce:animate-none",
            )}
          />
        )}
        <span className="absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background ring-1 ring-foreground/20" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-heading text-lg font-semibold leading-tight">{track.title}</p>
        <p className="truncate text-sm text-foreground/75">{track.artist}</p>
        <div className="mt-1.5 flex gap-3">
          {TRACK_LINK_OPTIONS.map(({ key, label }) => (
            <a
              key={key}
              href={track.links[key]}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-foreground/75 underline-offset-4 hover:text-foreground hover:underline"
            >
              {label}
              <ExternalLink className="size-3" />
            </a>
          ))}
        </div>
      </div>
      <Button
        size="icon"
        disabled={!previewUrl}
        onClick={() => previewUrl && toggle(track.id, previewUrl)}
        aria-label={isPlaying ? TRACK_UI.pause : TRACK_UI.play}
        className={cn(
          "size-11 shrink-0 rounded-full",
          !isPlaying && "bg-foreground text-background hover:bg-foreground/85",
        )}
      >
        <PlayIcon />
      </Button>
    </article>
  );
}