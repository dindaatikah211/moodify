import { useEffect, useSyncExternalStore } from "react";

let isBusy = false;
const listeners = new Set<() => void>();

const subscribe = (listener: () => void) => {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
};

const setChatBusy = (value: boolean) => {
  if (isBusy === value) {
    return;
  }

  isBusy = value;
  listeners.forEach((listener) => listener());
};

export const useChatBusy = () =>
  useSyncExternalStore(
    subscribe,
    () => isBusy,
    () => false,
  );

export function useReportChatBusy(value: boolean) {
  useEffect(() => {
    setChatBusy(value);

    return () => setChatBusy(false);
  }, [value]);
}