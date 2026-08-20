import type Lenis from "lenis";

/**
 * The page's single Lenis instance, shared without a provider.
 *
 * Lenis drives scrolling itself, so anything that needs to freeze the
 * page — a fullscreen menu, a modal — has to tell Lenis. Setting
 * `document.body.style.overflow = "hidden"` does not work: the body is
 * not the scroller Lenis is animating, so the page keeps moving under
 * the overlay.
 *
 * SmoothScroll owns the lifecycle; everyone else only locks and
 * unlocks. Locks are counted so two overlapping overlays cannot have
 * the first one to close release the scroll for both.
 */

let instance: Lenis | null = null;
let lockCount = 0;

export function setLenis(next: Lenis | null) {
  instance = next;
  if (!next) lockCount = 0;
}

export function lockScroll() {
  lockCount += 1;
  if (lockCount === 1) instance?.stop();
}

export function unlockScroll() {
  if (lockCount === 0) return;
  lockCount -= 1;
  if (lockCount === 0) instance?.start();
}
