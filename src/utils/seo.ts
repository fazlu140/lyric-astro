import { NOINDEX_ROUTES } from "../consts.ts";

/**
 * This is a practice rebuild of lyric.tech: the design and copy are the
 * client's, so no page may appear in search engines. Every route is
 * noindex until this is deliberately switched to `true` at launch, and
 * `vercel.json` and `robots.txt` back it up.
 */
export const ALLOW_INDEXING = false;

const normalize = (path: string) => `/${path.replace(/^\/+|\/+$/g, "")}`;

const excluded = new Set(NOINDEX_ROUTES.map(normalize));

/** Checks whether a route should be hidden from search. Used by BaseHead and the sitemap. */
export function isNoindexRoute(pathname: string): boolean {
  return !ALLOW_INDEXING || excluded.has(normalize(pathname));
}
