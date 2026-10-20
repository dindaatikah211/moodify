import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { requireEnv } from "@/shared/lib/Env";
import { prisma } from "@/shared/lib/Prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  socialProviders: {
    google: {
      clientId: requireEnv("GOOGLE_CLIENT_ID"),
      clientSecret: requireEnv("GOOGLE_CLIENT_SECRET"),
    },
  },
  plugins: [nextCookies()],
});