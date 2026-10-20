import type { ChatPart } from "../types/Chat";
import { isMusicToolPart } from "../utils/PartGuards";
import TextBubble from "./TextBubble";
import ToolResult from "./ToolResult";

type MessagePartProps = {
  part: ChatPart;
  isUser: boolean;
};

export default function MessagePart({ part, isUser }: MessagePartProps) {
  if (part.type === "text") {
    return part.text ? <TextBubble text={part.text} isUser={isUser} /> : null;
  }

  if (isMusicToolPart(part)) {
    return <ToolResult part={part} />;
  }

  return null;
}