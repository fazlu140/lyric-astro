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
