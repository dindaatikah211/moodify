import { ERROR_CODES } from "@/shared/constants/ErrorCodes";
import { CHAT_COPY } from "../constants/ChatUi";

type ErrorPayload = {
  error?: string;
  scope?: string;
};

const parsePayload = (message: string): ErrorPayload => {
  try {
    return JSON.parse(message) as ErrorPayload;
  } catch {
    return {};
  }
};

export function describeChatError(error: Error): string {
  if (error.message === ERROR_CODES.modelBusy) {
    return CHAT_COPY.modelBusy;
  }

  const { error: code, scope } = parsePayload(error.message);

  if (code === "rate_limited") {
    return scope === "day" ? CHAT_COPY.dailyLimit : CHAT_COPY.burstLimit;
  }

  if (code === "unauthorized") {
    return CHAT_COPY.sessionExpired;
  }

  return CHAT_COPY.requestError;
}