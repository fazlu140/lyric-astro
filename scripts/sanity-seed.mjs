/**
 * Builds sanity-seed.ndjson from the local data files, so the CMS starts
 * with exactly what the site shows today. Then import it:
 *
 *   npm run sanity:seed
 *   npx sanity dataset import sanity-seed.ndjson production --replace
 *
 * NDJSON is one JSON document per line. Images are written as
 * `_sanityAsset: "image@<url>"`: the import downloads each one and uploads
 * it to Sanity, so run it on a machine that can reach the Webflow CDN.
 * `--replace` overwrites documents with the same ID, so re-running is safe,
 * but it also overwrites edits made in the Studio to those documents.
 */
import { writeFile } from "node:fs/promises";
import { customerStories } from "../src/data/customer-stories.ts";
import { faq } from "../src/data/platform.ts";

let keyCount = 0;
const key = () => `k${(keyCount++).toString(36)}`;

const asset = (url) => ({ _type: "image", _sanityAsset: `image@${url}` });

/* The FAQ answers are simple HTML (paragraphs and one numbered list):
   turn them into Portable Text blocks */
const decode = (text) =>
  text
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/<[^>]+>/g, "")
    .trim();

const block = (text, list) => ({
  _type: "block",
  _key: key(),
  style: "normal",
  markDefs: [],
  children: [{ _type: "span", _key: key(), text: decode(text), marks: [] }],
  ...(list ? { listItem: list, level: 1 } : {}),
});

const toBlocks = (html) => {
  const blocks = [];
  for (const [, tag, inner] of html.matchAll(/<(p|ol|ul)>([\s\S]*?)<\/\1>/g)) {
    if (tag === "p") {
      if (decode(inner)) blocks.push(block(inner));
      continue;
    }
    const list = tag === "ol" ? "number" : "bullet";
    for (const [, item] of inner.matchAll(/<li>([\s\S]*?)<\/li>/g)) blocks.push(block(item, list));
  }
  return blocks;
};

const slugOf = (href) => href.split("/").filter(Boolean).pop();

const stories = customerStories.map((story) => ({
  _id: `story-${slugOf(story.href)}`,
  _type: "customerStory",
  title: story.title,
  slug: { _type: "slug", current: slugOf(story.href) },
  client: story.logo.alt,
  logo: asset(story.logo.src),
  image: asset(story.image.src),
}));

const faqs = faq.map((item, i) => ({
  _id: `faq-platform-${String(i + 1).padStart(2, "0")}`,
  _type: "faq",
  question: item.q,
  answer: toBlocks(item.a),
}));

const ref = (_ref) => ({ _type: "reference", _ref, _key: key() });

const singletons = [
  {
    _id: "siteSettings",
    _type: "siteSettings",
    seo: {
      _type: "seo",
      description:
        "Lyric is the AI platform supply chains decide on. Your decisions. Your solutions. Real AI. No compromise.",
    },
  },
  {
    _id: "homePage",
    _type: "homePage",
    seo: { _type: "seo" },
    stories: stories.map((story) => ref(story._id)),
  },
  {
    _id: "platformPage",
    _type: "platformPage",
    seo: {
      _type: "seo",
      title: "AI Agents That Know Supply Chain | Lyric Studio",
      description:
        "Lyric Studio puts AI agents at every layer of the platform, grounded, traceable, and auditable, working with planners and modelers on supply chain decisions.",
    },
    faqs: faqs.map((item) => ref(item._id)),
  },
];

const docs = [...stories, ...faqs, ...singletons];
await writeFile("sanity-seed.ndjson", docs.map((doc) => JSON.stringify(doc)).join("\n") + "\n");
console.log(
  `✓ sanity-seed.ndjson: ${stories.length} stories, ${faqs.length} FAQs, ${singletons.length} singletons`,
);
