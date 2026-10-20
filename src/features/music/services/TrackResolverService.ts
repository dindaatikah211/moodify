import { RESOLVE_CHUNK_SIZE } from "../constants/Music";
import type { SeedQuery, Track } from "../types/Track";
import { findDeezerTrack, type DeezerTrack } from "./DeezerService";
import { buildTrackLinks } from "./TrackLinkService";

type ResolveOptions = {
  limit: number;
  excludeIds: ReadonlySet<string>;
};

const toTrack = (match: DeezerTrack): Track => ({
  id: String(match.id),
  title: match.title,
  artist: match.artist.name,
  coverUrl: match.album.cover_medium,
  previewUrl: match.preview || null,
  links: buildTrackLinks({ title: match.title, artist: match.artist.name }, match.link),
});

const isPresent = <T>(value: T | null): value is T => value !== null;

async function resolveChunk(seeds: SeedQuery[]): Promise<Track[]> {
  const matches = await Promise.all(
    seeds.map((seed) => findDeezerTrack(seed).catch(() => null)),
  );

  return matches.filter(isPresent).map(toTrack);
}

export async function resolveTracks(
  seeds: SeedQuery[],
  { limit, excludeIds }: ResolveOptions,
): Promise<Track[]> {
  const collected = new Map<string, Track>();

  for (let start = 0; start < seeds.length && collected.size < limit; start += RESOLVE_CHUNK_SIZE) {
    const tracks = await resolveChunk(seeds.slice(start, start + RESOLVE_CHUNK_SIZE));

    tracks
      .filter((track) => !excludeIds.has(track.id))
      .forEach((track) => collected.set(track.id, track));
  }

  return [...collected.values()].slice(0, limit);
}