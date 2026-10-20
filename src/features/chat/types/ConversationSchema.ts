import { z } from "zod";

export const MAX_STORED_MESSAGES = 200;

const storedPartSchema = z.looseObject({ type: z.string() });

const storedMessageSchema = z.looseObject({
  id: z.string(),
  role: z.enum(["user", "assistant"]),
  parts: z.array(storedPartSchema),
});

export const saveConversationBodySchema = z.object({
  messages: z.array(storedMessageSchema).min(1).max(MAX_STORED_MESSAGES),
});