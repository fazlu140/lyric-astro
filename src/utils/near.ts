/**
 * Runs `init` once, when `el` comes within `margin` of the screen. Section
 * scripts use it so their GSAP timelines and ScrollTriggers are built just
 * before they're needed, not all at page load: that work is what Lighthouse
 * counts as blocking time on phones.
 */
export function whenNear(el: Element, init: () => void, margin = "100% 0px") {
  const observer = new IntersectionObserver(
    (entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      init();
    },
    { rootMargin: margin },
  );
  observer.observe(el);
}
