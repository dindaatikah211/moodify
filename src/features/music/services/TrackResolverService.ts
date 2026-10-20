import type { Track, SeedTrack } from "../types/Track";
import { findDeezerTrack, type DeezerTrack } from "./DeezerService";
import { buildTrackLinks } from "./TrackLinkService";

const toTrack = (match: DeezerTrack): Track => ({
  id: String(match.id),
  title: match.title,
  artist: match.artist.name,
  coverUrl: match.album.cover_medium,
  previewUrl: match.preview || null,
  links: buildTrackLinks({ title: match.title, artist: match.artist.name }, match.link),
});

const isPresent = <T>(value: T | null): value is T => value !== null;

const uniqueById = (tracks: Track[]) => [...new Map(tracks.map((track) => [track.id, track])).values()];

export async function resolveTracks(seeds: SeedTrack[]): Promise<Track[]> {
  const matches = await Promise.all(
    seeds.map((seed) => findDeezerTrack(seed).catch(() => null)),
  );

  return uniqueById(matches.filter(isPresent).map(toTrack));
}