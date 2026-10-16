import { defineArrayMember, defineField, defineType } from "sanity";

/** One year on the About page's "How did we get here?" timeline. */
export const milestone = defineType({
  name: "milestone",
  title: "Timeline year",
  type: "document",
  fields: [
    defineField({
      name: "year",
      type: "string",
      description: 'The label in the grey box: "2025", "2013–20" or "Ahead".',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "text", type: "text", rows: 4, validation: (rule) => rule.required() }),
    defineField({
      name: "logos",
      description: "Optional row of logos under the text (the investors on 2025).",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          fields: [
            defineField({
              name: "alt",
              title: "Name",
              type: "string",
              description: "Whose logo this is. Read out to screen readers.",
              validation: (rule) => rule.required(),
            }),
          ],
        }),
      ],
    }),
  ],
  preview: { select: { title: "title", subtitle: "year" } },
});
