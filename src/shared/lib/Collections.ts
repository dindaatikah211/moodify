export function interleave<T>(lists: T[][]): T[] {
  const longest = Math.max(0, ...lists.map((list) => list.length));

  return Array.from({ length: longest }, (_, index) => lists.map((list) => list[index]))
    .flat()
    .filter((item): item is T => item !== undefined);
}