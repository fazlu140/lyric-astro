/**
 * Picks an asset by file name, whatever its extension, from an
 * `import.meta.glob` result. Lets a Figma stand-in (`.png`) be swapped for the
 * real file (`.avif`) without touching the component that uses it.
 */
export function pickAsset(
  files: Record<string, { default: ImageMetadata }>,
  name: string,
): ImageMetadata {
  const match = Object.entries(files).find(
    ([path]) => path.split("/").pop()!.replace(/\.\w+$/, "") === name,
  );
  if (!match) throw new Error(`[assets] No file named "${name}" in the glob.`);
  return match[1].default;
}

/** All matches of a glob, sorted by file name, so `01-`, `02-` set the order. */
export function sortedAssets(
  files: Record<string, { default: ImageMetadata }>,
): { name: string; src: ImageMetadata }[] {
  return Object.entries(files)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([path, module]) => ({
      name: path.split("/").pop()!.replace(/\.\w+$/, ""),
      src: module.default,
    }));
}
