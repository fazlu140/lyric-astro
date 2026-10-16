/**
 * Downloads media from the live Webflow site into src/assets, replacing the
 * low-res stand-ins exported from Figma. Run on your own machine:
 *
 *   npm run fetch-assets
 *
 * Each entry saves to `to`, then removes any stand-in with the same name but
 * a different extension (hero-background.png makes way for .avif). Add new
 * entries here as more sections are built.
 */
import { mkdir, readdir, rm, writeFile } from "node:fs/promises";
import { basename, dirname, extname, join } from "node:path";
import { aboutImages, investors, leaders } from "../src/data/about.ts";

const CDN = "https://cdn.prod.website-files.com/6a455ce597623f0a8ccc7577";

const assets = [
  {
    from: `${CDN}/6a46cc8ef6eb99a4a072ab14_9b31a2158f20f5596e4abe5ecb7e4b4a_Hero%20BG.avif`,
    to: "src/assets/images/home/hero-background.avif",
  },
  {
    from: `${CDN}/6a507a4b18d826c8cf9eb246_227e158e4b2b6a66bac700967a3a0040_Network%20Visual.avif`,
    to: "src/assets/images/home/decisions/01-network.avif",
  },
  {
    from: `${CDN}/6a58b3fc0183b86ae7f31fe0_bbde974bdc788f7f43214584feb767d0_Demand%20Visual.avif`,
    to: "src/assets/images/home/decisions/02-demand.avif",
  },
  {
    from: `${CDN}/6a58b3fbcb044ee3818683c2_4257f1a0396fa601425accb20cee0ded_Supply%20Visual.avif`,
    to: "src/assets/images/home/decisions/03-supply.avif",
  },
  {
    from: `${CDN}/6a58b3fdab8075834d128233_5290329b571946ac1d076ac1a2dfdcb3_Inventory%20Visual.avif`,
    to: "src/assets/images/home/decisions/04-inventory.avif",
  },
  {
    from: `${CDN}/6a58b3fbeba550350c27da2c_89d64f8b543a4f80928985d8d64fc687_Transportation%20Visual.avif`,
    to: "src/assets/images/home/decisions/05-transportation.avif",
  },
  {
    from: `${CDN}/6a58b3fb17fa871a4e99ec59_7d356d613acfdcf875de2071f4da9a2e_Capacity%20%26%20Labor%20Visual.avif`,
    to: "src/assets/images/home/decisions/06-capacity-labor.avif",
  },
  {
    from: `${CDN}/6a50156b1a76d544a22906c1_67ad7b2326a4926842bac5681fe72ac0_Creator%20Zone%20Visual.avif`,
    to: "src/assets/images/home/zones/creator-zone.avif",
  },
  {
    from: `${CDN}/6a62558d16018d3f2277d695_Consumer%20Zone%20Visual.avif`,
    to: "src/assets/images/home/zones/consumer-zone.avif",
  },
  {
    from: `${CDN}/6a48108a7a6f23b4a84649be_Solution%20Graphic.avif`,
    to: "src/assets/images/home/solutions-graphic.avif",
  },
  /* Platform page */
  {
    from: `${CDN}/6a56325c203b547c0adce0a7_experience.avif`,
    to: "src/assets/images/platform/layers/01-experience.avif",
  },
  {
    from: `${CDN}/6a563277a0e062fd287d3daa_434600048041f2a8421dceb6433bd047_sequence.avif`,
    to: "src/assets/images/platform/layers/02-sequence.avif",
  },
  {
    from: `${CDN}/6a563262555202359cfe8712_algorithm.avif`,
    to: "src/assets/images/platform/layers/03-algorithm.avif",
  },
  {
    from: `${CDN}/6a56329524bac939571e0cc2_data.avif`,
    to: "src/assets/images/platform/layers/04-data.avif",
  },
  {
    from: `${CDN}/6a58d24d297b3096ff2ee5a8_bg.avif`,
    to: "src/assets/images/platform/agentic-poster.avif",
  },
  {
    from: `${CDN}/6a514614352f0fcce81fb34f_60a17c7015e29ebbfe54f1fe7129b513_agent_tab-image-1.avif`,
    to: "src/assets/images/platform/agents/01-decisions.avif",
  },
  {
    from: `${CDN}/6a514479f420a1349653701b_8212ade3b0ba0bf4ee4e76a838c59ce0_agent_tab-image-2.avif`,
    to: "src/assets/images/platform/agents/02-creators.avif",
  },
  {
    from: `${CDN}/6a5145e5bfe63519bcef49f3_643975de6648fd38a508d83c12edafd3_agent_tab-image-3.avif`,
    to: "src/assets/images/platform/agents/03-everyone.avif",
  },
  {
    from: `${CDN}/6a5145e5685ad0511eaeee9a_e58156e910908002a1dad29126c812ab_agent_tab-image-4.avif`,
    to: "src/assets/images/platform/agents/04-core.avif",
  },
  {
    from: `${CDN}/6a5145e527075e7bb81753ff_eabff10373898ea090a41eea46304708_agent_tab-image-5.avif`,
    to: "src/assets/images/platform/agents/05-open.avif",
  },
  {
    from: `${CDN}/6a54ed36c5f869f1bf723833_aws.svg`,
    to: "src/assets/logos/integrations/aws.svg",
  },
  {
    from: `${CDN}/6a54f2a6ac0bbc841907e89a_sql-server.svg`,
    to: "src/assets/logos/integrations/sql-server.svg",
  },
  {
    from: `${CDN}/6a54f2b715904f715bad3c7f_google.svg`,
    to: "src/assets/logos/integrations/google.svg",
  },
  {
    from: `${CDN}/6a54f2c915904f715bad510c_databricks.svg`,
    to: "src/assets/logos/integrations/databricks.svg",
  },
  {
    from: `${CDN}/6a54f2d64ed8cf0cf4725565_atlansian.svg`,
    to: "src/assets/logos/integrations/azure.svg",
  },
  {
    from: `${CDN}/6a54f2e2fe9280445c06ac49_postgresql.svg`,
    to: "src/assets/logos/integrations/postgresql.svg",
  },
  {
    from: `${CDN}/6a54f2efb6ce97149f631e14_snowflake.svg`,
    to: "src/assets/logos/integrations/snowflake.svg",
  },
  {
    from: `${CDN}/6a54f2fd82893847fb545848_oracle.svg`,
    to: "src/assets/logos/integrations/oracle.svg",
  },
  {
    from: `${CDN}/6a54f2b0e945a505ae4189ac_google-bigquery.svg`,
    to: "src/assets/logos/integrations/google-bigquery.svg",
  },
  {
    from: `${CDN}/6a54f30ebcdb50dbab620f99_sap.svg`,
    to: "src/assets/logos/integrations/sap.svg",
  },
  /* About page: the URLs live in src/data/about.ts, which shows them from
     the CDN until these local copies exist */
  { from: aboutImages.hero.src, to: "src/assets/images/about/hero.avif" },
  { from: aboutImages.values.src, to: "src/assets/images/about/values.avif" },
  { from: aboutImages.signature.src, to: "src/assets/images/about/signature.svg" },
  ...investors.map((logo) => ({ from: logo.src, to: `src/assets/logos/investors/${logo.file}.svg` })),
  ...leaders.flatMap((leader) => [
    { from: leader.photo, to: `src/assets/images/about/team/${leader.file}.avif` },
    ...(leader.hover ? [{ from: leader.hover, to: `src/assets/images/about/team/${leader.file}-hover.avif` }] : []),
  ]),
];

let failed = 0;

for (const { from, to } of assets) {
  try {
    const response = await fetch(from);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const bytes = Buffer.from(await response.arrayBuffer());

    await mkdir(dirname(to), { recursive: true });
    await writeFile(to, bytes);

    const name = basename(to, extname(to));
    for (const file of await readdir(dirname(to))) {
      if (file !== basename(to) && basename(file, extname(file)) === name) {
        await rm(join(dirname(to), file));
        console.log(`  removed stand-in ${file}`);
      }
    }
    console.log(`✓ ${to} (${Math.round(bytes.length / 1024)} KB)`);
  } catch (error) {
    failed += 1;
    console.error(`✗ ${to}: ${error.message}`);
  }
}

console.log(failed ? `\n${failed} failed.` : "\nAll assets downloaded.");
process.exitCode = failed ? 1 : 0;
