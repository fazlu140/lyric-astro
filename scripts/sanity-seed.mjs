/**
 * Fills the CMS with what the site shows today, from the local data files.
 * Safe to run any time, as often as you like: it only ADDS what is missing.
 *
 *   npm run sanity:seed
 *
 * - A document that doesn't exist yet is created (a story, a leader...).
 * - A document that exists is left alone, edits and all.
 * - A page (singleton) that exists gets only the fields it doesn't have yet,
 *   so a new section's content arrives without touching anything an editor
 *   has written.
 *
 * Runs through `sanity exec --with-user-token`, so it acts as you, logged in
 * with `npx sanity login`; no token to create. Images are downloaded from
 * where the site gets them today (the Webflow CDN, or files in the repo) and
 * uploaded to Sanity; Sanity skips files it already has.
 *
 * Dry run, without touching Sanity: SEED_DRY=1 node scripts/sanity-seed.mjs
 */
import { readFile } from "node:fs/promises";
import { basename, resolve } from "node:path";
import { readdirSync } from "node:fs";
import { customerStories } from "../src/data/customer-stories.ts";
import { faq } from "../src/data/platform.ts";
import * as about from "../src/data/about.ts";

const DRY = Boolean(process.env.SEED_DRY);

let keyCount = 0;
const key = () => `k${(keyCount++).toString(36)}`;

/* An image to upload when the document is written: a URL or a repo path */
const upload = (from, extra = {}) => ({ __upload: from, ...extra });

/* ---------- Portable Text from the local copy ---------- */

const decode = (text) =>
  text
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/<[^>]+>/g, "")
    .trim();

const span = (text, marks = []) => ({ _type: "span", _key: key(), text, marks });

const block = (children, list) => ({
  _type: "block",
  _key: key(),
  style: "normal",
  markDefs: [],
  children,
  ...(list ? { listItem: list, level: 1 } : {}),
});

/* The FAQ answers are simple HTML (paragraphs and one numbered list) */
const toBlocks = (html) => {
  const blocks = [];
  for (const [, tag, inner] of html.matchAll(/<(p|ol|ul)>([\s\S]*?)<\/\1>/g)) {
    if (tag === "p") {
      if (decode(inner)) blocks.push(block([span(decode(inner))]));
      continue;
    }
    const list = tag === "ol" ? "number" : "bullet";
    for (const [, item] of inner.matchAll(/<li>([\s\S]*?)<\/li>/g)) blocks.push(block([span(decode(item))], list));
  }
  return blocks;
};

const ref = (_ref) => ({ _type: "reference", _ref, _key: key() });

/* ---------- The documents ---------- */

const slugOf = (href) => href.split("/").filter(Boolean).pop();

const stories = customerStories.map((story) => ({
  _id: `story-${slugOf(story.href)}`,
  _type: "customerStory",
  title: story.title,
  slug: { _type: "slug", current: slugOf(story.href) },
  client: story.logo.alt,
  logo: upload(story.logo.src),
  image: upload(story.image.src),
}));

const faqs = faq.map((item, i) => ({
  _id: `faq-platform-${String(i + 1).padStart(2, "0")}`,
  _type: "faq",
  question: item.q,
  answer: toBlocks(item.a),
}));

/* Logo strip: the files in the repo, named NN-slug.png, with their names */
const logoNames = {
  "suntory-global-spirits": "Suntory Global Spirits",
  westrock: "WestRock",
  "estee-lauder": "Estée Lauder",
  "krispy-kreme": "Krispy Kreme",
  "beyond-better-foods": "Beyond Better Foods",
  bcg: "BCG",
  "coca-cola-consolidated": "Coca-Cola Consolidated",
  "kuehne-nagel": "Kuehne+Nagel",
  bodyarmor: "BodyArmor",
  wayfair: "Wayfair",
  "beam-suntory": "Beam Suntory",
  petco: "Petco",
  "owens-and-minor": "Owens & Minor",
  "treehouse-foods": "TreeHouse Foods",
  "bob-evans-farms": "Bob Evans Farms",
  wesco: "Wesco",
  niagara: "Niagara",
  google: "Google",
  "five-below": "Five Below",
  exol: "Exol",
  elf: "e.l.f.",
  "acco-brands": "ACCO Brands",
  "mondelez-international": "Mondelēz International",
  lowes: "Lowe's",
};
const logoDir = "src/assets/logos/clients";
const clientLogos = readdirSync(logoDir)
  .filter((file) => /\.(png|svg|webp)$/.test(file))
  .sort()
  .map((file) => {
    const slug = file.replace(/^\d+-|\.\w+$/g, "");
    return {
      _id: `client-${slug}`,
      _type: "clientLogo",
      name: logoNames[slug] ?? slug,
      logo: upload(`${logoDir}/${file}`),
    };
  });

const leaders = about.leaders.map((leader) => ({
  _id: `leader-${leader.file}`,
  _type: "leader",
  name: leader.name,
  role: leader.role,
  photo: upload(leader.photo),
  ...(leader.hover ? { hoverPhoto: upload(leader.hover) } : {}),
}));

