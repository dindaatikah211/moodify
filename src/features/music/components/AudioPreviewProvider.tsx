"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useAudioPreview } from "../hooks/useAudioPreview";

type AudioPreviewValue = ReturnType<typeof useAudioPreview>;

type AudioPreviewProviderProps = {
  children: ReactNode;
};

const AudioPreviewContext = createContext<AudioPreviewValue | null>(null);

export function AudioPreviewProvider({ children }: AudioPreviewProviderProps) {
  const value = useAudioPreview();

  return <AudioPreviewContext.Provider value={value}>{children}</AudioPreviewContext.Provider>;
}

export function useAudioPreviewContext() {
  const context = useContext(AudioPreviewContext);

  if (!context) {
    throw new Error("useAudioPreviewContext must be used within AudioPreviewProvider");
  }

  return context;
}