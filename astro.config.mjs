// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import sitemap from "@astrojs/sitemap";
import sanity from "@sanity/astro";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import { loadEnv } from "vite";
import { SITE_URL } from "./src/consts.ts";
import { isNoindexRoute } from "./src/utils/seo.ts";

/* .env isn't loaded yet when this file runs, so read it here */
const env = loadEnv(process.env.NODE_ENV ?? "development", process.cwd(), "");
const projectId = env.PUBLIC_SANITY_PROJECT_ID;
/* Preview build for the Studio's Presentation tool: rendered per request
   with drafts. Production builds leave this off and stay static. */
const visualEditing = Boolean(projectId) && env.SANITY_VISUAL_EDITING === "true";

/* Sanity, with the Studio at /studio, once a project ID is set. Until then
   the site builds from the local data files and there is no /studio. */
const cms = projectId
  ? [
      sanity({
        projectId,
        dataset: env.PUBLIC_SANITY_DATASET || "production",
        /* Static builds read fresh content once per build: skip the CDN cache */
        useCdn: false,
        studioBasePath: "/studio",
      }),
      /* The Studio is a React app; React only loads on /studio */
      react(),
    ]
  : [];

export default defineConfig({
  site: SITE_URL,
  output: visualEditing ? "server" : "static",
  ...(visualEditing ? { adapter: vercel() } : {}),
  /* Customer story images come from the Webflow CMS until it moves here */
  /* Remote images Astro may optimise: the Webflow CMS (until it is retired)
     and Sanity's image CDN */
  image: {
    domains: process.env.LYRIC_OFFLINE ? [] : ["cdn.prod.website-files.com", "cdn.sanity.io"],
  },
  integrations: [
    ...cms,
    sitemap({
      filter: (page) => !isNoindexRoute(new URL(page).pathname),
    }),
  ],
  fonts: [
    {
      name: "General Sans",
      cssVariable: "--font-general-sans",
      provider: fontProviders.local(),
      fallbacks: ["system-ui", "sans-serif"],
      options: {
        variants: [
          {
            weight: 400,
            style: "normal",
            src: ["./src/assets/fonts/general-sans-regular.woff2"],
          },
          {
            weight: 500,
            style: "normal",
            src: ["./src/assets/fonts/general-sans-medium.woff2"],
          },
          {
            weight: 600,
            style: "normal",
            src: ["./src/assets/fonts/general-sans-semibold.woff2"],
          },
        ],
      },
    },
    {
      name: "Chivo Mono",
      cssVariable: "--font-chivo-mono",
      provider: fontProviders.local(),
      fallbacks: ["ui-monospace", "monospace"],
      options: {
        variants: [
          {
            weight: "100 900",
            style: "normal",
            src: ["./src/assets/fonts/chivo-mono-variable.woff2"],
          },
        ],
      },
    },
  ],
  vite: { build: { cssTarget: "safari15.4" } },
});
