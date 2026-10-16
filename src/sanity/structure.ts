import type { StructureResolver } from "sanity/structure";

/** A singleton opens straight into its one document, no list in between. */
const single = (S: Parameters<StructureResolver>[0], type: string, title: string) =>
  S.listItem().title(title).id(type).child(S.document().schemaType(type).documentId(type).title(title));

/** The Studio's left-hand menu: pages first, then the shared lists, then settings. */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Lyric")
    .items([
      single(S, "homePage", "Home page"),
      single(S, "platformPage", "Platform page"),
      single(S, "aboutPage", "About page"),
      S.divider(),
      S.documentTypeListItem("customerStory").title("Customer stories"),
      S.documentTypeListItem("clientLogo").title("Client logos"),
      S.documentTypeListItem("faq").title("FAQs"),
      S.documentTypeListItem("leader").title("Leadership team"),
      S.documentTypeListItem("milestone").title("Timeline years"),
      S.divider(),
      single(S, "siteSettings", "Site settings"),
    ]);
