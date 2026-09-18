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

/**
 * Scroll-progress fan-out.
 *
 * Lenis drives the scroll itself and does not emit native `scroll`
 * events on window while it does — a plain `window.addEventListener
 * ("scroll", …)` here never fires, and Motion's `useScroll` only
 * partially tracks for the same reason. Lenis is the scroll authority
 * on this site, so anything that needs scroll position subscribes to it
 * rather than to the DOM.
 */
type ProgressListener = (progress: number) => void;

const progressListeners = new Set<ProgressListener>();

/* Raw scroll offset, for consumers that need actual pixels (a hide-on-
   scroll nav comparing against a section's boundary) rather than the
   0-1 progress above. Broadcast from the same rAF tick for the same
   reason `progress` is: Lenis suppresses the native `scroll` event, so
   a listener-based reader would miss anchor jumps and programmatic
   `scrollTo`s. */
type ScrollYListener = (scrollY: number) => void;

const scrollYListeners = new Set<ScrollYListener>();
let lastScrollYBroadcast = -1;

/* Lenis's own `progress` is not used: Lenis caches the scrollable limit
   when it initialises, which here is before web fonts swap and before
   the portrait reserves its box, so that denominator ends up several
   times the real one and under-reports for the rest of the session.
   Both terms are re-read here instead. Caching the limit was tried and
   removed — the page's height changes with no event that reliably
   reports it (a ResizeObserver on documentElement never fires, since
   its box stays viewport-sized however tall the content grows), so a
   cached denominator silently goes stale. This is one layout read per
   frame on a loop that is already running. */
function currentProgress() {
  const limit =
    document.documentElement.scrollHeight - window.innerHeight;
  if (limit <= 0) return 0;
  return Math.min(1, Math.max(0, window.scrollY / limit));
}

let lastBroadcast = -1;

function broadcast() {
  const value = currentProgress();
  /* Only on a visible change. This runs once a frame, and most frames
     of a settled page have nothing to say. */
  if (Math.abs(value - lastBroadcast) >= 0.0005) {
    lastBroadcast = value;
    for (const listener of progressListeners) listener(value);
  }

  const y = window.scrollY;
  if (y !== lastScrollYBroadcast) {
    lastScrollYBroadcast = y;
    for (const listener of scrollYListeners) listener(y);
  }
}

/**
 * Called once per frame from SmoothScroll's existing rAF loop.
 *
 * Polling rather than listening is deliberate. Lenis emits its `scroll`
 * event only for scrolls it drives itself, and it suppresses the native
 * `scroll` event entirely — so a programmatic `scrollTo`, an anchor
 * jump, or a keyboard scroll would leave a listener-based bar frozen
 * wherever it last stopped. Reading the offset on the frame loop that
 * is already running costs no extra loop and cannot miss a scroll.
 */
export function tickScrollProgress() {
  broadcast();
}

export function setLenis(next: Lenis | null) {
  instance = next;

  if (!next) {
    lockCount = 0;
    lastBroadcast = -1;
    lastScrollYBroadcast = -1;
    return;
  }

  broadcast();
}

/** Returns an unsubscribe function. */
export function subscribeScrollProgress(listener: ProgressListener) {
  progressListeners.add(listener);
  listener(currentProgress());
  return () => {
    progressListeners.delete(listener);
  };
}

/** Returns an unsubscribe function. */
export function subscribeScrollY(listener: ScrollYListener) {
  scrollYListeners.add(listener);
  listener(window.scrollY);
  return () => {
    scrollYListeners.delete(listener);
  };
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
