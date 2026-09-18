"use client";

import { useEffect, useRef } from "react";

/**
 * The page's gradient field.
 *
 * This is the hero's original goo-blended blob background, promoted to
 * cover the whole site. It is fixed, so it costs one composited layer
 * no matter how long the page gets, and every frosted pane on the site
 * refracts it. Without colour down here the glass has nothing to
 * scatter and reads as a plain white box.
 *
 * Weighting is cool-neutral: slate and steel do the ambient work, and
 * tangerine appears once, small, as a brand note rather than as the
 * page temperature. Tangerine and blue at equal strength blend through
 * hard-light into lavender, which is both off-palette and the single
 * most generic background on the web, so they are kept apart in space.
 *
 * The field is decoration and does not respond to the pointer. It used
 * to: a blue blob chased the cursor, which — alongside the magnetic
 * buttons, the card spotlight and the contact cross-hatch — made four
 * separate things answer the same mouse. The page now answers it in
 * one place, on the element the pointer is actually over.
 */

const GOO_FILTER_ID = "atmosphere-goo";

const GRAIN_SVG =
  "<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'>" +
  "<filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter>" +
  "<rect width='100%' height='100%' filter='url(%23n)'/></svg>";

const GRAIN_DATA_URI = `url("data:image/svg+xml,${encodeURIComponent(GRAIN_SVG)}")`;

export default function Atmosphere() {
  const fieldRef = useRef<HTMLDivElement>(null);

  /* A backgrounded tab still runs CSS animations in some engines, and
     each blob transform reruns the goo filter over the whole viewport.
     Nothing is visible to pause against, so pause it. */
  useEffect(() => {
    const field = fieldRef.current;
    if (!field) return;

    const sync = () => {
      field.style.animationPlayState = document.hidden ? "paused" : "running";
      for (const blob of Array.from(field.children)) {
        (blob as HTMLElement).style.animationPlayState = document.hidden
          ? "paused"
          : "running";
      }
    };

    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{
        background: "linear-gradient(40deg, #FFFFFF, #FFFFFF 46%, #EEF2F7)",
      }}
    >
      <svg className="absolute h-0 w-0">
        <defs>
          <filter id={GOO_FILTER_ID}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <div
        ref={fieldRef}
        className="atmosphere-field absolute inset-0"
        style={{ filter: `url(#${GOO_FILTER_ID}) blur(40px)` }}
      >
        {/* Slate. The largest mass, and the one that sets the page's
            cool-neutral temperature. */}
        <div
          className="gradient-blob"
          style={
            {
              "--blob-color": "#A9BDD6",
              width: "80%",
              height: "80%",
              top: "27%",
              left: "10%",
              transformOrigin: "center center",
              animation: "moveVertical 11.2s ease infinite",
            } as React.CSSProperties
          }
        />
        {/* Steel, deeper, to keep the field from flattening into grey. */}
        <div
          className="gradient-blob"
          style={
            {
              "--blob-color": "#8CA6C6",
              width: "80%",
              height: "80%",
              top: "calc(67% - 40%)",
              left: "calc(50% - 40%)",
              transformOrigin: "calc(50% - 400px)",
              animation: "moveInCircle 16s reverse infinite",
            } as React.CSSProperties
          }
        />
        {/* Cool mist, softening the transitions between the two above. */}
        <div
          className="gradient-blob"
          style={
            {
              "--blob-color": "#CFDAE6",
              width: "80%",
              height: "80%",
              top: "calc(67% - 40%)",
              left: "calc(50% - 40% + 200px)",
              opacity: 0.9,
              transformOrigin: "calc(50% + 400px)",
              animation: "moveInCircle 14.4s linear infinite",
            } as React.CSSProperties
          }
        />
        <div
          className="gradient-blob"
          style={
            {
              "--blob-color": "#B8C9DC",
              width: "80%",
              height: "80%",
              top: "calc(67% - 20%)",
              left: "calc(50% - 40%)",
              opacity: 0.8,
              transformOrigin: "calc(50% - 200px)",
              animation: "moveHorizontal 14.4s ease infinite",
            } as React.CSSProperties
          }
        />
        {/* The single tangerine, small and kept to one orbit so the
            brand colour reads as a note rather than a wash. */}
        <div
          className="gradient-blob"
          style={
            {
              "--blob-color": "var(--color-accent)",
              width: "46%",
              height: "46%",
              top: "calc(67% - 23%)",
              left: "calc(50% - 23%)",
              opacity: 0.65,
              transformOrigin: "calc(50% - 800px) calc(50% + 200px)",
              animation: "moveInCircle 11.2s ease infinite",
            } as React.CSSProperties
          }
        />

        {/* The one blue blob. It used to chase the cursor; the page now
            answers the pointer in exactly one place — the spotlight on
            a project card, which is anchored to the thing it belongs
            to. Shifted left and dimmed relative to the rest of the
            field: centred, it sat squarely behind the About section's
            body copy and cut into reading contrast. Left of centre it
            sits nearer the portrait glass instead, which already
            absorbs it. */}
        <div
          className="gradient-blob"
          style={
            {
              "--blob-color": "var(--color-accent-2)",
              width: "36%",
              height: "36%",
              top: "calc(67% - 18%)",
              left: "calc(28% - 18%)",
              opacity: 0.42,
            } as React.CSSProperties
          }
        />
      </div>

      <div
        className="absolute inset-0"
        style={{
          backgroundImage: GRAIN_DATA_URI,
          backgroundSize: "140px 140px",
          backgroundRepeat: "repeat",
          mixBlendMode: "multiply",
          opacity: 0.1,
        }}
      />
    </div>
  );
}
