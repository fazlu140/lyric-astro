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
| 6 | One platform. Four layers. | `5405:9391` | — | |
| 7 | Control for the Creator / Clarity for the Consumer | `5405:9577` (screens `6544:5017`, `6544:4820`) | Shows the Creator Zone and Consumer Zone sides. | |
| 8 | Start anywhere | `5405:9588` | — | |
| 9 | We deliver measurable results | `5405:9636` | Card slides. | |
| 10 | CTA + Footer | `5405:9756` | Footer animation: prototype.lyric.tech/p/540/lyric-footer (login needed, ask Fazlu). | |

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

**Decisions scroll** (`section/DecisionsScroll.astro`): the section is tall and its stage sticks under the nav; each word owns an equal slice of the scroll (`--_step-scroll: 30svh`). The active word gets the caret and slides across. The new visual wipes in with a clip-path from the side you scroll towards (bottom going down, top going up) and settles from 112% scale, while the outgoing one stays underneath drifting 6% the other way, like a slide change. Supply/Transportation play their videos only while active. Words are buttons that scroll to their slice. Copy sits at the content inset (104px) rather than Figma's 136px, to line up with every other section.

**Meet Your Mesh** (`section/MeshScroll.astro`): pinned like the decisions section, four phases (Today, Start, Shift, Evolve; copy from Figma for 0 and 1, the live site for 2 and 3). The live site plays a 357-frame image sequence on a canvas; ours is one inline SVG built from Figma's real coordinates (cells, dashed slots, connector paths), so it is vector-sharp and a few KB. Each cell carries its state per phase as classes (`s1-p` = plum in phase 1, `s0-g` = grey in phase 0) and the section's `data-phase` switches them, with a shuffled per-cell delay. Connector lines draw with `pathLength="1"` and `stroke-dashoffset`. Phase 2 has no Figma frame: it is phase 1 plus the full mesh's first four functions. The progress bar follows scroll continuously (transform only), and cards share one grid cell so the outgoing one leaves before the next arrives. Below 48rem the label column and labels row are dropped and the grid fills the width.

**Pinned sections in Lumos:** `Section` treats any child that isn't `.container` as a background layer (absolute, no pointer events), so a sticky stage either is the container (`containerClass`) or opts back in with `inset: auto; pointer-events: auto`. And `.container` centres its content (`justify-content: center`), so a grid stage needs `grid-template-columns: minmax(0, 1fr)` or its column shrinks to its content.

**Nav dropdown** (`NavDropdown.astro`): Resource Hub mega menu, content copied from the live site (Figma has no design for it). Opens on hover with a short close delay on desktop, on click or Enter everywhere, closes on Escape or when focus leaves. The page behind blurs. In the mobile menu it becomes an accordion; while it is open the menu becomes a full-height sheet that scrolls on its own, and the opened group scrolls to the top.

**Section borders:** `<Section borders="top" | "sides" | "both">` draws the full-width divider and the two rails with pseudo-elements, so they add no markup (the live site uses 5 divs per section). With side rails on, content is inset by `--content-inset`.

**Layout and edges** (the live site's insets vary 18 to 58px on mobile; ours are fixed):

| Token | Mobile (375) | Desktop (1440) | What sits there |
| --- | --- | --- | --- |
| `--site-margin` | 16 | 64 | The rails |
| `--site-margin` + `--content-inset` | 28 | 104 | Content inside railed sections |
| `--site-margin` + `--edge-inset` | 16 | 80 | Nav, hero and full-bleed sections (on mobile they sit on the rail line, like the live site) |

`--max-width-main` is 82rem (1312px, rail to rail). Nav switches to the desktop bar at `72rem`: seven links plus the button don't fit at the `64rem` Grid breakpoint.

## Animation and performance

- CSS first: transitions, keyframes, scroll-driven animations (`animation-timeline`) with an `@supports` fallback.
- GSAP (installed, 3.15) for SplitText, ScrollTrigger and anything CSS can't do cleanly. Always import from `@/utils/gsap.ts`. When an update adds a package, tell Fazlu to run `npm install`.
- Other libraries (Swiper, Lenis, Rive, Three.js) only when the design clearly calls for it. Propose with a reason and wait for approval.
- Animate only `transform` and `opacity`. Always respect `prefers-reduced-motion`.
- Target Lighthouse 95+ in all four categories on mobile.
- Images through `Img` (Astro `<Image>`) with width and height. Lazy below the fold; hero eager with `fetchPriority="high"`.
- No client JavaScript unless a feature needs it.

## Workflow

- For every section, check all three sources before building: the Figma frames and notes, the live Webflow site (https://lyric.tech: structure, interactions, real copy and media), and this file. Then make the best call, aiming to do better than the live site, and note the decision here.
- Build section by section. Stop after each one for Fazlu's review.
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
