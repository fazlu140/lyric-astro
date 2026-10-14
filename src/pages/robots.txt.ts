import type { APIRoute } from "astro";
import { ALLOW_INDEXING } from "@/utils/seo.ts";

/* Blocks every crawler, search engines and AI scrapers alike, while
   ALLOW_INDEXING is off (see src/utils/seo.ts) */
export const GET: APIRoute = ({ site }) => {
  const lines = ALLOW_INDEXING ? ["User-agent: *", "Allow: /"] : ["User-agent: *", "Disallow: /"];

  if (ALLOW_INDEXING && site) {
    lines.push("", `Sitemap: ${new URL("sitemap-index.xml", site).href}`);
  }

  return new Response(`${lines.join("\n")}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
