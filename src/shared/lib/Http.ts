const REQUEST_TIMEOUT_MS = 8000;

export class HttpError extends Error {
  constructor(readonly status: number) {
    super(`Upstream request failed with status ${status}`);
  }
}

type QueryParams = Record<string, string | number>;

export function buildUrl(base: string, params: QueryParams): URL {
  const url = new URL(base);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, String(value));
  });

  return url;
}

export async function fetchJson<T>(url: URL, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    ...init,
  });

  if (!response.ok) {
    throw new HttpError(response.status);
  }

  return response.json() as Promise<T>;
}