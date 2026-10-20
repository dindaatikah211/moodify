import type { ChatStatus } from "ai";
import { useLenis } from "lenis/react";
import { useCallback, useEffect, useRef } from "react";
import { STICK_TO_BOTTOM_THRESHOLD_PX } from "../constants/Scroll";
import type { ChatMessage } from "../types/Chat";

export function useStickToBottom(messages: ChatMessage[], status: ChatStatus) {
  const isNearBottomRef = useRef(true);

  const lenis = useLenis((instance) => {
    isNearBottomRef.current = instance.limit - instance.scroll < STICK_TO_BOTTOM_THRESHOLD_PX;
  });

  const stick = useCallback(() => {
    isNearBottomRef.current = true;
  }, []);

  useEffect(() => {
    if (isNearBottomRef.current) {
      lenis?.scrollTo("bottom");
    }
  }, [lenis, messages, status]);

  return stick;
}