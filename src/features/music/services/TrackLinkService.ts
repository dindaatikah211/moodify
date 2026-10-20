import { SPOTIFY_SEARCH_URL, YOUTUBE_MUSIC_SEARCH_URL } from "../constants/Endpoints";
import type { SeedTrack, TrackLinks } from "../types/Track";

const toQuery = ({ title, artist }: SeedTrack) => encodeURIComponent(`${title} ${artist}`);

export const buildTrackLinks = (seed: SeedTrack, deezerLink: string | null): TrackLinks => ({
  spotify: `${SPOTIFY_SEARCH_URL}/${toQuery(seed)}`,
  youtubeMusic: `${YOUTUBE_MUSIC_SEARCH_URL}?q=${toQuery(seed)}`,
  deezer: deezerLink,
});