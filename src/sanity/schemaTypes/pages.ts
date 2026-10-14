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
export const singletons = new Set(["homePage", "platformPage", "siteSettings"]);
