export type SeedTrack = {
  title: string;
  artist: string;
};

export type SeedQuery = {
  title: string;
  artist?: string;
};

export type TrackLinks = {
  spotify: string;
  youtubeMusic: string;
  deezer: string | null;
};

export type Track = {
  id: string;
  title: string;
  artist: string;
  coverUrl: string | null;
  previewUrl: string | null;
  links: TrackLinks;
};