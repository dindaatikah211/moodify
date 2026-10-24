import type { ChatStatus } from "ai";
import { useLenis } from "lenis/react";
import { useCallback, useEffect, useRef } from "react";
import { STICK_TO_BOTTOM_THRESHOLD_PX } from "../constants/Scroll";
import type { ChatMessage } from "../types/Chat";

export function useStickToBottom(messages: ChatMessage[], status: ChatStatus) {
  const isPinnedRef = useRef(true);

  const lenis = useLenis((instance) => {
    if (instance.limit - instance.scroll < STICK_TO_BOTTOM_THRESHOLD_PX) {
      isPinnedRef.current = true;
    } else if (instance.direction === -1) {
      isPinnedRef.current = false;
    }
  });

  const scrollToBottom = useCallback(() => {
    if (!lenis) {
      return;
    }

    lenis.resize();
    lenis.scrollTo(lenis.limit, { immediate: true, force: true });
  }, [lenis]);

  const pin = useCallback(() => {
    isPinnedRef.current = true;
    scrollToBottom();
  }, [scrollToBottom]);

  useEffect(() => {
    if (isPinnedRef.current) {
      scrollToBottom();
    }
  }, [messages, status, scrollToBottom]);

  return pin;
}