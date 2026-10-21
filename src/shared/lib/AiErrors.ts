import { ERROR_CODES } from "@/shared/constants/ErrorCodes";

const CAPACITY_PATTERN = /quota|rate.?limit|resource.?exhausted|overloaded|\b429\b|\b503\b/i;

export function toClientErrorCode(error: unknown): string {
  const message = error instanceof Error ? error.message : String(error);

  return CAPACITY_PATTERN.test(message) ? ERROR_CODES.modelBusy : ERROR_CODES.stream;
}