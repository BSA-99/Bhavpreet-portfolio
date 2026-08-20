import type { Transition } from "framer-motion";

/**
 * The site's motion vocabulary.
 *
 * Apple describes springs with two designer-facing parameters rather
 * than the mass/stiffness/damping triplet: damping ratio (overshoot)
 * and response (how quickly the value reaches the target, in seconds).
 * Framer Motion's `bounce` + `duration` spring API maps onto those
 * directly, so these are written in Apple's terms.
 *
 * House rule: critically damped by default. Overshoot is reserved for
 * motion the user physically initiated — a flick, a drag release, a
 * disclosure they pulled open. Bounce on something that merely faded
 * into view reads as decoration.
 */

/** Damping 1.0, response 0.4. The default for anything entering. */
export const ENTER: Transition = {
  type: "spring",
  bounce: 0,
  duration: 0.4,
};

/** Damping 1.0, response 0.3. For small, frequent, snappy changes. */
export const SNAP: Transition = {
  type: "spring",
  bounce: 0,
  duration: 0.3,
};

/**
 * Damping ~0.8, response 0.4. Only for momentum-carrying interactions
 * — a panel the user opened, not a section that scrolled into view.
 */
export const PHYSICAL: Transition = {
  type: "spring",
  bounce: 0.2,
  duration: 0.4,
};

/**
 * Scroll reveals stagger by index, but the delay is capped so a long
 * grid never leaves the last cell visibly lagging behind the scroll.
 */
export function revealDelay(index: number, step = 0.06, max = 0.18) {
  return Math.min(index * step, max);
}
