import type { ChatPart } from "../types/Chat";
import TextBubble from "./TextBubble";

type MessagePartProps = {
  part: ChatPart;
  isUser: boolean;
};

export default function MessagePart({ part, isUser }: MessagePartProps) {
  if (part.type !== "text" || !part.text) {
    return null;
  }

  return <TextBubble text={part.text} isUser={isUser} />;
}