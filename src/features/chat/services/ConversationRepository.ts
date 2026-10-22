import type { Prisma } from "@/generated/prisma";
import { prisma } from "@/shared/lib/Prisma";
import type { ChatMessage } from "../types/Chat";
import type { ConversationSummary, StoredConversation } from "../types/Conversation";
import { isTextPart } from "../utils/PartGuards";

const TITLE_MAX_LENGTH = 60;
const DEFAULT_TITLE = "Obrolan baru";
const LIST_LIMIT = 50;

type SaveConversationInput = {
  id: string;
  userId: string;
  messages: ChatMessage[];
};

type StoredRow = {
  id: string;
  messages: Prisma.JsonValue;
};

const toTitle = (messages: ChatMessage[]) => {
  const firstText = messages
    .filter((message) => message.role === "user")
    .flatMap((message) => message.parts)
    .find(isTextPart);

  return (firstText?.text ?? DEFAULT_TITLE).slice(0, TITLE_MAX_LENGTH);
};

const toJson = (messages: ChatMessage[]) => messages as unknown as Prisma.InputJsonValue;

const toStored = ({ id, messages }: StoredRow): StoredConversation => ({
  id,
  messages: messages as unknown as ChatMessage[],
});

export async function findLatestConversation(userId: string): Promise<StoredConversation | null> {
  const row = await prisma.conversation.findFirst({
    where: { userId },
    orderBy: { updatedAt: "desc" },
    select: { id: true, messages: true },
  });

  return row ? toStored(row) : null;
}

export async function findConversation(
  id: string,
  userId: string,
): Promise<StoredConversation | null> {
  const row = await prisma.conversation.findFirst({
    where: { id, userId },
    select: { id: true, messages: true },
  });

  return row ? toStored(row) : null;
}

export async function listConversations(userId: string): Promise<ConversationSummary[]> {
  const rows = await prisma.conversation.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
    take: LIST_LIMIT,
    select: { id: true, title: true, updatedAt: true },
  });

  return rows.map(({ id, title, updatedAt }) => ({
    id,
    title,
    updatedAt: updatedAt.toISOString(),
  }));
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

export async function deleteConversation(id: string, userId: string): Promise<boolean> {
  const [, deleted] = await prisma.$transaction([
    prisma.moodEntry.deleteMany({ where: { userId, conversationId: id } }),
    prisma.conversation.deleteMany({ where: { id, userId } }),
  ]);

  return deleted.count > 0;
}