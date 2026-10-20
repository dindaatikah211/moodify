import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@/generated/prisma";
import { requireEnv } from "./Env";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

const createClient = () =>
  new PrismaClient({
    adapter: new PrismaNeon({ connectionString: requireEnv("DATABASE_URL") }),
  });

export const prisma = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}