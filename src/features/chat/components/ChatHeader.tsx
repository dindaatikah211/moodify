import CatMark from "@/shared/components/commons/CatMark";
import { CHAT_COPY } from "../constants/ChatUi";

export default function ChatHeader() {
  return (
    <header className="sticky top-0 z-10 flex items-center gap-2 bg-background py-4">
      <CatMark size={36} />
      <span className="font-heading text-2xl font-semibold tracking-tight">{CHAT_COPY.title}</span>
    </header>
  );
}