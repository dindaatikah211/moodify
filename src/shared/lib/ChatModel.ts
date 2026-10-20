import { google } from "@ai-sdk/google";
import { CHAT_MODEL_ID } from "@/shared/constants/Ai";

export const chatModel = google(CHAT_MODEL_ID);