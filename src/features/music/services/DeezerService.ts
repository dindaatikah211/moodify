import { buildUrl, fetchJson } from "@/shared/lib/Http";
import { DEEZER_BASE_URL } from "../constants/Endpoints";
import { DEEZER_SEARCH_LIMIT, REVALIDATE_SECONDS } from "../constants/Music";
import type { SeedQuery } from "../types/Track";

export type DeezerTrack = {
  id: number;
  title: string;
  link: string;
  preview: string;
  artist: { name: string };
  album: { cover_medium: string };
};

type DeezerSearchResponse = {
  data?: DeezerTrack[];
};

type DeezerTrackResponse = {
  preview?: string;
};

type Picker = (results: DeezerTrack[]) => DeezerTrack | null;

const ALTERNATE_VERSION = /\b(live|acoustic|remix|karaoke|instrumental|demo)\b/i;

const normalize = (value: string) => {
  const cleaned = value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\(.*?\)|\[.*?\]/g, " ")
    .replace(/\s-\s.*$/, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

  return cleaned || value.toLowerCase().trim();
};

const isSameTitle = (seedTitle: string, resultTitle: string) =>
  normalize(seedTitle) === normalize(resultTitle);

const isSameArtist = (seedArtist: string, resultArtist: string) => {
  const seed = normalize(seedArtist);
  const result = normalize(resultArtist);

  return seed === result || result.includes(seed) || seed.includes(result);
};

const stripQuotes = (value: string) => value.replaceAll('"', "");

const toSearchQueries = ({ title, artist }: SeedQuery) => {
  const cleanTitle = stripQuotes(title);

  if (!artist) {
    return [`track:"${cleanTitle}"`, cleanTitle];
  }

  const cleanArtist = stripQuotes(artist);

  return [`artist:"${cleanArtist}" track:"${cleanTitle}"`, `${cleanArtist} ${cleanTitle}`];
};

const preferStudioVersion = (tracks: DeezerTrack[]) =>
  tracks.find((track) => !ALTERNATE_VERSION.test(track.title)) ?? tracks[0] ?? null;

const pickExactMatch =
  ({ title, artist }: SeedQuery): Picker =>
  (results) =>
    preferStudioVersion(
      results.filter(
        (track) =>
          isSameTitle(title, track.title) && (!artist || isSameArtist(artist, track.artist.name)),
      ),
    );

async function fetchResults(query: string): Promise<DeezerTrack[]> {
  const data = await fetchJson<DeezerSearchResponse>(
    buildUrl(`${DEEZER_BASE_URL}/search`, {
      q: query,
      limit: DEEZER_SEARCH_LIMIT,
    }),
    { next: { revalidate: REVALIDATE_SECONDS.deezer } },
  );

  return data.data ?? [];
}

async function searchFirstHit(seed: SeedQuery, pick: Picker): Promise<DeezerTrack | null> {
  for (const query of toSearchQueries(seed)) {
    const hit = pick(await fetchResults(query));

    if (hit) {
      return hit;
    }
  }

  return null;
}

export const findDeezerTrack = (seed: SeedQuery) => searchFirstHit(seed, pickExactMatch(seed));

export const findClosestTrack = (seed: SeedQuery) => searchFirstHit(seed, preferStudioVersion);

export async function getDeezerPreviewUrl(trackId: string): Promise<string | null> {
  const data = await fetchJson<DeezerTrackResponse>(new URL(`${DEEZER_BASE_URL}/track/${trackId}`), {
    cache: "no-store",
  });

  return data.preview || null;
}