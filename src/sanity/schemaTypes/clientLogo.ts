import { defineField, defineType } from "sanity";

/** A client's logo for the homepage logo strip. The home page picks and orders them. */
export const clientLogo = defineType({
  name: "clientLogo",
  title: "Client logo",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      description: "The company. Used as the logo's alt text.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "logo",
      type: "image",
      description: "White on transparent, SVG or a PNG at least 80px tall.",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: { select: { title: "name", media: "logo" } },
});
