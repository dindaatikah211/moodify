export async function fetchFreshPreview(trackId: string): Promise<string> {
  const response = await fetch(`/api/music/preview/${trackId}`);

  if (!response.ok) {
    throw new Error(`Failed to refresh preview: ${response.status}`);
  }

  const { previewUrl } = (await response.json()) as { previewUrl: string };

  return previewUrl;
}