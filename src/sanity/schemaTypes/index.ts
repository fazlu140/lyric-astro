import { seo } from "./seo.ts";
import { customerStory } from "./customerStory.ts";
import { faq } from "./faq.ts";
import { leader } from "./leader.ts";
import { milestone } from "./milestone.ts";
import { clientLogo } from "./clientLogo.ts";
import { aboutPage, homePage, platformPage, siteSettings } from "./pages.ts";

/** Every content type the Studio knows about. Add new ones here. */
export const schemaTypes = [
  seo,
  customerStory,
  faq,
  clientLogo,
  leader,
  milestone,
  homePage,
  platformPage,
  aboutPage,
  siteSettings,
];

export { singletons } from "./pages.ts";