const milestones = about.timeline.map((item, i) => ({
  _id: `milestone-${String(i + 1).padStart(2, "0")}`,
  _type: "milestone",
  year: item.year,
  title: item.title,
  text: item.text,
  ...(item.investors
    ? { logos: about.investors.map((logo) => upload(logo.src, { _key: key(), alt: logo.name })) }
    : {}),
}));

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
    logos: clientLogos.map((logo) => ref(logo._id)),
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
    webinar: "/webinars",
    faqs: faqs.map((item) => ref(item._id)),
  },
  {
    _id: "aboutPage",
    _type: "aboutPage",
    seo: {
      _type: "seo",
      title: "About Lyric | Why We're Rebuilding Supply Chain Tech",
      description:
        "Supply chain decisions deserved better than siloed tools. Read why we started Lyric, what we believe, and meet the team carrying it forward.",
    },
    heroImage: upload(about.aboutImages.hero.src),
    letter: about.letter.map((p) =>
      block(p.strong ? [span(`${p.text} `), span(p.strong, ["strong"])] : [span(p.text)]),
    ),
    founder: {
      name: about.founder.name,
      role: about.founder.role,
      signature: upload(about.aboutImages.signature.src),
    },
    milestones: milestones.map((item) => ref(item._id)),
    values: about.values.map((value) => ({ _type: "valueItem", _key: key(), ...value })),
    valuesImage: upload(about.aboutImages.values.src, { alt: "Lyric's founders together at a Lyric event" }),
    leaders: leaders.map((leader) => ref(leader._id)),
    chorus: about.chorus,
  },
];

const documents = [...stories, ...faqs, ...clientLogos, ...leaders, ...milestones];

/* ---------- Writing ---------- */

const client = DRY
  ? {
      /* SEED_DRY=partial pretends the first two pages are already in */
      fetch: async (_query, { ids }) =>
        process.env.SEED_DRY === "partial"
          ? ids
              .filter((id) => /^(story-|faq-|siteSettings|homePage|platformPage)/.test(id))
              .map((id) => ({ _id: id, seo: { _type: "seo" }, stories: [1], faqs: [1] }))
          : [],
      assets: { upload: async (_type, _body, { filename }) => ({ _id: `image-dry-${filename}` }) },
    }
  : (await import("sanity/cli")).getCliClient({ apiVersion: "2026-10-01" });

/* Uploads each image once, then swaps the marker for a real image field */
const uploaded = new Map();
async function uploadImage(from) {
  if (!uploaded.has(from)) {
    const job = (async () => {
      let body = Buffer.alloc(0);
      if (DRY) {
        /* nothing to download */
      } else if (/^https?:/.test(from)) {
        const response = await fetch(from);
        if (!response.ok) throw new Error(`Couldn't download ${from} (HTTP ${response.status})`);
        body = Buffer.from(await response.arrayBuffer());
      } else {
        body = await readFile(resolve(from));
      }
      const filename = decodeURIComponent(basename(from.split("?")[0]));
      const asset = await client.assets.upload("image", body, { filename });
      return asset._id;
    })();
    uploaded.set(from, job);
  }
  return uploaded.get(from);
}

async function withImages(value) {
  if (Array.isArray(value)) return Promise.all(value.map(withImages));
  if (!value || typeof value !== "object") return value;
  if ("__upload" in value) {
    const { __upload, ...rest } = value;
    return { _type: "image", ...rest, asset: { _type: "reference", _ref: await uploadImage(__upload) } };
  }
  const out = {};
  for (const [name, field] of Object.entries(value)) out[name] = await withImages(field);
  return out;
}

const ids = [...documents, ...singletons].map((doc) => doc._id);
const existing = new Map(
  (await client.fetch(`*[_id in $ids]`, { ids })).map((doc) => [doc._id, doc]),
);

const created = [];
const filled = [];
const mutations = [];

for (const doc of documents) {
  if (existing.has(doc._id)) continue;
  mutations.push({ createIfNotExists: await withImages(doc) });
  created.push(doc._id);
}

for (const doc of singletons) {
  const current = existing.get(doc._id);
  if (!current) {
    mutations.push({ createIfNotExists: await withImages(doc) });
    created.push(doc._id);
    continue;
  }
  const missing = {};
  for (const [name, value] of Object.entries(doc)) {
    if (name.startsWith("_")) continue;
    const have = current[name];
    if (have === undefined || have === null || (Array.isArray(have) && have.length === 0)) {
      missing[name] = await withImages(value);
    }
  }
  if (Object.keys(missing).length) {
    mutations.push({ patch: { id: doc._id, set: missing } });
    filled.push(`${doc._id} (${Object.keys(missing).join(", ")})`);
  }
}

if (DRY) {
  console.log(`Dry run: would create ${created.length} documents, fill ${filled.length} pages, upload ${uploaded.size} images.`);
  console.log(`Create: ${created.join(", ")}`);
  console.log(`Fill: ${filled.join("; ") || "nothing"}`);
} else if (mutations.length) {
  await client.mutate(mutations);
  console.log(`✓ Created ${created.length}: ${created.join(", ") || "none"}`);
  console.log(`✓ Filled in: ${filled.join("; ") || "nothing"}`);
} else {
  console.log("Nothing to add: the CMS already has everything.");
}
