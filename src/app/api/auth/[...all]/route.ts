import { toNextJsHandler } from "better-auth/next-js";
import { auth } from "@/features/auth/services/Auth";

export const { GET, POST } = toNextJsHandler(auth);