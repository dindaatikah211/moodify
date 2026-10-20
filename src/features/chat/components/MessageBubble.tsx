"use client";

import { motion } from "motion/react";
import { fadeUp } from "@/shared/constants/Variants";
import { cn } from "@/shared/lib/utils";
import type { ChatMessage } from "../types/Chat";
import MessagePart from "./MessagePart";

type MessageBubbleProps = {
  message: ChatMessage;
};

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className={cn("flex flex-col gap-2", isUser ? "items-end" : "items-start")}
    >
      {message.parts.map((part, index) => (
        <MessagePart key={`${message.id}-${index}`} part={part} isUser={isUser} />
      ))}
    </motion.div>
  );
}