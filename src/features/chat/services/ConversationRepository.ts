import type { Prisma } from "@/generated/prisma";
import { prisma } from "@/shared/lib/Prisma";
import type { ChatMessage } from "../types/Chat";
import type { StoredConversation } from "../types/Conversation";
import { isTextPart } from "../utils/PartGuards";

const TITLE_MAX_LENGTH = 60;
const DEFAULT_TITLE = "Obrolan baru";

type SaveConversationInput = {
  id: string;
  userId: string;
  messages: ChatMessage[];
};

const toTitle = (messages: ChatMessage[]) => {
  const firstText = messages
    .filter((message) => message.role === "user")
    .flatMap((message) => message.parts)
    .find(isTextPart);

  return (firstText?.text ?? DEFAULT_TITLE).slice(0, TITLE_MAX_LENGTH);
};

const toJson = (messages: ChatMessage[]) => messages as unknown as Prisma.InputJsonValue;

export async function findLatestConversation(userId: string): Promise<StoredConversation | null> {
  const conversation = await prisma.conversation.findFirst({
    where: { userId },
    orderBy: { updatedAt: "desc" },
    select: { id: true, messages: true },
  });

  if (!conversation) {
    return null;
  }

  return { id: conversation.id, messages: conversation.messages as unknown as ChatMessage[] };
}

export async function saveConversation({
  id,
  userId,
  messages,
}: SaveConversationInput): Promise<boolean> {
  const existing = await prisma.conversation.findUnique({
    where: { id },
    select: { userId: true },
  });

  if (existing && existing.userId !== userId) {
    return false;
  }

  const data = { title: toTitle(messages), messages: toJson(messages) };

  await prisma.conversation.upsert({
    where: { id },
    create: { id, userId, ...data },
    update: data,
  });

  return true;
}