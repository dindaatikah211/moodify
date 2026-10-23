"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { BeforeInstallPromptEvent } from "../types/BeforeInstallPromptEvent";

type PwaContextValue = {
  canPrompt: boolean;
  isIos: boolean;
  isStandalone: boolean;
  install: () => Promise<void>;
};

type PwaProviderProps = {
  children: ReactNode;
};

const PwaContext = createContext<PwaContextValue | null>(null);

const subscribeToNothing = () => () => undefined;
const detectIos = () => /iphone|ipad|ipod/i.test(navigator.userAgent);
const detectStandalone = () => window.matchMedia("(display-mode: standalone)").matches;
const notOnServer = () => false;

export function PwaProvider({ children }: PwaProviderProps) {
  const [promptEvent, setPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const isIos = useSyncExternalStore(subscribeToNothing, detectIos, notOnServer);
  const isStandalone = useSyncExternalStore(subscribeToNothing, detectStandalone, notOnServer);

  useEffect(() => {
    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/", updateViaCache: "none" })
        .catch(() => undefined);
    }

    const handlePrompt = (event: Event) => {
      event.preventDefault();
      setPromptEvent(event as BeforeInstallPromptEvent);
    };
    const handleInstalled = () => setPromptEvent(null);

    window.addEventListener("beforeinstallprompt", handlePrompt);
    window.addEventListener("appinstalled", handleInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handlePrompt);
      window.removeEventListener("appinstalled", handleInstalled);
    };
  }, []);

  const install = useCallback(async () => {
    if (!promptEvent) {
      return;
    }

    await promptEvent.prompt();
    setPromptEvent(null);
  }, [promptEvent]);

  const value = useMemo(
    () => ({ canPrompt: promptEvent !== null, isIos, isStandalone, install }),
    [promptEvent, isIos, isStandalone, install],
  );

  return <PwaContext.Provider value={value}>{children}</PwaContext.Provider>;
}

export function usePwa() {
  const context = useContext(PwaContext);

  if (!context) {
    throw new Error("usePwa must be used within PwaProvider");
  }

  return context;
}