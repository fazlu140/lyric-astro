/**
 * Customer stories shown on the homepage slider. Copied from the live
 * Webflow CMS (order, titles, links, images and logos). When the CMS moves
 * to Astro this becomes a content collection with the same fields.
 */
export type CustomerStory = {
  title: string;
  href: string;
  image: { src: string; width: number; height: number };
  logo: { src: string; width: number; height: number; alt: string };
};

const CMS = "https://cdn.prod.website-files.com/6a455ce597623f0a8ccc7579";
const STORIES = "/customer-stories";

const logos = {
  elf: { src: `${CMS}/6a67658b672e89ac90cd672a_elif.webp`, width: 76, height: 80, alt: "e.l.f. Beauty" },
  pepsico: { src: `${CMS}/6acd11ac4b53c2dff56d3c54_PEP_BIG%201.svg`, width: 168, height: 50, alt: "PepsiCo" },
  bobEvans: { src: `${CMS}/6a6765d9b41f9b394085f3e9_bocb%20evans.webp`, width: 164, height: 80, alt: "Bob Evans Farms" },
  wesco: { src: `${CMS}/6a67642921ac636980d06bff_wesco.webp`, width: 80, height: 80, alt: "WESCO" },
  exol: { src: `${CMS}/6a676579674c345cf796c8e6_exol.webp`, width: 197, height: 80, alt: "Exol" },
  cokeConsolidated: { src: `${CMS}/6a676597b3a7f47121d1cab4_coca-cola.webp`, width: 120, height: 80, alt: "Coca-Cola Consolidated" },
  suntory: { src: `${CMS}/6a75c5517a22773039b40dd4_suntory.avif`, width: 116, height: 40, alt: "Suntory Global Spirits" },
  krispyKreme: { src: `${CMS}/6a6765443f0188c92f48386c_krispy.webp`, width: 141, height: 80, alt: "Krispy Kreme" },
  bodyarmor: { src: `${CMS}/6a6765bc21ac636980d1866e_boyarmor.webp`, width: 232, height: 80, alt: "BODYARMOR" },
  cocaCola: { src: `${CMS}/6a69c3daec7af9532160f48c_Picture1.svg`, width: 164, height: 102, alt: "Coca-Cola" },
  esteeLauder: { src: `${CMS}/6a6765824987b7c86793861f_estee.webp`, width: 116, height: 80, alt: "Estée Lauder" },
  treehouse: { src: `${CMS}/6a67643826d3b510da044eab_treehouse.webp`, width: 96, height: 80, alt: "TreeHouse Foods" },
};

const image = (file: string, width: number, height: number) => ({
  src: `${CMS}/${file}`,
  width,
  height,
});

