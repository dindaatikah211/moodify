export const SIMILAR_TRACKS_LIMIT = 50;
export const TAG_TRACKS_LIMIT = 50;
export const TRACK_TAGS_LIMIT = 3;
export const DEEZER_SEARCH_LIMIT = 5;
export const RESULTS_PER_REQUEST = 8;
export const RESOLVE_CHUNK_SIZE = 8;
export const LASTFM_NOT_FOUND_CODE = 6;

export const IGNORED_TAGS: ReadonlyArray<string> = [
  "seen live",
  "favorites",
  "favourites",
  "favorite",
  "love at first listen",
  "awesome",
  "good",
  "best",
];

export const REVALIDATE_SECONDS = {
  lastFm: 3600,
  deezer: 300,
} as const;