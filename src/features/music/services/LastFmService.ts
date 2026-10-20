import { requireEnv } from "@/shared/lib/Env";
import { buildUrl, fetchJson } from "@/shared/lib/Http";
import { LASTFM_BASE_URL } from "../constants/Endpoints";
import {
  REVALIDATE_SECONDS,
  SIMILAR_TRACKS_LIMIT,
  TAG_TRACKS_LIMIT,
} from "../constants/Music";
import type { SeedTrack } from "../types/Track";

type LastFmTrack = {
  name: string;
  artist: { name: string };
};

type LastFmErrorPayload = {
  error?: number;
  message?: string;
};

type SimilarTracksResponse = LastFmErrorPayload & {
  similartracks?: { track: LastFmTrack[] };
};

type TagTracksResponse = LastFmErrorPayload & {
  tracks?: { track: LastFmTrack[] };
};

export class LastFmError extends Error {
  constructor(readonly code: number, message: string) {
    super(`Last.fm error ${code}: ${message}`);
  }
}

const toSeedTrack = ({ name, artist }: LastFmTrack): SeedTrack => ({
  title: name,
  artist: artist.name,
});

async function callLastFm<T extends LastFmErrorPayload>(
  method: string,
  params: Record<string, string | number>,
): Promise<T> {
  const data = await fetchJson<T>(
    buildUrl(LASTFM_BASE_URL, {
      method,
      api_key: requireEnv("LASTFM_API_KEY"),
      format: "json",
      ...params,
    }),
    { next: { revalidate: REVALIDATE_SECONDS.lastFm } },
  );

  if (data.error) {
    throw new LastFmError(data.error, data.message ?? "Unknown error");
  }

  return data;
}

export async function getSimilarTracks({ title, artist }: SeedTrack): Promise<SeedTrack[]> {
  const data = await callLastFm<SimilarTracksResponse>("track.getSimilar", {
    track: title,
    artist,
    limit: SIMILAR_TRACKS_LIMIT,
    autocorrect: 1,
  });

  return data.similartracks?.track.map(toSeedTrack) ?? [];
}

export async function getTopTracksByTag(tag: string): Promise<SeedTrack[]> {
  const data = await callLastFm<TagTracksResponse>("tag.getTopTracks", {
    tag,
    limit: TAG_TRACKS_LIMIT,
  });

  return data.tracks?.track.map(toSeedTrack) ?? [];
}