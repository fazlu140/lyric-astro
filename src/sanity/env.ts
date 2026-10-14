/**
 * Where the content lives. The project ID is public (it appears in every
 * API URL), so it is fine in the browser and in git; it lives in `.env` so
 * a fork or a staging copy can point at another project without code
 * changes. Copy `.env.example` to `.env` and fill it in.
 */
const env = (import.meta as ImportMeta & { env?: Record<string, string | undefined> }).env ?? {};
const read = (key: string) =>
  env[key] ?? (typeof process !== "undefined" ? process.env[key] : undefined);

/* PUBLIC_ in the Astro site; SANITY_STUDIO_ in the hosted Studio
   (`npx sanity deploy`), which only exposes that prefix. sanity.cli.ts
   copies one to the other, so .env needs only the PUBLIC_ pair. */
export const projectId =
  read("PUBLIC_SANITY_PROJECT_ID") ?? read("SANITY_STUDIO_PROJECT_ID") ?? "";
export const dataset =
  read("PUBLIC_SANITY_DATASET") ?? read("SANITY_STUDIO_DATASET") ?? "production";

/** The API date the queries are written against. Bump on purpose, not by habit. */
export const apiVersion = "2026-10-01";

/** Until a project ID is set, the site builds from the local data files. */
export const isSanityConfigured = projectId.length > 0;

/** Where the embedded Studio lives on the site. */
export const studioBasePath = "/studio";
