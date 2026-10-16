/**
 * What the pages ask for. Each function returns content in the shape the
 * components already use, from Sanity when it is set up and has the
 * document, otherwise from the local data files. So the site builds the
 * same before, during and after the move to the CMS.
 */
import { customerStories, type CustomerStory } from "@/data/customer-stories.ts";
import { faq as localFaq } from "@/data/platform.ts";
import * as about from "@/data/about.ts";
import { assetOr } from "@/utils/assets.ts";
import type { SeoProps } from "@/types.ts";
import { clean, portableTextToHtml, sanityFetch, urlFor } from "./client.ts";
import { isSanityConfigured, visualEditing } from "./env.ts";
import { aboutPageQuery, homePageQuery, platformPageQuery, siteSettingsQuery } from "./queries.ts";

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
    logos: { name: string; logo: SanityImage | null }[] | null;
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

  /* Undefined when the CMS has none: LogoMarquee then uses the local files */
  const logos = doc?.logos?.length
    ? doc.logos
        .filter((item) => item?.logo?.src)
        .map((item) => ({ ...item.logo!, alt: clean(item.name) }))
    : undefined;

  return { seo: await mergeSeo(doc?.seo, fallbackSeo), logos, stories };
}

export async function getPlatformContent(fallbackSeo: SeoProps = {}) {
  type Doc = {
    seo: SanitySeo;
    webinar: string | null;
    faqs: { question: string; answer: unknown }[] | null;
  };
  const doc = await sanityFetch<Doc>(platformPageQuery);
  if (doc === null) warn("Platform page");

  const faqs = doc?.faqs?.length
    ? doc.faqs.filter(Boolean).map((item) => ({ q: item.question, a: portableTextToHtml(item.answer) }))
    : localFaq;

  const webinar = clean(doc?.webinar) || "/webinars";

  return { seo: await mergeSeo(doc?.seo, fallbackSeo), faqs, webinar };
}

/* About page */

export type Picture = { src: ImageMetadata | string; width: number; height: number; alt?: string };

const aboutFiles = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/images/about/**/*.{avif,jpg,png,webp,svg}",
  { eager: true },
);
const investorFiles = import.meta.glob<{ default: ImageMetadata }>("/src/assets/logos/investors/*.svg", {
  eager: true,
});
/* Glob keys are full paths: narrow to one folder so team/ and about/ names never clash */
const inFolder = (files: typeof aboutFiles, folder: string) =>
  Object.fromEntries(Object.entries(files).filter(([path]) => path.split("/").slice(-2, -1)[0] === folder));
const teamFiles = inFolder(aboutFiles, "team");
const pageFiles = inFolder(aboutFiles, "about");

const escapeHtml = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** What the About page renders, from Sanity or, until it's there, the local data. */
export async function getAboutContent(fallbackSeo: SeoProps = {}) {
  type Doc = {
    seo: SanitySeo;
    hero: SanityImage | null;
    letter: unknown[] | null;
    founder: { name?: string; role?: string; signature?: SanityImage | null } | null;
    milestones: { year: string; title: string; text: string; logos: SanityImage[] | null }[] | null;
    values: { title: string; text: string }[] | null;
    valuesImage: SanityImage | null;
    leaders: { name: string; role: string; photo: SanityImage | null; hover: SanityImage | null }[] | null;
    chorus: string[] | null;
  };
  const doc = await sanityFetch<Doc>(aboutPageQuery);
  if (doc === null) warn("About page");

  const pic = (image: SanityImage | null | undefined): Picture | undefined =>
    image?.src ? image : undefined;
  const square = { width: 960, height: 960 };

  const hero = pic(doc?.hero) ?? assetOr(pageFiles, "hero", about.aboutImages.hero);

  const letterHtml = doc?.letter?.length
    ? portableTextToHtml(doc.letter)
    : about.letter
        .map((p) => `<p>${escapeHtml(p.text)}${p.strong ? ` <strong>${escapeHtml(p.strong)}</strong>` : ""}</p>`)
        .join("");

  const founder = {
    name: doc?.founder?.name || about.founder.name,
    role: doc?.founder?.role || about.founder.role,
    signature: pic(doc?.founder?.signature) ?? assetOr(pageFiles, "signature", about.aboutImages.signature),
  };

  const milestones = doc?.milestones?.length
    ? doc.milestones.filter(Boolean).map((m) => ({
        year: m.year,
        title: m.title,
        text: m.text,
        logos: (m.logos ?? []).filter((logo) => logo?.src).map((logo) => ({ ...logo, alt: clean(logo.alt) })),
      }))
    : about.timeline.map((m) => ({
        year: m.year,
        title: m.title,
        text: m.text,
        logos: m.investors
          ? about.investors.map((logo) => ({ ...assetOr(investorFiles, logo.file, logo), alt: logo.name }))
          : [],
      }));

  const values = doc?.values?.length ? doc.values : about.values;
  const valuesImage: Picture = pic(doc?.valuesImage) ?? {
    ...assetOr(pageFiles, "values", about.aboutImages.values),
    alt: "Lyric's founders together at a Lyric event",
  };
  if (valuesImage.alt) valuesImage.alt = clean(valuesImage.alt);

  const leaders = doc?.leaders?.length
    ? doc.leaders
        .filter((leader) => leader?.photo?.src)
        .map((leader) => ({ name: leader.name, role: leader.role, photo: leader.photo!, hover: pic(leader.hover) }))
    : about.leaders.map((leader) => ({
        name: leader.name,
        role: leader.role,
        photo: assetOr(teamFiles, leader.file, { src: leader.photo, ...square }),
        hover: leader.hover ? assetOr(teamFiles, `${leader.file}-hover`, { src: leader.hover, ...square }) : undefined,
      }));

  const chorus = doc?.chorus?.length ? doc.chorus : about.chorus;

  return {
    seo: await mergeSeo(doc?.seo, fallbackSeo),
    hero,
    letterHtml,
    founder,
    milestones,
    values,
    valuesImage,
    leaders,
    chorus,
  };
}
