import { interleave } from "@/shared/lib/Collections";
import { RESULTS_PER_REQUEST } from "../constants/Music";
import type { SeedQuery, SeedTrack, Track } from "../types/Track";
import { findClosestTrack, type DeezerTrack } from "./DeezerService";
import { getSimilarTracks, getTopTracksByTag, getTrackTopTags } from "./LastFmService";
import { resolveTracks } from "./TrackResolverService";

type ExcludeIds = ReadonlySet<string>;

const collect = (seeds: SeedQuery[], excludeIds: ExcludeIds) =>
  resolveTracks(seeds, { limit: RESULTS_PER_REQUEST, excludeIds });

const toSeed = (query: SeedQuery, anchor: DeezerTrack | null): SeedTrack | null => {
  if (query.artist) {
    return { title: query.title, artist: query.artist };
  }

  return anchor ? { title: anchor.title, artist: anchor.artist.name } : null;
};

async function getTagCandidates(seed: SeedTrack): Promise<SeedTrack[]> {
  const tags = await getTrackTopTags(seed);
  return interleave(await Promise.all(tags.map(getTopTracksByTag)));
}

export async function recommendSimilarTo(
  query: SeedQuery,
  excludeIds: ExcludeIds,
): Promise<Track[]> {
  const anchor = await findClosestTrack(query).catch(() => null);
  const seed = toSeed(query, anchor);

  if (!seed) {
    return [];
  }

  const blocked = anchor ? new Set([...excludeIds, String(anchor.id)]) : excludeIds;
  const similar = await getSimilarTracks(seed);
  const candidates = similar.length > 0 ? similar : await getTagCandidates(seed);

  return collect(candidates, blocked);
}

export async function recommendByMood(tag: string, excludeIds: ExcludeIds): Promise<Track[]> {
  return collect(await getTopTracksByTag(tag), excludeIds);
}

export const verifySuggestions = (tracks: SeedTrack[], excludeIds: ExcludeIds) =>
  collect(tracks, excludeIds);