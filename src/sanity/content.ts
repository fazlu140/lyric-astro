/**
 * What the pages ask for. Each function returns content in the shape the
 * components already use, from Sanity when it is set up and has the
 * document, otherwise from the local data files. So the site builds the
 * same before, during and after the move to the CMS.
 */
import { customerStories, type CustomerStory } from "@/data/customer-stories.ts";
import { faq as localFaq } from "@/data/platform.ts";
import type { SeoProps } from "@/types.ts";
import { clean, portableTextToHtml, sanityFetch, urlFor } from "./client.ts";
import { isSanityConfigured, visualEditing } from "./env.ts";
import { homePageQuery, platformPageQuery, siteSettingsQuery } from "./queries.ts";

type SanityImage = { src: string; width: number; height: number; alt?: string };

type SanitySeo = {
  title?: string;
  description?: string;
  noindex?: boolean;
  image?: { asset?: { _ref: string } };
} | null;

/** Site defaults, then the page's own fields, then whatever the page passes as a fallback */
let settings: Promise<SanitySeo> | undefined;
/* Read once per build; the preview reads it on every request so edits show */
const siteSeo = () =>
  visualEditing
    ? sanityFetch<{ seo: SanitySeo }>(siteSettingsQuery).then((doc) => doc?.seo ?? null)
    : (settings ??= sanityFetch<{ seo: SanitySeo }>(siteSettingsQuery).then((doc) => doc?.seo ?? null));

async function mergeSeo(page: SanitySeo | undefined, fallback: SeoProps): Promise<SeoProps> {
  const site = await siteSeo();
  const pick = <K extends keyof NonNullable<SanitySeo>>(key: K) => page?.[key] ?? site?.[key];
  const image = pick("image");
  return {
    ...fallback,
    /* <head> text must be clean: edit markers only belong in visible text */
    title: clean(page?.title) || fallback.title,
    description: clean(pick("description")) || fallback.description,
    noindex: page?.noindex ?? fallback.noindex,
    image: image?.asset ? urlFor(image).width(1200).height(630).fit("crop").url() : fallback.image,
  };
}

const warn = (what: string) =>
  isSanityConfigured &&
  console.warn(`[sanity] No ${what} in the dataset yet, using the local copy. Run the seed import.`);

export async function getHomeContent(fallbackSeo: SeoProps = {}) {
  type Doc = {
    seo: SanitySeo;
    stories:
      | {
          title: string;
          slug: string;
          client: string;
          image: SanityImage;
          logo: SanityImage;
        }[]
      | null;
  };
  const doc = await sanityFetch<Doc>(homePageQuery);
  if (doc === null) warn("Home page");

  const stories: CustomerStory[] =
    doc?.stories?.length
      ? doc.stories
          /* A reference to a deleted or unpublished story comes back empty */
          .filter((story) => story?.image?.src && story.logo?.src)
          .map((story) => ({
            title: story.title,
            href: `/customer-stories/${clean(story.slug)}`,
            image: { src: story.image.src, width: story.image.width, height: story.image.height },
            logo: {
              src: story.logo.src,
              width: story.logo.width,
              height: story.logo.height,
              alt: clean(story.client),
            },
          }))
      : customerStories;

  return { seo: await mergeSeo(doc?.seo, fallbackSeo), stories };
}

export async function getPlatformContent(fallbackSeo: SeoProps = {}) {
  type Doc = { seo: SanitySeo; faqs: { question: string; answer: unknown }[] | null };
  const doc = await sanityFetch<Doc>(platformPageQuery);
  if (doc === null) warn("Platform page");

  const faqs = doc?.faqs?.length
    ? doc.faqs.filter(Boolean).map((item) => ({ q: item.question, a: portableTextToHtml(item.answer) }))
    : localFaq;

  return { seo: await mergeSeo(doc?.seo, fallbackSeo), faqs };
}
