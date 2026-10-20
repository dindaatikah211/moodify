"use client";

import { motion } from "motion/react";
import { fadeUp } from "@/shared/constants/Variants";
import { cn } from "@/shared/lib/utils";
import type { ChatMessage } from "../types/Chat";
import { isMusicToolPart } from "../utils/PartGuards";
import MessagePart from "./MessagePart";
import ToolResults from "./ToolResults";

type MessageBubbleProps = {
  message: ChatMessage;
};

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";
  const toolParts = message.parts.filter(isMusicToolPart);
  const firstToolIndex = message.parts.findIndex(isMusicToolPart);

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className={cn("flex flex-col gap-2", isUser ? "items-end" : "items-start")}
    >
      {message.parts.map((part, index) => {
        const key = `${message.id}-${index}`;

        if (isMusicToolPart(part)) {
          return index === firstToolIndex ? <ToolResults key={key} parts={toolParts} /> : null;
        }

        return <MessagePart key={key} part={part} isUser={isUser} />;
      })}
    </motion.div>
  );
}