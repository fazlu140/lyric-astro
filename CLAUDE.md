@AGENTS.md

# Lyric (lyric.tech) in Lumos for Astro

Rebuild of the Lyric marketing site, already live in Webflow (Lumos for Webflow), as a Lumos for Astro site. I'm Fazlu, a Webflow developer learning Astro. I direct and review, you build. After each task, explain what you did in plain language and compare to Webflow where it helps.

## Figma

- File key: `olJrkwUmIoh6w0OyO9TxmJ` (Flowtrix <> Lyric.tech), page "✅ Dev Ready".
- Homepage section `5405:10879`, desktop frame **Home `5405:8075`** (1440 wide). **No mobile frames exist**, so every fluid min is a guess and goes in the report.
- Style guide: "Flowtrix Design Guideline" frame `5503:17230` (spacing, radius, colors, typography). It disagrees with the pages in places. **The page wins** (we're pixel-matching the page); conflicts go in "Still open".
- Shared chrome lives on pages "➡️ Navigation Section" `6848:633`, "➡️ Hero Section" `6848:634`, "➡️ CTA + Footer Section" `6848:635`.
- Designer notes are Figma "Notes" widgets beside each frame (author Kinjal). Read them for every section before building it.
- Figma reads are rate limited. Read each node once and keep what you need here.

### Getting assets out of Figma

This workspace can't download from figma.com, so asset URLs from `get_design_context` don't work. Instead:

- **SVGs:** `use_figma` (read-only) with `node.exportAsync({ format: "SVG_STRING" })`. Swap `fill="white"` for `fill="currentColor"` on icons so they follow the theme.
- **Images:** `get_screenshot` with `enableBase64Response: true` and `contentsOnly: true` on the image node. This tops out at 1x (1440 wide); ask Fazlu for the 2x original when a raster image matters.
- **Video:** not in Figma. Fazlu supplies the files.

### Getting assets from the live site

The live Webflow site (https://lyric.tech) is a valid source for media. Inspect it in the browser pane to find URLs.

- **Videos** are on Lyric's own S3 (`lyric-website-files.s3.us-east-1.amazonaws.com/web-media/…`). Reference those URLs directly through `BackgroundVideo`; videos don't belong in the repo.
- **Images** are on Webflow's CDN, which this workspace can't reach. Add each one to `scripts/fetch-assets.mjs`, keep a Figma stand-in at the same path with a different extension, and ask Fazlu to run `npm run fetch-assets`. Components pick files by name with `pickAsset()` from `src/utils/assets.ts`, so the swap needs no code change.

## Homepage sections and notes

| # | Section | Node | Designer note | Status |
| --- | --- | --- | --- | --- |
| 1 | Nav | `5405:8099` | — | built |
| 2 | Hero | `5405:8122` | Text fades in. **Video replaces the static image.** | built (herocubes.mp4 over the image) |
| 3 | Logo strip | `5405:8131` (logos `7758:2967`, 24 logos) | Logos loop continuously and seamlessly. | built (1x logos, 2x/SVG pending) |
| 4 | Supply Chains Run on Decisions | `5405:8076` (states `6826:322`, `6826:361`, `6826:337`, `6826:350`, `6826:268`) | Scroll reveals the words one at a time; background swaps to the matching image/video. | built (`DecisionsScroll`, pinned) |
| 5 | Meet Your Mesh | `5405:8144` (phase 0), `5451:1494` (phase 1), `6698:7343` (full mesh) | Animation from client slides + Slack video. Live site: pinned, 4 cards, 357-frame image sequence. | built (`MeshScroll`, SVG mesh) |
| 6 | One platform. Four layers. | `5405:8329` (stack `5405:9366`) | — | built (`PlatformLayers`, SVG stack) |
| 7 | Control for the Creator / Clarity for the Consumer | `5405:9391` (screens `6544:5017`, `6544:4820`) | Shows the Creator Zone and Consumer Zone sides. | built (`ZonesCompare`, comparison slider) |
| 8 | Start anywhere | `5405:9577` | — | built (`SolutionsStart`) |
| 9 | We deliver measurable results | `5405:9588` | Card slides. | built (`CustomerStories`, native scroll-snap slider) |
| 10 | CTA + Footer | CTA `5405:9636`, footer `5405:9756` | Footer animation: prototype.lyric.tech/p/540/lyric-footer (login needed, ask Fazlu). | built (`CtaGrid`, `global/Footer` + `media/DisperseGraphic`) |

## Design decisions

These refine the Figma file. Where they conflict with a layer, these win. A homepage value that doesn't fit goes in "Still open", never silently into a new token.

**Fonts:** General Sans (400, 500, 600) for everything, Chivo Mono (variable) for buttons and mono labels (`text-style-mono`, `--secondary-family`). Self-hosted in `src/assets/fonts`, wired in `astro.config.mjs`. Preload General Sans only.

**Leading trim is off** (`--primary-trim-*: 0.5lh`). Figma measures text boxes with their line height, so turning trim off makes every Figma gap map 1:1 to a token.

**Type scale (desktop max / mobile min guess):**

| Token | Max | Min | Line height | Weight | Used for |
| --- | --- | --- | --- | --- | --- |
| display | 62 | 36 | 1.2 | 600 | Hero headline |
| h1 | 56 | 34 | 1.07 | 500 | CTA headline |
| h2 | 48 | 32 | 1.1 | 500 | Section headlines |
| h3 | 32 | 24 | 1.44 | 500 | Case study card titles |
| h4 | 20 | 18 | 1.2 | 500 | Small titles |
| text-large | 18 | 16 | 1.5 | 500 | Hero and lead paragraphs |
| text-main | 16 | 16 | 1.5 | 400 | Body |
| text-small | 14 | 14 | 1.5 | 400 | Nav, captions, buttons |

**Colors** (named after the Figma variables):

| Token | Hex | Figma |
| --- | --- | --- |
| white | #FFFFFF | Grey/white |
| grey-10 / 50 / 80 | #FAFAFA / #F2F2F2 / #EBEBEB | Grey/grey-10, 50, 80 (line grey W) |
| grey-200 | #C4C4C4 | Grey/grey-200 (text grey B) |
| grey-300 … 700 | #ADADAD #959595 #7E7E7E #676767 #505050 | Grey/grey-300 … 700 |
| grey-800 | #393939 | Grey/grey-800 (line grey B) |
| grey-900 | #181818 | Grey/Dark Grey 2 |
| black | #0D0D0D | Grey/Black |
| plum-10 / 200 / 400 / dark | #F5F3F6 / #8F759D / #735385 / #482664 | Plum Color/* |
| blue-500 | #2424F5 | "2026" badge (not a variable) |

Themes: `theme-light` white / black text / grey-500 muted / grey-80 lines. `theme-dark` black / white text / grey-200 muted / grey-800 lines. `theme-brand` plum-dark. Buttons are square (radius 0), Chivo Mono Medium: white on dark, black on light.

**Hover system** (Figma only explores button hovers, so the live site is the reference, rebuilt lighter):

- Primary buttons: a pixel fill. 30 cells reveal in a shuffled order in plum-500 and the label turns white. The order is shuffled at build time in `Button.astro`, so it ships no JavaScript (the live site builds the cells with JS on every page load). Keyboard focus shows the filled state.
- Nav links: a 1px underline draws in from the left and leaves to the right. The current page and an open dropdown keep it.
- Dropdown items: background turns plum-10 and the caret nudges 4px left.
- Logo: fades to 60%.

**Motion system** (one place to retime everything):

- CSS tokens in `base.css`: `--motion-fast` (hovers), `--motion-base` (menus, state changes), `--motion-slow` (crossfades), `--motion-ease-out`, `--motion-ease-in-out`.
- GSAP settings in `src/utils/motion.ts`: easing, duration, distances, staggers, scroll start, and named presets (`fade`, `fade-up`, `fade-down`, `fade-left`, `fade-right`, `scale`).
- Import GSAP only from `src/utils/gsap.ts` (plugins registered once, defaults applied).
- `utility/Motion.astro` (in the layout) animates by data attribute, so components need no script for entrances:
  - `reveal="lines" | "words" | "chars"` (+ `revealDelay`) on `Heading`/`Paragraph`: SplitText, each part fades up, no overflow mask. Text splits only after the fonts load (capped at 1s), because splitting in the fallback font and re-splitting restarts the animation mid-flight. Parts get `will-change` only while moving. Don't put big `text-shadow`s on revealed text: every moving line repaints its blur. Use a static shade behind the text instead (see `HeroHome`). No 3D tilt either: perspective on a wide line shears its far end into fake italics.
  - `data-animate="fade-up"` on any element; add `data-animate-children` to stagger its children, `data-animate-delay="0.2"` to wait.
  - Above the fold plays on load, below it plays once on scroll. Reduced motion shows everything at rest.
- Never use a top-level `await` in a component script: Astro bundles a page's scripts into one module, so it would delay every other script.

**Fluid sizing:** every type size, space and margin is a `-min`/`-max` pair in `base.css` that scales between `--viewport-min` (375) and `--viewport-max` (1440) with `clamp()` in rem, so browser zoom and text size settings still work and nothing costs Lighthouse points. To add one, copy an existing token's three lines and change the numbers, or run `node .agents/skills/lumos-import-figma/convert.mjs --px <value>`.

**Mobile menu:** a dark panel only as tall as its content (scrolls if taller than the screen) that wipes down from the bar, 18px links staggering in, Resource Hub as an accordion in the dark theme, page blurred and scroll locked behind it.

**Background video** (`media/BackgroundVideo.astro`): sits over a poster image and fades in once playing, so the image stays the first paint. Loads only near the screen, never for reduced motion or data saver. `delay` (ms after page load) keeps it from competing with an intro; the hero uses 1600. `playback="visible"` plays while on screen; `"manual"` leaves play/pause to a parent script.

**Decisions scroll** (`section/DecisionsScroll.astro`): the section is tall and its stage sticks under the nav; each word owns an equal slice of the scroll (`--_step-scroll: 30svh`). The active word gets the caret and slides across. The new visual wipes in with a clip-path from the side you scroll towards (bottom going down, top going up) and settles from 112% scale, while the outgoing one stays underneath drifting 6% the other way, like a slide change. Supply/Transportation play their videos only while active. Below 62rem the copy sits at the top and the words along the bottom of the stage. Words are buttons that scroll to their slice. Copy sits at the content inset (104px) rather than Figma's 136px, to line up with every other section.

**Meet Your Mesh** (`section/MeshScroll.astro`, data in `src/data/mesh.ts`): pinned, four phases (Today, Start, Shift, Evolve), copy from the live site. The live site scrubs a 357-frame image sequence on a canvas (several MB). Ours is one inline SVG that replays **the live animation, traced frame by frame** (Figma's mesh frames differ from what ships, so live is the reference): `meshCells` lists every cell with the frames where it turns grey (`g`), plum (`p`) or empty (`.`), sampled every 6 frames; `meshLines` lists every connector segment with the frames it draws between. A paused GSAP timeline 357 units long holds all of it (lines drawn with `pathLength="1"` and `stroke-dashoffset`, `autoRound: false`) and ScrollTrigger (`scrub: 0.6`) drives its playhead, so scrolling back reverses it exactly. The card text switches at each quarter of the scroll, like live. A few KB instead of megabytes, sharp at any size. Reduced motion jumps to each phase's end state. On phones the layout follows the live site: title and lead, phase card, then the whole mesh with labels at full width.

**One platform. Four layers.** (`section/PlatformLayers.astro`): copy and button from the live site ("Explore Lyric Studio" → /platform), layout from Figma: two equal columns between the rails, copy at the content inset with the paragraph pinned to the bottom, the visual running rail to rail with a divider. The live site plays a 2-second, 972×1170 video of the stack once. Ours is the Figma stack as inline SVG (each slab, cube, shadow and label a separate group) assembled by a scroll-scrubbed GSAP timeline: the dashed outline draws in (through a mask, so its dashes stay intact), the Agentic Intelligence base rises, then each slab drops onto the one below with its cube settling a beat later. Hovering the stack spreads the layers like an exploded view (CSS `translate` on inner groups, so it never fights GSAP's transforms). The dashed isometric grid is one 2 KB SVG tile as a CSS background instead of Figma's 1,024 rotated rectangles. On mobile the visual stacks under the copy.

**Creator / Consumer** (`section/ZonesCompare.astro`): copy from the live site ("Confidence for the Consumer", Figma says "Clarity"). Both screens are full-size images stacked in one grid cell; the Consumer one is clipped from the left at `--_split`, so moving the divide never moves or rescales an image. With a mouse the divide follows the pointer (eased, the loop stops at rest) and returns to the middle on leave, like the live site; on touch you drag it (`touch-action: pan-y` keeps vertical scrolling); the knob is a keyboard slider (arrows, Home, End). It nudges once when it first scrolls into view so it reads as interactive. On phones both screens show at 1.8x from the top left so the UI stays legible. Stand-ins are 1x Figma screens until `npm run fetch-assets` brings the live 2400px files.

**Start anywhere** (`section/SolutionsStart.astro`): same split as One platform, dark. The render drifts slower than the page (scrubbed `yPercent`), and a radial glow breathes over the purple block (CSS opacity animation, off for reduced motion).

**Customer stories** (`section/CustomerStories.astro`, data in `src/data/customer-stories.ts`): the 15 live stories (titles, links, images, logos), Figma's wide card. No Swiper: a native `scroll-snap` track (touch and trackpad for free), arrow buttons that disable at the ends. Arrows, autoplay and mouse drag all move through one GSAP glide (`power3.out`, snapping paused while it runs, so nothing jumps); a drag follows the pointer 1:1, then is carried by the speed of the throw and settles on the nearest card, and never fires a click. Phones stack the card (photo, title, logo and button) with the arrows on their own row, as on live; tablets show narrow stacked cards; Figma's wide card from 62rem. The track is clipped at the content line on the left and runs under the right rail, and autoplay every 5s that pauses on hover/focus/off-screen and stops for good after any interaction (none for reduced motion). The track runs rail to rail and clips under the right rail. Images are served from the Webflow CMS CDN through Astro's image service (`image.domains` in `astro.config.mjs`), so builds need network access to it; when the CMS moves to Astro this becomes a content collection.

**Grid frames** (`wrapper/GridFrame.astro`): the live site's square-cell dashed grid with a card on it, used by the homepage CTA, the Platform hero, integrations and CTA. Props: `theme`, `cols`/`rows` (desktop), `card` ([column, row, width, height] in cells), `lit` cells, `plus` color, `pad` (empty cells above and below on phones). Slots: the card content (default), `layer` (connectors and dots: `.grid-frame_links` SVG whose viewBox is the grid in cells, `.grid-frame_dot`), `aside` (anything else placed on cells, like the integration logos). Anything marked `data-grid-cover` keeps the pointer and ambient cells from lighting under it.

**CTA** (`section/CtaGrid.astro`, a `GridFrame`): Figma's 20 by 8 grid of square dashed cells (one SVG tile as a background, sized with `cqw` so cells stay square), card over columns 6 to 15, lit cells and two connectors from Figma. On entry the lit cells switch on and the connectors draw; while on screen a random cell comes online now and then, and the cell under the mouse lights and fades. From 62rem it is Figma's 20 by 8 grid with the card over 10 by 6 cells (as on live from 992px; between 62 and 80rem the copy steps down a size to fit). Below that the card sits in the flow, inset by whole cells (8 or 12 columns), and a ResizeObserver rounds its height up to whole cells so the grid lines meet its edges. Copy from the live site. The card has plus marks on its four corners (live's corner stars, 20px, grey-700) that spin in with the entrance. On phones the card is inset two thirds of a cell from the rails, matching live's width.

**Footer** (`global/Footer.astro`): Figma layout with the live site's links, AI assistant links and socials. "Ask AI" links carry the current page's URL (live always sends the homepage). The big wordmark is `media/DisperseGraphic.astro`, a reusable wrapper for any SVG: blocks scatter from the pointer and spring back, as on the live site, but at rest the real SVG shows (sharp, instant, no canvas painting), the blocks are prepared in idle time once it nears the screen, the canvas only shows while blocks move, and a tap scatters them on touch screens.

**Pinned stages taller than the screen** (`utils/sticky.ts`, `fitSticky`): a stage is at least one screen tall but grows with its content. When it is taller than the screen (short phones, browser bars, large text), it sticks with its bottom on the screen's bottom instead of under the nav, so the top scrolls away first and nothing is cut off. It also sets `--_stage-h` on the section so the pinned scroll length allows for it. Used by Decisions (with a spacer element for the scroll distance) and the Mesh.

**Pinned sections in Lumos:** `Section` treats any child that isn't `.container` as a background layer (absolute, no pointer events), so a sticky stage either is the container (`containerClass`) or opts back in with `inset: auto; pointer-events: auto`. And `.container` centres its content (`justify-content: center`), so a grid stage needs `grid-template-columns: minmax(0, 1fr)` or its column shrinks to its content.

**Nav dropdown** (`NavDropdown.astro`): Resource Hub mega menu, content copied from the live site (Figma has no design for it). Opens on hover with a short close delay on desktop, on click or Enter everywhere, closes on Escape or when focus leaves. The page behind blurs. In the mobile menu it becomes an accordion; while it is open the menu becomes a full-height sheet that scrolls on its own, and the opened group scrolls to the top.

**Section borders:** `<Section borders="top" | "sides" | "both" | "frame">` draws the full-width divider and the two rails with pseudo-elements, so they add no markup (the live site uses 5 divs per section). `"frame"` is the live site's section opener: a band (`--band-height`, 30 to 50px) with a line above and below, crossed by the rails, so the margins outside the rails read as boxes. It renders `wrapper/SectionBand.astro` before the section; the footer uses the same band at its top and bottom. Every section from Meet Your Mesh down uses `"frame"`, as on the live site; the logo strip keeps single lines. With side rails on, content is inset by `--content-inset`.

**Border map** (measured on the live site at 1440, keep to it):

| Section | Top | Bottom | Rails | `borders=` |
| --- | --- | --- | --- | --- |
| Hero | none | none | no | `none` |
| Logo strip | line | line | yes | `box` |
| Decisions | none (full-bleed) | none | no | n/a |
| Mesh, Platform, Creator/Consumer, Start, Stories, CTA | 50px band | none (next band closes it) | yes | `frame` |
| Footer | band | line, then band | yes | built in |

**Breakpoints used for layout:** below 48rem phones (stacked), 48 to 62rem tablets (most sections still stacked or simplified), 62rem up desktop layouts (matches the live site's 992px switch). Check every section at 320, 375, 768, 1024 and 1280 before handing over, plus `document.documentElement.scrollWidth` for sideways overflow.

**Layout and edges** (the live site's insets vary 18 to 58px on mobile; ours are fixed):

| Token | Mobile (375) | Desktop (1440) | What sits there |
| --- | --- | --- | --- |
| `--site-margin` | 16 | 64 | The rails |
| `--site-margin` + `--content-inset` | 28 | 104 | Content inside railed sections |
| `--site-margin` + `--edge-inset` | 16 | 80 | Nav, hero and full-bleed sections (on mobile they sit on the rail line, like the live site) |

`--max-width-main` is 82rem (1312px, rail to rail). Nav switches to the desktop bar at `72rem`: seven links plus the button don't fit at the `64rem` Grid breakpoint.

## Platform page (`src/pages/platform.astro`)

Figma section `5405:10880`, frame `5405:13684`. Copy, SEO and media from the live page; all copy lives in `src/data/platform.ts` (verbatim from live).

| Section | Figma | Component | Notes |
| --- | --- | --- | --- |
| Hero | `5405:13685` | `PlatformHero` (GridFrame light 20×13, card 12×7, plum plus marks) | "Explore the Platform" jumps to `#platform`. Live's button has no link. |
| Layers | `5405:14008`, states `5451:6555` `6419` `6479` `6359`, Agentic `5405:15412` | `LayersScroll` | Rebuilt from live's own script and CSS (`image_slider`). Desktop: pinned, one step per 80svh. Copy blocks crossfade in one grid cell on the left (solid background). Right: a track of slides 35svh tall at the live images' ratio (2088×1324), 2rem apart, translated so the active one sits in the middle; the rest scale to 60%, fade to 50% and go grey. The finale: section goes pure black (`#000`, so the video's black has no edge), the columns trade places (offsets measured like live, CSS `translate` 1.1s), the layer images and cubes fade out, a 70svh square with the live video (`processtimelinevideo60fps.mp4`, poster `bg.avif`) fades in and plays once. The copy column slides over the visual, so the swap reads as a wipe. Phones and tablets: each layer stacked as on live (copy, features, then image); the whole section goes dark as the last layer comes up. Images use `Img transparent` (no skeleton tint): the live images are transparent PNG-style AVIFs. |
| Every layer knows supply chain | `5405:14076` | `TextScrub` | Words split at build time; scroll-driven CSS animation (`view-timeline`), GSAP scrub fallback where unsupported. The dim words at rest fail Lighthouse contrast on purpose (it is the effect). |
| Agents at every layer | `5405:14081` | `AgentTabs` | ARIA tabs (arrows, Home, End). Only the active tab's video loads, once in view; it plays once, then the next tab follows after 1.5s until someone picks a tab. |
| Built for your role | `5405:14131` | `RoleCards` | Live SVGs. No "Read more" links (live has none). Hover: grey-900 card, drawing lifts, dashed guides run. |
| Integrations | `5405:14250` | `Integrations` (GridFrame dark 20×11) | Logos on Figma's cells; under 62rem a 2-column grid of 2-cell rows. Logos load from the Webflow CDN until `npm run fetch-assets` saves them to `src/assets/logos/integrations/`. |
| CTA | `5405:14605` | GridFrame light in the page | "Join our next webinar" links to `/webinars` (live's buttons have no links; confirm). |
| FAQ | `5405:14722` | `Faq` | Native `<details name>` (one open at a time, no JS), animated height where supported, FAQPage JSON-LD. 11 Q&As from live. |

Titles that already contain " | " are used as is by `BaseHead` (so this page keeps live's "| Lyric Studio").

## About page (`src/pages/about-us.astro`)

Figma section `6591:579`, frame `6951:2654` (notes by Kinjal: prototype at prototype.lyric.tech/p/540/website-mockup-lyric-company-page-final, team photos swap on hover like the live site, the four newest leaders have no hover photo, the Chorus names scroll on a loop). Copy, SEO and media URLs from the live page (lyric.tech/about-us); all of it lives in `src/data/about.ts`. URL is `/about-us` as on live (the nav link said `/about`, now fixed).

| Section | Figma | Component | Notes |
| --- | --- | --- | --- |
| Founder's letter | `6951:2655` | `AboutLetter` | Team photo (greyscale) under the nav, drifting slower than the page; the letter card starts on the photo and runs onto white. Bold sentence and live's byline ("Ganesh Ramakrishna, Founder & CEO") instead of Figma's "With Love". |
| How did we get here? | `6951:2721` | `AboutTimeline` | 8 years on a ruler (one tall tick, eight short, CSS gradients) running off the right edge. Native scroll-snap (trackpad and swipe), arrows step one year and disable at the ends (the disabled one is outlined, as in Figma). Investor logos on 2025. |
| Five things we don't compromise on | `6951:2896` | `AboutValues` | Accordion (real buttons, `aria-expanded`) that plays through by itself like live: 10s each, the open one's line fills in plum (a CSS animation; `animationend` opens the next). Pauses off screen, under the mouse and while the keyboard is inside; no autoplay for reduced motion. On desktop the list keeps the height of its longest state, so nothing jumps. |
| The people who set the tempo + Chorus | `7164:5023` | `AboutTeam` | 10 leaders as on live, hover crossfades to the playful photo (CSS only). "And with them": every name scrolls up (CSS, 60s) behind the word CHORUS, which is white on black with `mix-blend-mode: darken`, so the names only show through the letters (live's technique). |
| One Chorus, six cities | `6951:3002` | `AboutCities` (GridFrame dark 20×10) | Six offices as on live (Figma has five, no Pune). Pins are dashed boxes on cells with a stem; the globe lines are an SVG circle and two meridians in cell units (live uses an image). Phones: two columns of pins. |
| Add your voice to the Chorus | `6951:3263` | GridFrame light in the page | "See open roles" opens Ashby in a new tab. |

**Media without stand-ins:** `assetOr()` (`src/utils/assets.ts`) returns the local file once `npm run fetch-assets` has saved it, otherwise the CDN URL from `about.ts`. `fetch-assets.mjs` imports `about.ts`, so a new leader needs only a line in the data file.

## Not for search engines

This is a practice rebuild of a client's site (their design is their IP), so **nothing may be indexed**. `ALLOW_INDEXING = false` in `src/utils/seo.ts` makes every page noindex (no page prop or CMS field can override it), `robots.txt` disallows all crawlers, the sitemap is empty, and `vercel.json` adds `X-Robots-Tag: noindex` to every response. On top of that, Vercel Deployment Protection (Vercel Authentication, All Deployments) should be on so only invited people can open it. Never flip `ALLOW_INDEXING` without Fazlu saying so.

## CMS (Sanity)

Content that editors change lives in Sanity; layout, animation and the rest of the copy stay in code. Studio is embedded in the site at **/studio** (`@sanity/astro` + `@astrojs/react`; React loads only on that route; hash routing because the site is static). Project ID and dataset come from `.env` (`PUBLIC_SANITY_PROJECT_ID`, `PUBLIC_SANITY_DATASET`, see `.env.example`); both are public. **Without a project ID the site builds from the local data files and there is no /studio**, so nothing breaks before the project exists or on a Vercel build without the variables.

| File | What it is |
| --- | --- |
| `sanity.config.ts` | The Studio: plugins (Structure, Vision), schema, singleton rules |
| `sanity.cli.ts` | Settings for `npx sanity …` (reads `.env`) |
| `src/sanity/schemaTypes/` | The content model: `seo` (object), `customerStory`, `faq` (answer is Portable Text), singletons `homePage`, `platformPage`, `siteSettings` |
| `src/sanity/structure.ts` | The Studio's left menu (pages, lists, settings) |
| `src/sanity/queries.ts` | GROQ queries (try them in /studio → Vision) |
| `src/sanity/client.ts` | Build-time client (published content only, no token), `urlFor()` image URLs, Portable Text to HTML |
| `src/sanity/content.ts` | `getHomeContent()`, `getPlatformContent()`: Sanity data in the shape the components already use, local fallback per document |
| `scripts/sanity-seed.mjs` | `npm run sanity:seed` writes `sanity-seed.ndjson` (gitignored) from the local data, for `npx sanity dataset import` |

- In the CMS now: home SEO + customer stories slider (references, drag to reorder), platform SEO + FAQ list, site default SEO. Pages merge page SEO over site SEO over the page's hardcoded fallback.
- Lists are documents, pages pick and order them with **references** (one FAQ can sit on several pages). One-off page content goes in the page's **singleton** (fixed ID, no create or delete in the Studio).
- Static site: content is read at build time. Publishing needs a rebuild: a Sanity webhook calls a Vercel deploy hook.
- Story images come from Sanity's CDN (`cdn.sanity.io`, in `image.domains`) once imported; the seed import copies them from the Webflow CDN.
- Two ways in: the embedded Studio at `/studio` on the site, and the hosted Studio from `npx sanity deploy` (`<name>.sanity.studio`, listed under Studios in sanity.io/manage). The hosted one only sees `SANITY_STUDIO_` variables, so `sanity.cli.ts` copies the `PUBLIC_` pair across.
- **Visual Editing (Presentation tool).** One codebase, two builds. Production (no flag): static, published content. Preview (`SANITY_VISUAL_EDITING=true`, set on Vercel for **Preview** deployments only, plus a Viewer token in `SANITY_API_READ_TOKEN`): `output: "server"` with `@astrojs/vercel`, the client reads **drafts** with **stega** (invisible markers in each string saying which field it came from), and `BaseLayout` renders `<VisualEditing>` overlays that reload the page on every edit. `src/sanity/presentation.ts` maps pages to documents and back. Anything that goes into a URL, an attribute, `<head>` or a comparison must go through `clean()` (stega would break it). The hosted Studio opens `SANITY_STUDIO_PREVIEW_URL` (the Vercel preview URL; localhost by default); `@sanity/vercel-protection-bypass` gets it past Vercel Authentication with the project's "Protection Bypass for Automation" secret, pasted once in the Studio's "Vercel Protection Bypass" tab.
- **Dependency fixes, keep them until upstream fixes the bugs** (check on each `@sanity/astro` upgrade):
  - `overrides` in `package.json` pins `@sanity/visual-editing` to ^6. `@sanity/astro` 3.5 still asks for 5.x (built for Sanity UI 3) while the Studio uses UI 4, so the overlay crashed with "`_visual-editing` is not exported by @sanity/ui".
  - `optimizeDeps.include: ["@sanity/visual-editing/react"]` (preview mode only): the overlay pulls in CommonJS lodash, which Vite must pre-bundle or the page fails to hydrate.
  - `fixSanityAliases()` in `astro.config.mjs`: `@sanity/astro` points the `sanity` and `styled-components` aliases at each package's folder by cutting `/package.json` off a path, but on Windows the path uses `\`, so nothing is cut and the alias points at the `package.json` file itself ("`css` is not exported by styled-components/package.json"). The plugin runs after Sanity's (`enforce: "post"`) and corrects those entries in place. Adding a second, correct alias does not work: Sanity's still wins inside Vite's pre-bundling.
  - Test any Vite or Sanity change on Windows paths, or simulate them, before handing over. After changing dependencies or Vite config, start with `npm run dev -- --force` to rebuild Vite's cache.
- Next steps, in order: move more sections into the model one at a time; customer story pages (`/customer-stories/[slug].astro` with `getStaticPaths`).

## Animation and performance

- **GSAP rounds px values** of CSS properties by default. Anything that tweens between small numbers, like `strokeDashoffset` from 1 to 0 on a `pathLength="1"` path, needs `autoRound: false` or it jumps from 1 to 0 in one step.

- CSS first: transitions, keyframes, scroll-driven animations (`animation-timeline`) with an `@supports` fallback.
- GSAP (installed, 3.15) for SplitText, ScrollTrigger and anything CSS can't do cleanly. Always import from `@/utils/gsap.ts`. When an update adds a package, tell Fazlu to run `npm install`.
- Other libraries (Swiper, Lenis, Rive, Three.js) only when the design clearly calls for it. Propose with a reason and wait for approval.
- Animate only `transform` and `opacity`. Always respect `prefers-reduced-motion`.
- Target Lighthouse 95+ in all four categories on mobile.
- Section scripts initialise lazily with `whenNear()` (`src/utils/near.ts`): timelines and ScrollTriggers are built when the section is a screen away, not at page load. This took mobile Total Blocking Time to ~0.
- `Motion.astro` reveals use an IntersectionObserver, not one ScrollTrigger per element. SplitText runs with `aria: "none"` (no aria-label on `<p>`).
- Videos and below-the-fold images load only near the screen. Local Lighthouse (built with `LYRIC_OFFLINE=1`, which skips remote CMS images) is 96 to 98 on mobile; real-world scores also include the S3 videos and Webflow CDN, which this workspace can't reach.
- Images through `Img` (Astro `<Image>`) with width and height. Lazy below the fold; hero eager with `fetchPriority="high"`.
- No client JavaScript unless a feature needs it.

## Workflow

- For every section, check all three sources before building: the Figma frames and notes, the live Webflow site (https://lyric.tech: structure, interactions, real copy and media), and this file. Then make the best call, aiming to do better than the live site, and note the decision here.
- Build whole pages now (the components and patterns are in place), then stop for Fazlu's review. Reuse `GridFrame`, `Section` borders, `whenNear`, `fitSticky` and the data-file pattern before writing anything new.
- Check each section against the Figma frame at 1440 (overlay screenshots) and at 375.
- The repo is on GitHub (`fazlu140/lyric-astro`, private) and deploys to Vercel from `main`. Work on a branch per section (`section/<name>`); every pushed branch gets a Vercel preview link. Fazlu reviews, pushes and merges. Small commits, clear messages.
- Before starting the dev server, check `astro dev status`. If it isn't running, start it with `astro dev --background` and give the localhost link.
- Don't run `npm audit fix` and don't upgrade Astro or Lumos.

## Teaching

- Fazlu is learning the terminal, Git and Astro as we go.
- Before running a command, explain in one line what it does.
- After each task, a short lesson: what changed, why, and the Webflow equivalent.
- Answer questions fully before continuing. Keep lessons short unless asked for more.

## Still open

- About: Figma's team grid has two more leaders than live, Hitesh Mulani (Finance) and Casey Jameson (People), photos in Figma. Add them to `leaders` once confirmed.
- About: Figma says "One Chorus, five cities"; live (and ours) says six, with Pune.
- About: team, letter and timeline are good candidates for Sanity next (editors will want to add people).

- Platform: live's hero and CTA buttons have no links. Ours: "Explore the Platform" → `#platform`, "Book a working session" → `/demo`, "Join our next webinar" → `/webinars`. Confirm.
- Platform layer images, agent tab posters and integration logos are Figma stand-ins or CDN links until `npm run fetch-assets`. The Agentic AI cylinder is a 1x Figma still under the live video.

- Cookie Settings in the footer is a button with `data-cookie-settings`; wire it to the consent tool when one is added.
- Footer socials follow the live site (LinkedIn, YouTube); Figma shows X and LinkedIn. Footer link columns also follow the live site.
- Customer story images load from the Webflow CDN at build time. If the CMS is retired, download them (or move to a content collection) first.
- Section 7 and 9 headlines use the live copy ("Confidence for the Consumer", "Delivering measurable results"); Figma says "Clarity" and "We deliver". Confirm with the designer.

- General Sans font files are a stand-in from a public GitHub mirror. Replace with the official Fontshare files (or the ones from the Webflow project) before launch.
- Client logos are 1x crops from a Figma screenshot (40px tall, soft on retina). Fazlu to export the 24 logo frames from `7758:2967` as 2x PNG or SVG into `src/assets/logos/clients/` with the same file names.
- Logo strip padding is 60px top and bottom (no token, kept as `3.75rem`). The marquee pauses on hover; its pause button only shows on keyboard focus since the design has none.
- Hero headline waits for GSAP to reveal it, which may cost a little LCP. Revisit when measuring Lighthouse.
- Hero image and the 6 decision visuals are 1x Figma stand-ins until Fazlu runs `npm run fetch-assets`.
- Decisions section on mobile: full-width shade added (Figma has no mobile), words at h3 size.
- In a list, never style "item after item" with `li + li`: Astro renders a component's `<script>` where the component sits, which can land between list items. Use `li:not(:first-of-type)`.
- Dropdown has no Figma design; layout and copy follow the live site. Confirm with the designer.
- Nav gaps are 28px (logo, divider, links). Not a token; kept as `1.75rem`.
- Section headline line heights vary on the page (48/50, 48/52, 48/56). Consolidated to 1.1 for h2.
- Style guide says headings use -3% letter spacing; the page uses 0. Page followed.
- Figma button hover explorations (`6830:432` v1: gradient + 6px square marker, v2: invert to white, plus a cursor glow) differ from the live site's pixel fill. Pixel fill chosen; confirm.
- "Book a Demo" uses JetBrains Mono on the page, every other button uses Chivo Mono. Assumed Chivo Mono.
- UI mockups in "Control for the Creator" use Host Grotesk and Inter. Ask whether to match those or use General Sans.
