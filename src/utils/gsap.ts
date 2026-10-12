/**
 * GSAP with its plugins registered once. Import from here, not from "gsap",
 * so every component shares one copy.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { motion } from "@/utils/motion.ts";

gsap.registerPlugin(ScrollTrigger, SplitText);
gsap.defaults({ ease: motion.ease, duration: motion.duration });

export const reducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export { gsap, ScrollTrigger, SplitText };
