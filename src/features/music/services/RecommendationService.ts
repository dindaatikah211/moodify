import type { SeedTrack } from "../types/Track";
import { getSimilarTracks, getTopTracksByTag } from "./LastFmService";
import { resolveTracks } from "./TrackResolverService";

export async function recommendSimilarTo(seed: SeedTrack) {
  return resolveTracks(await getSimilarTracks(seed));
}

export async function recommendByMood(tag: string) {
  return resolveTracks(await getTopTracksByTag(tag));
}