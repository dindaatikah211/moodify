import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";
import { useConversations } from "../components/ConversationProvider";

const CHAT_PATH = "/chat";

export function useConversationNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const { open, startNew } = useConversations();

  const goToChat = useCallback(() => {
    if (pathname !== CHAT_PATH) {
      router.push(CHAT_PATH);
    }
  }, [pathname, router]);

  const openConversation = useCallback(
    async (id: string) => {
      await open(id);
      goToChat();
    },
    [open, goToChat],
  );

  const startNewChat = useCallback(() => {
    startNew();
    goToChat();
  }, [startNew, goToChat]);

  return { openConversation, startNewChat };
}