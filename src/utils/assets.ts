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

type Remote = { src: string; width: number; height: number };

/**
 * The local file named `name` if `npm run fetch-assets` has saved it,
 * otherwise the remote original. Lets a page ship before its media is in
 * the repo, with no stand-ins to swap later.
 */
export function assetOr(
  files: Record<string, { default: ImageMetadata }>,
  name: string,
  remote: Remote,
): { src: ImageMetadata | string; width: number; height: number } {
  const match = Object.entries(files).find(
    ([path]) => path.split("/").pop()!.replace(/\.\w+$/, "") === name,
  );
  if (!match) return remote;
  const local = match[1].default;
  /* SVGs import as components; pass their URL instead */
  const src = local.format === "svg" ? local.src : local;
  return { src, width: local.width, height: local.height };
}
