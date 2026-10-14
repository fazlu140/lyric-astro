/**
 * Sanity Studio, the editing app. It runs inside the Astro site at /studio
 * (see `astro.config.mjs`), so there is one repo, one deploy and one URL.
 */
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes, singletons } from "./src/sanity/schemaTypes/index.ts";
import { structure } from "./src/sanity/structure.ts";
import { apiVersion, dataset, projectId } from "./src/sanity/env.ts";

export default defineConfig({
  name: "lyric",
  title: "Lyric",
  projectId,
  dataset,
  plugins: [
    structureTool({ structure }),
    /* A playground for GROQ, Sanity's query language. Try queries here
       before putting them in the site. */
    visionTool({ defaultApiVersion: apiVersion }),
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
