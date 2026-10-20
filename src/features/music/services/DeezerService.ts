import { buildUrl, fetchJson } from "@/shared/lib/Http";
import { DEEZER_BASE_URL } from "../constants/Endpoints";
import { DEEZER_SEARCH_LIMIT, REVALIDATE_SECONDS } from "../constants/Music";
import type { SeedTrack } from "../types/Track";

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

const stripQuotes = (value: string) => value.replaceAll('"', "");

const toSearchQueries = ({ title, artist }: SeedTrack) => {
  const cleanTitle = stripQuotes(title);
  const cleanArtist = stripQuotes(artist);

  return [
    `artist:"${cleanArtist}" track:"${cleanTitle}"`,
    `${cleanArtist} ${cleanTitle}`,
  ];
};

async function searchDeezer(query: string): Promise<DeezerTrack | null> {
  const data = await fetchJson<DeezerSearchResponse>(
    buildUrl(`${DEEZER_BASE_URL}/search`, {
      q: query,
      limit: DEEZER_SEARCH_LIMIT,
    }),
    { next: { revalidate: REVALIDATE_SECONDS.deezer } },
  );

  return data.data?.[0] ?? null;
}

export async function findDeezerTrack(seed: SeedTrack): Promise<DeezerTrack | null> {
  for (const query of toSearchQueries(seed)) {
    const match = await searchDeezer(query);

    if (match) {
      return match;
    }
  }

  return null;
}