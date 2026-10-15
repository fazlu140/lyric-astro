/*
 * GROQ queries. Read them like this:
 *   *[_id == "homePage"][0]   every document whose ID is homePage, take the first
 *   { ... }                   and give back only these fields, shaped like this
 *   stories[]->               follow each reference to the document it points to
 *   asset->url                follow the image to its file and take its URL
 * Try any of them in the Studio's Vision tab (/studio, top bar).
 */

/** An image as our `Img` component wants it: URL plus its real size. */
const image = /* groq */ `{
  "src": asset->url,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height,
  alt
}`;

const seo = /* groq */ `seo{ title, description, noindex, image }`;

export const siteSettingsQuery = /* groq */ `*[_id == "siteSettings"][0]{ ${seo} }`;

export const homePageQuery = /* groq */ `*[_id == "homePage"][0]{
  ${seo},
  "stories": stories[]->{
    title,
    "slug": slug.current,
    client,
    "image": image${image},
    "logo": logo${image}
  }
}`;

export const platformPageQuery = /* groq */ `*[_id == "platformPage"][0]{
  ${seo},
  "faqs": faqs[]->{ question, answer }
}`;
