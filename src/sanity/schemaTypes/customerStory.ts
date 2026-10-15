import { defineField, defineType } from "sanity";

/** A customer story: one card in the homepage slider (and, later, its own page). */
export const customerStory = defineType({
  name: "customerStory",
  title: "Customer story",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      description: "The story's address: /customer-stories/<slug>.",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "client",
      title: "Client name",
      type: "string",
      description: "Also used as the logo's alt text.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Client logo",
      type: "image",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Card image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          description: "Leave empty if the image is decoration only.",
        }),
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "client", media: "logo" },
  },
});
