import { defineArrayMember, defineField, defineType } from "sanity";

/*
 * Singletons: one document each, with a fixed ID, for content that belongs
 * to one page. Lists (stories, FAQs) are their own documents; a page picks
 * and orders them with references, so the same FAQ can sit on two pages and
 * editing it once updates both.
 */

export const homePage = defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  fields: [
    defineField({ name: "seo", title: "SEO", type: "seo" }),
    defineField({
      name: "logos",
      title: "Logo strip",
      description: "The client logos under the hero. Drag to reorder; they loop in this order.",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "clientLogo" }] })],
      validation: (rule) => rule.unique(),
    }),
    defineField({
      name: "stories",
      title: "Customer stories slider",
      description: "Drag to reorder. The slider shows them in this order.",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "customerStory" }] })],
      validation: (rule) => rule.unique(),
    }),
  ],
  preview: { prepare: () => ({ title: "Home page" }) },
});

export const platformPage = defineType({
  name: "platformPage",
  title: "Platform page",
  type: "document",
  fields: [
    defineField({ name: "seo", title: "SEO", type: "seo" }),
    defineField({
      name: "webinar",
      title: "Next webinar link",
      description: 'Where "Join our next webinar" goes, in the closing call to action.',
      type: "url",
      validation: (rule) => rule.uri({ allowRelative: true, scheme: ["http", "https"] }),
    }),
    defineField({
      name: "faqs",
      title: "FAQ section",
      description: "Drag to reorder. The first one opens by default.",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "faq" }] })],
      validation: (rule) => rule.unique(),
    }),
  ],
  preview: { prepare: () => ({ title: "Platform page" }) },
});

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About page",
  type: "document",
  /* Tabs across the top of the document, one per section of the page */
  groups: [
    { name: "letter", title: "Letter", default: true },
    { name: "timeline", title: "Timeline" },
    { name: "values", title: "Values" },
    { name: "team", title: "Team" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
    defineField({
      name: "heroImage",
      title: "Background photo",
      description: "Shown in black and white behind the letter. Landscape, 2000px wide or more.",
      type: "image",
      options: { hotspot: true },
      group: "letter",
    }),
    defineField({
      name: "letter",
      title: "Founder's letter",
      type: "array",
      group: "letter",
      /* Paragraphs and bold only: what the letter's design has */
      of: [
        defineArrayMember({
          type: "block",
          styles: [{ title: "Paragraph", value: "normal" }],
          lists: [],
          marks: { decorators: [{ title: "Bold", value: "strong" }], annotations: [] },
        }),
      ],
    }),
    defineField({
      name: "founder",
      title: "Signed by",
      type: "object",
      group: "letter",
      options: { columns: 2 },
      fields: [
        defineField({ name: "name", type: "string" }),
        defineField({ name: "role", type: "string" }),
        defineField({
          name: "signature",
          type: "image",
          description: "The handwritten name, as an SVG.",
        }),
      ],
    }),
    defineField({
      name: "milestones",
      title: "Timeline",
      description: "Drag to reorder. The first one is shown greyed out (before Lyric).",
      type: "array",
      group: "timeline",
      of: [defineArrayMember({ type: "reference", to: [{ type: "milestone" }] })],
      validation: (rule) => rule.unique(),
    }),
    defineField({
      name: "values",
      title: "Values",
      description: "They open one after another on the page, in this order.",
      type: "array",
      group: "values",
      of: [
        defineArrayMember({
          name: "valueItem",
          title: "Value",
          type: "object",
          fields: [
            defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "text", type: "text", rows: 4, validation: (rule) => rule.required() }),
          ],
          preview: { select: { title: "title", subtitle: "text" } },
        }),
      ],
    }),
    defineField({
      name: "valuesImage",
      title: "Values photo",
      type: "image",
      group: "values",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
    defineField({
      name: "leaders",
      title: "Leadership team",
      description: "Drag to reorder.",
      type: "array",
      group: "team",
      of: [defineArrayMember({ type: "reference", to: [{ type: "leader" }] })],
      validation: (rule) => rule.unique(),
    }),
    defineField({
      name: "chorus",
      title: "Chorus (everyone else)",
      description: "One name per tag. They scroll through the word CHORUS in this order.",
      type: "array",
      group: "team",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
  ],
  preview: { prepare: () => ({ title: "About page" }) },
});

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({
      name: "seo",
      title: "Default SEO",
      description: "Used by any page that leaves its own SEO fields empty.",
      type: "seo",
    }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});

/** Types that exist exactly once. The Studio hides "create" and "delete" for them. */
export const singletons = new Set(["homePage", "platformPage", "aboutPage", "siteSettings"]);
