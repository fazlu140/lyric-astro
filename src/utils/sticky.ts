import { ScrollTrigger } from "@/utils/gsap.ts";

/**
 * Keeps a sticky stage fully usable when it is taller than the screen
 * (short phones, big text settings). Normally the stage sticks under the
 * nav; when it can't fit, it sticks with its bottom on the screen's bottom
 * instead, so its top scrolls away first and nothing at the bottom is cut.
 *
 * The stage's CSS sets `top: var(--_sticky-top, var(--nav-height))`; its
 * section can use `--_stage-h` to size the pinned scroll around it.
 */
export function fitSticky(stage: HTMLElement) {
  let lastHeight = -1;
  let refresh = 0;
  const update = () => {
    const nav =
      parseFloat(getComputedStyle(stage).getPropertyValue("--nav-height")) * 16 || 60;
    const height = stage.offsetHeight;
    stage.style.setProperty("--_sticky-top", `${Math.min(nav, window.innerHeight - height)}px`);
    stage.parentElement?.style.setProperty("--_stage-h", `${height}px`);
    /* Scroll positions depend on the section's height: re-measure once */
    if (height !== lastHeight) {
      lastHeight = height;
      window.clearTimeout(refresh);
      refresh = window.setTimeout(() => ScrollTrigger.refresh(), 150);
    }
  };
  new ResizeObserver(update).observe(stage);
  window.addEventListener("resize", update);
  update();
}
