import { useCallback, useEffect, useRef, useState } from "react";
import { fetchFreshPreview } from "../services/PreviewApi";

export function useAudioPreview() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const stop = useCallback(() => {
    audioRef.current?.pause();
    audioRef.current = null;
    setPlayingId(null);
  }, []);

  const attempt = useCallback(
    async (id: string, url: string) => {
      const audio = new Audio(url);
      audio.addEventListener("ended", stop);
      audioRef.current = audio;
      setPlayingId(id);

      const started = await audio.play().then(
        () => true,
        () => false,
      );

      return { audio, started };
    },
    [stop],
  );

  const toggle = useCallback(
    async (id: string, url: string) => {
      const isCurrent = playingId === id;
      stop();

      if (isCurrent) {
        return;
      }

      const first = await attempt(id, url);

      if (first.started || audioRef.current !== first.audio) {
        return;
      }

      const freshUrl = await fetchFreshPreview(id).catch(() => null);

      if (audioRef.current !== first.audio) {
        return;
      }

      stop();

      if (!freshUrl) {
        return;
      }

      const second = await attempt(id, freshUrl);

      if (!second.started && audioRef.current === second.audio) {
        stop();
      }
    },
    [attempt, playingId, stop],
  );

  useEffect(() => stop, [stop]);

  return { playingId, toggle };
}