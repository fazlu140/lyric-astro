import { createClient, type QueryParams } from "@sanity/client";
import { stegaClean } from "@sanity/client/stega";
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { toHTML } from "@portabletext/to-html";
import {
  apiVersion,
  dataset,
  isSanityConfigured,
  projectId,
  readToken,
  studioUrl,
  visualEditing,
} from "./env.ts";

/**
 * Read-only client. Production: published content, read at build time, no
 * token. Preview (Visual Editing): drafts, read per request on the server
 * with a viewer token, and "stega": invisible characters inside each string
 * that tell the Studio which field it came from, so clicking text on the
 * page opens that field. The token never reaches the browser.
 */
const client = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      ...(visualEditing
        ? {
            perspective: "drafts",
            token: readToken,
            stega: { enabled: true, studioUrl },
          }
        : { perspective: "published" }),
    })
  : null;

/** Removes the invisible edit markers: for URLs, attributes, <head> and comparisons. */
export const clean = <T>(value: T): T => stegaClean(value) as T;

/** Runs a GROQ query. Returns `null` when Sanity isn't set up yet. */
export async function sanityFetch<T>(query: string, params: QueryParams = {}): Promise<T | null> {
  if (!client) return null;
  return client.fetch<T>(query, params);
}

const builder = client ? createImageUrlBuilder(client) : null;

/** Image URL on Sanity's CDN, resized or cropped on the fly (e.g. `.width(1200)`). */
export const urlFor = (source: SanityImageSource) => {
  if (!builder) throw new Error("[sanity] urlFor called before Sanity is configured.");
  return builder.image(source).auto("format");
};

/**
 * Portable Text to HTML for the components that take HTML (the FAQ). The
 * defaults cover paragraphs, lists, bold, italic and links; links to other
 * sites open as usual, internal ones stay relative.
 */
export const portableTextToHtml = (blocks: unknown) =>
  toHTML(blocks as Parameters<typeof toHTML>[0], {
    components: {
      marks: {
        link: ({ children, value }) => {
          const href = String(value?.href ?? "");
          const external = /^https?:\/\//.test(href) && !href.startsWith("https://lyric.tech");
          return `<a href="${href}"${external ? ' rel="noopener"' : ""}>${children}</a>`;
        },
      },
    },
  });
