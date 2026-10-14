import { seo } from "./seo.ts";
import { customerStory } from "./customerStory.ts";
import { faq } from "./faq.ts";
import { homePage, platformPage, siteSettings } from "./pages.ts";

/** Every content type the Studio knows about. Add new ones here. */
export const schemaTypes = [seo, customerStory, faq, homePage, platformPage, siteSettings];

export { singletons } from "./pages.ts";
