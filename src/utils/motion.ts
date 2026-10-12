/**
 * Motion settings for every GSAP animation on the site. Retime the site here.
 * The CSS side (hovers, menus) reads the matching tokens in base.css.
 */
export const motion = {
  /** Default easing for things arriving. */
  ease: "power3.out",
  /** Easing for things moving between two states. */
  easeInOut: "power2.inOut",
  /** Seconds. */
  duration: 0.9,
  /** How far things travel as they arrive. */
  distance: "1.5rem",
  /** How far each line or word rises in a text reveal. */
  textDistance: "0.6em",
  /** Seconds between each item in a group. */
  stagger: { lines: 0.08, words: 0.04, chars: 0.015, items: 0.08 },
  /** When a scroll animation starts: element top reaches 88% down the viewport. */
  start: "top 88%",
} as const;

/** Named entrance presets, used as `data-animate="fade-up"`. */
export const presets = {
  fade: { autoAlpha: 0 },
  "fade-up": { autoAlpha: 0, y: motion.distance },
  "fade-down": { autoAlpha: 0, y: `-${motion.distance}` },
  "fade-left": { autoAlpha: 0, x: motion.distance },
  "fade-right": { autoAlpha: 0, x: `-${motion.distance}` },
  scale: { autoAlpha: 0, scale: 0.94 },
} as const;

export type MotionPreset = keyof typeof presets;
