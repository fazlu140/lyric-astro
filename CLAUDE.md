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

## Homepage sections and notes

| # | Section | Node | Designer note | Status |
| --- | --- | --- | --- | --- |
| 1 | Nav | `5405:8099` | — | built |
| 2 | Hero | `5405:8122` | Text fades in. **Video replaces the static image.** | built (image, video pending) |
| 3 | Logo strip | `5405:8131` (logos `5536:18950`, `7758:2967`) | Logos loop continuously and seamlessly. | |
| 4 | Supply Chains Run on Decisions | `5405:8144` (states `6826:268`…) | Scroll reveals the words one at a time; background swaps to the matching image/video. | |
| 5 | Meet Your Mesh | `5405:8326` + `5451:1494` | Animation from client slides + Slack video (ask Fazlu for them). | |
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
| display | 62 | 40 | 1.2 | 600 | Hero headline |
| h1 | 56 | 36 | 1.07 | 500 | CTA headline |
| h2 | 48 | 32 | 1.1 | 500 | Section headlines |
| h3 | 32 | 24 | 1.44 | 500 | Case study card titles |
| h4 | 20 | 18 | 1.2 | 500 | Small titles |
| text-large | 18 | 16 | 1.5 | 500 | Hero and lead paragraphs |
| text-main | 16 | 15 | 1.5 | 400 | Body |
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

**Layout:** `--site-margin` max 64px is the page "rail" (the two vertical lines at x=64 and x=1376). Content inside the rails sits 40px further in (`--space-6`). Nav and hero sit 16px in (`--space-3`), at x=80. Nav switches to the desktop bar at `72rem`: seven links plus the button don't fit at the `64rem` Grid breakpoint.

## Animation and performance

- CSS first: transitions, keyframes, scroll-driven animations (`animation-timeline`) with an `@supports` fallback.
- GSAP only when CSS can't do it cleanly (pinning, scrubbed timelines, SplitText). Import it inside the component that needs it, never globally. Not installed yet.
- Other libraries (Swiper, Lenis, Rive, Three.js) only when the design clearly calls for it. Propose with a reason and wait for approval.
- Animate only `transform` and `opacity`. Always respect `prefers-reduced-motion`.
- Target Lighthouse 95+ in all four categories on mobile.
- Images through `Img` (Astro `<Image>`) with width and height. Lazy below the fold; hero eager with `fetchPriority="high"`.
- No client JavaScript unless a feature needs it.

## Workflow

- Build section by section. Stop after each one for Fazlu's review.
- Check each section against the Figma frame at 1440 (overlay screenshots) and at 375.
- Never commit to `main` once the repo is on GitHub; work on a branch. Small commits, clear messages. Fazlu pushes.
- Before starting the dev server, check `astro dev status`. If it isn't running, start it with `astro dev --background` and give the localhost link.
- Don't run `npm audit fix` and don't upgrade Astro or Lumos.

## Teaching

- Fazlu is learning the terminal, Git and Astro as we go.
- Before running a command, explain in one line what it does.
- After each task, a short lesson: what changed, why, and the Webflow equivalent.
- Answer questions fully before continuing. Keep lessons short unless asked for more.

## Still open

- General Sans font files are a stand-in from a public GitHub mirror. Replace with the official Fontshare files (or the ones from the Webflow project) before launch.
- Hero image is a 1x export (1440 wide). Swap for the hero **video** when Fazlu has it.
- Nav "Resource Hub" chevron implies a dropdown; no dropdown design read yet (check `6848:633`).
- Nav gaps are 28px (logo, divider, links). Not a token; kept as `1.75rem`.
- Section headline line heights vary on the page (48/50, 48/52, 48/56). Consolidated to 1.1 for h2.
- Style guide says headings use -3% letter spacing; the page uses 0. Page followed.
- Button hover states exist in Figma (`6830:432` "Hover state v1/v2") but aren't read yet; current hover is a guess.
- "Book a Demo" uses JetBrains Mono on the page, every other button uses Chivo Mono. Assumed Chivo Mono.
- UI mockups in "Control for the Creator" use Host Grotesk and Inter. Ask whether to match those or use General Sans.
