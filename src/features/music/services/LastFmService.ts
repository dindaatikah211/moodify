import { requireEnv } from "@/shared/lib/Env";
import { buildUrl, fetchJson } from "@/shared/lib/Http";
import { LASTFM_BASE_URL } from "../constants/Endpoints";
import {
  IGNORED_TAGS,
  LASTFM_NOT_FOUND_CODE,
  REVALIDATE_SECONDS,
  SIMILAR_TRACKS_LIMIT,
  TAG_TRACKS_LIMIT,
  TRACK_TAGS_LIMIT,
} from "../constants/Music";
import type { SeedTrack } from "../types/Track";

type QueryParams = Record<string, string | number>;

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

type TrackTagsResponse = LastFmErrorPayload & {
  toptags?: { tag: { name: string }[] };
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

const isUsefulTag = (name: string, artist: string) => {
  const tag = name.toLowerCase();
  return !IGNORED_TAGS.includes(tag) && !tag.includes(artist.toLowerCase());
};

async function callLastFm<T extends LastFmErrorPayload>(
  method: string,
  params: QueryParams,
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

const callOrEmpty = <T extends LastFmErrorPayload>(method: string, params: QueryParams) =>
  callLastFm<T>(method, params).catch((error: unknown) => {
    if (error instanceof LastFmError && error.code === LASTFM_NOT_FOUND_CODE) {
      return {} as T;
    }

    throw error;
  });

export async function getSimilarTracks({ title, artist }: SeedTrack): Promise<SeedTrack[]> {
  const data = await callOrEmpty<SimilarTracksResponse>("track.getSimilar", {
    track: title,
    artist,
    limit: SIMILAR_TRACKS_LIMIT,
    autocorrect: 1,
  });

  return data.similartracks?.track.map(toSeedTrack) ?? [];
}

export async function getTopTracksByTag(tag: string): Promise<SeedTrack[]> {
  const data = await callOrEmpty<TagTracksResponse>("tag.getTopTracks", {
    tag,
    limit: TAG_TRACKS_LIMIT,
  });

  return data.tracks?.track.map(toSeedTrack) ?? [];
}

export async function getTrackTopTags({ title, artist }: SeedTrack): Promise<string[]> {
  const data = await callOrEmpty<TrackTagsResponse>("track.getTopTags", {
    track: title,
    artist,
    autocorrect: 1,
  });

  return (data.toptags?.tag ?? [])
    .map(({ name }) => name)
    .filter((name) => isUsefulTag(name, artist))
    .slice(0, TRACK_TAGS_LIMIT);
}