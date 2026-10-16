/**
 * Sanity Studio, the editing app. It runs inside the Astro site at /studio
 * (see `astro.config.mjs`), so there is one repo, one deploy and one URL.
 */
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { presentationTool } from "sanity/presentation";
import { vercelProtectionBypassTool } from "@sanity/vercel-protection-bypass";
import { schemaTypes, singletons } from "./src/sanity/schemaTypes/index.ts";
import { structure } from "./src/sanity/structure.ts";
import { resolve } from "./src/sanity/presentation.ts";
import { apiVersion, dataset, projectId } from "./src/sanity/env.ts";

/* The preview the Presentation tool opens. On the site's own /studio it is
   the same site. The hosted Studio opens the `preview` branch, which GitHub
   keeps identical to main (.github/workflows/sanity.yml), so it always shows
   what was last merged. SANITY_STUDIO_PREVIEW_URL overrides it, e.g.
   http://localhost:4321 to edit against your own dev server. */
const PREVIEW_BRANCH_URL = "https://lyric-astro-git-preview-fazlu.vercel.app";
const previewUrl =
  (import.meta as ImportMeta & { env?: Record<string, string | undefined> }).env
    ?.SANITY_STUDIO_PREVIEW_URL ||
  (typeof window !== "undefined" && window.location.pathname.startsWith("/studio")
    ? window.location.origin
    : PREVIEW_BRANCH_URL);

export default defineConfig({
  name: "lyric",
  title: "Lyric",
  projectId,
  dataset,
  plugins: [
    structureTool({ structure }),
    /* "Presentation" in the top bar: the site in a frame, click any text to
       edit it. It shows the preview deployment, which renders drafts. */
    presentationTool({
      resolve,
      previewUrl: {
        initial: previewUrl,
      },
      /* Any branch preview of this project, and local dev, may be opened in
         Presentation (type its URL into the address bar), not only the
         default one. Anything else is blocked. */
      allowOrigins: ["https://lyric-astro-git-*-fazlu.vercel.app", "http://localhost:*"],
    }),
    /* A playground for GROQ, Sanity's query language. Try queries here
       before putting them in the site. */
    visionTool({ defaultApiVersion: apiVersion }),
    /* Lets Presentation open the Vercel preview even though it is behind
       Vercel Authentication. Paste the bypass secret once in its tab. */
    vercelProtectionBypassTool(),
  ],
  schema: {
    types: schemaTypes,
    /* No "new Home page" button: singletons already exist */
    templates: (templates) => templates.filter(({ schemaType }) => !singletons.has(schemaType)),
  },
  document: {
    /* Singletons can be published or reverted, never duplicated or deleted */
    actions: (actions, { schemaType }) =>
      singletons.has(schemaType)
        ? actions.filter(({ action }) => action && ["publish", "discardChanges", "restore"].includes(action))
        : actions,
  },
});
