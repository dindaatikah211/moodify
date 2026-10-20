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

const ALTERNATE_VERSION = /\b(live|acoustic|remix|karaoke|instrumental|demo)\b/i;

const stripQuotes = (value: string) => value.replaceAll('"', "");

const toSearchQueries = ({ title, artist }: SeedQuery) => {
  const cleanTitle = stripQuotes(title);

  if (!artist) {
    return [`track:"${cleanTitle}"`, cleanTitle];
  }

  const cleanArtist = stripQuotes(artist);

  return [`artist:"${cleanArtist}" track:"${cleanTitle}"`, `${cleanArtist} ${cleanTitle}`];
};

const pickStudioVersion = (results: DeezerTrack[]) =>
  results.find((track) => !ALTERNATE_VERSION.test(track.title)) ?? results[0] ?? null;

async function searchDeezer(query: string): Promise<DeezerTrack | null> {
  const data = await fetchJson<DeezerSearchResponse>(
    buildUrl(`${DEEZER_BASE_URL}/search`, {
      q: query,
      limit: DEEZER_SEARCH_LIMIT,
    }),
    { next: { revalidate: REVALIDATE_SECONDS.deezer } },
  );

  return pickStudioVersion(data.data ?? []);
}

export async function findDeezerTrack(seed: SeedQuery): Promise<DeezerTrack | null> {
  for (const query of toSearchQueries(seed)) {
    const match = await searchDeezer(query);

    if (match) {
      return match;
    }
  }

  return null;
}