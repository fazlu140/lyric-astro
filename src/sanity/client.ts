import { createClient, type QueryParams } from "@sanity/client";
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { toHTML } from "@portabletext/to-html";
import { apiVersion, dataset, isSanityConfigured, projectId } from "./env.ts";

/**
 * Read-only client for published content. The site is static, so this runs
 * at build time only: no Sanity code or token ever reaches the browser.
 */
const client = isSanityConfigured
  ? createClient({ projectId, dataset, apiVersion, useCdn: false, perspective: "published" })
  : null;

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
