import { useCallback, useEffect, useRef, useState } from "react";

export function useAudioPreview() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const stop = useCallback(() => {
    audioRef.current?.pause();
    audioRef.current = null;
    setPlayingId(null);
  }, []);

  const toggle = useCallback(
    (id: string, url: string) => {
      const isCurrent = playingId === id;
      stop();

      if (isCurrent) {
        return;
      }

      const audio = new Audio(url);
      audio.addEventListener("ended", stop);
      audioRef.current = audio;
      setPlayingId(id);
      audio.play().catch(stop);
    },
    [playingId, stop],
  );

  useEffect(() => stop, [stop]);

  return { playingId, toggle };
}