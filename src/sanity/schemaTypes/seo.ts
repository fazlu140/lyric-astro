import { defineField, defineType } from "sanity";

/**
 * SEO fields, reused by every page. An object type has no documents of its
 * own: it is a group of fields other types embed (like a Webflow component's
 * props, but for content).
 */
export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  options: { collapsible: true, collapsed: false },
  fields: [
    defineField({
      name: "title",
      title: "Page title",
      type: "string",
      description:
        'Shown in the browser tab and in Google. "| Lyric" is added unless the title already has a " | ".',
      validation: (rule) => rule.max(70).warning("Google cuts titles at about 60 characters."),
    }),
    defineField({
      name: "description",
      title: "Meta description",
      type: "text",
      rows: 3,
      description: "The grey line under the title in Google results.",
      validation: (rule) =>
        rule.max(170).warning("Google cuts descriptions at about 155 characters."),
    }),
    defineField({
      name: "image",
      title: "Share image",
      type: "image",
      description: "Shown when the page is shared on LinkedIn, Slack and so on. 1200 × 630.",
    }),
    defineField({
      name: "noindex",
      title: "Hide from search engines",
      type: "boolean",
      initialValue: false,
    }),
  ],
});
