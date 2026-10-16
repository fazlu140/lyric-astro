import { defineField, defineType } from "sanity";

/** One person in the About page's leadership grid. The page picks and orders them. */
export const leader = defineType({
  name: "leader",
  title: "Leader",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "role",
      type: "string",
      description: "Shown in capitals under the name, e.g. Decision Science.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "photo",
      type: "image",
      description: "Square, black and white portrait. 960 × 960 or larger.",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "hoverPhoto",
      title: "Hover photo",
      type: "image",
      description: "The playful photo shown on hover. Optional: without one, the portrait stays.",
      options: { hotspot: true },
    }),
  ],
  preview: { select: { title: "name", subtitle: "role", media: "photo" } },
});
