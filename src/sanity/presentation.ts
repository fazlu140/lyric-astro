import { defineDocuments, defineLocations, type PresentationPluginOptions } from "sanity/presentation";

/**
 * Tells the Presentation tool which page shows which document, both ways:
 * open a page in the preview and it lists the documents on it; open a
 * document and it offers the pages it appears on.
 */
export const resolve: PresentationPluginOptions["resolve"] = {
  /* Page → its main document */
  mainDocuments: defineDocuments([
    { route: "/", filter: `_id == "homePage"` },
    { route: "/platform", filter: `_id == "platformPage"` },
    { route: "/about-us", filter: `_id == "aboutPage"` },
  ]),
  /* Document → the pages that show it */
  locations: {
    homePage: defineLocations({
      message: "The home page",
      resolve: () => ({ locations: [{ title: "Home", href: "/" }] }),
    }),
    platformPage: defineLocations({
      message: "The platform page",
      resolve: () => ({ locations: [{ title: "Platform", href: "/platform" }] }),
    }),
    aboutPage: defineLocations({
      message: "The about page",
      resolve: () => ({ locations: [{ title: "About", href: "/about-us" }] }),
    }),
    leader: defineLocations({
      select: { title: "name" },
      resolve: (doc) => ({
        locations: [{ title: `${doc?.title ?? "Leader"} (about, team)`, href: "/about-us" }],
      }),
    }),
    milestone: defineLocations({
      select: { title: "title" },
      resolve: (doc) => ({
        locations: [{ title: `${doc?.title ?? "Year"} (about, timeline)`, href: "/about-us" }],
      }),
    }),
    clientLogo: defineLocations({
      select: { title: "name" },
      resolve: (doc) => ({
        locations: [{ title: `${doc?.title ?? "Logo"} (home, logo strip)`, href: "/" }],
      }),
    }),
    customerStory: defineLocations({
      select: { title: "title" },
      resolve: (doc) => ({
        locations: [{ title: `${doc?.title ?? "Story"} (home slider)`, href: "/" }],
      }),
    }),
    faq: defineLocations({
      select: { title: "question" },
      resolve: (doc) => ({
        locations: [{ title: `${doc?.title ?? "FAQ"} (platform FAQ)`, href: "/platform" }],
      }),
    }),
  },
};