export const customerStories: CustomerStory[] = [
  {
    title: "e.l.f. Beauty Goes From Excel Macros to Connected Planning in Six Months",
    href: `${STORIES}/how-elf-beauty-connects-demand-and-supply-with-lyric-studio`,
    image: image("6accf900a21b36b81f2e895b_Vibrant%20e.l.f.%20cosmetics%20shelf%20display.webp", 947, 947),
    logo: logos.elf,
  },
  {
    title: "How PepsiCo Breaks Big Network Problems Into Bite-Sized Pieces",
    href: `${STORIES}/how-pepsico-breaks-down-big-network-problems-with-lyric-studio`,
    image: image("6accf6506da2761edd393812_PepsiCo%E2%80%99s%20six-panel%20food%20and%20drink%20mosaic.webp", 947, 947),
    logo: logos.pepsico,
  },
  {
    title: "Bob Evans Farms turns trade promotion audits into real savings",
    href: `${STORIES}/how-bob-evans-farms-audits-every-promotion-with-lyric-studio`,
    image: image("6ac3761801fcc795eb91ee4c_WebHeader028FullResv1v2-scaled%203.webp", 946, 946),
    logo: logos.bobEvans,
  },
  {
    title: "How WESCO replaced disconnected planning tools with Lyric Studio",
    href: `${STORIES}/how-wesco-connected-its-planning-tools-using-lyric`,
    image: image("6ab37fd7323fbe4d41759c80_wesco.webp", 947, 765),
    logo: logos.wesco,
  },
  {
    title: "How Exol scales robotic warehouse design with Lyric Studio",
    href: `${STORIES}/how-exol-scales-robotic-warehouse-design-using-lyric`,
    image: image("6ab23883c491d2aea084033f_Exol-Freight-Logo-scaled.webp", 946, 541),
    logo: logos.exol,
  },
  {
    title: "How Coca-Cola Consolidated compounds its problem solving with Lyric Studio",
    href: `${STORIES}/how-coca-cola-consolidated-compounds-problem-solving-using-lyric`,
    image: image("6ab236386cc6c171b631e2b1_Coca%20Cola%20Consolidated%20Brian%20.webp", 946, 518),
    logo: logos.cokeConsolidated,
  },
  {
    title: "Why Suntory used Lyric Studio to swap the static deck for a live plan",
    href: `${STORIES}/how-suntory-global-spirits-replaced-static-plans-using-lyric`,
    image: image("6ab23431ff0f54955120b78e_suntory%20gs.webp", 946, 631),
    logo: logos.suntory,
  },
  {
    title: "Krispy Kreme's recipe for faster forecasting with Lyric Studio",
    href: `${STORIES}/how-krispy-kreme-speeds-up-forecasting-using-lyric`,
    image: image("6ab230555579bb5073393fb2_Krispy%20Kreme%20-%20James%20Carter.webp", 946, 522),
    logo: logos.krispyKreme,
  },
  {
    title: "How BODYARMOR saved tens of millions using Lyric Studio",
    href: `${STORIES}/how-bodyarmor-saved-tens-of-millions-using-lyric`,
    image: image("6a7da35e67aabe7c071cccd9_6a7da35aad7d773d536b2448_attachment.webp", 2730, 1536),
    logo: logos.bodyarmor,
  },
  {
    title: "How Coca-Cola achieves dynamic order management",
    href: `${STORIES}/how-coca-cola-achieves-dynamic-order-management`,
    image: image("6a7da35cad7d773d536b25c2_6a7da359349f28ea16bdc792_Introducing-Line_-The-Modern-Voice-Agent-Development-Platfor.webp", 792, 640),
    logo: logos.cocaCola,
  },
  {
    title: "How Estée Lauder future-proofed its supply chain with Lyric Studio",
    href: `${STORIES}/how-estee-lauder-future-proofed-its-supply-chain-using-lyric`,
    image: image("6a7da361fa0ee10a08d6a8ba_6a7da35b47d394733dd1c364_209b9a127cd260b0eeaf570178a4444eb1d9407e.webp", 2752, 1536),
    logo: logos.esteeLauder,
  },
  {
    title: "How TreeHouse Foods democratizes network design using Lyric Studio",
    href: `${STORIES}/how-treehouse-foods-democratizes-network-design-using-lyric-studio`,
    image: image("6a7da3637e627dc577621430_6a7da35e7c7d945c57446b4f_Introducing-Line_-The-Modern-Voice-Agent-Development-Platfor.webp", 1187, 960),
    logo: logos.treehouse,
  },
  {
    title: "How Coca-Cola is orchestrating models using Lyric Studio",
    href: `${STORIES}/how-coca-cola-is-orchestrating-models-using-lyric-studio`,
    image: image("6a7da365349f28ea16bdd1d5_6a7da360b10621f48d7876f2_Introducing-Line_-The-Modern-Voice-Agent-Development-Platfor.webp", 1187, 960),
    logo: logos.cocaCola,
  },
  {
    title: "How Lyric Studio is enabling faster and better decision-making for Krispy Kreme",
    href: `${STORIES}/how-lyric-is-enabling-faster-and-better-decision-making-for-krispy-kreme`,
    image: image("6a7da3672aeeb3de46760bce_6a7da3627a1153694a549a7f_attachment-1.webp", 2730, 1536),
    logo: logos.krispyKreme,
  },
  {
    title: "How Coca-Cola Consolidated unlocked $5.9M in supply chain savings",
    href: `${STORIES}/how-coca-cola-consolidated-unlocked-5-9m-in-supply-chain-savings`,
    image: image("6a7da369e986731b70577f67_6a7da365b10621f48d7878c3_Link-1.webp", 1818, 2520),
    logo: logos.cokeConsolidated,
  },
];
