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
 * Weighting is deliberately warm. Tangerine and blue at equal strength
 * blend through hard-light into lavender, which is both off-palette
 * and the single most generic background on the web, so blue appears
 * once, as the cursor-tracked blob.
 *
 * Pointer position is written straight to the node's transform inside
 * a rAF loop. No React state, so nothing re-renders per frame.
 */

const GOO_FILTER_ID = "atmosphere-goo";

const GRAIN_SVG =
  "<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'>" +
  "<filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter>" +
  "<rect width='100%' height='100%' filter='url(%23n)'/></svg>";

const GRAIN_DATA_URI = `url("data:image/svg+xml,${encodeURIComponent(GRAIN_SVG)}")`;

const LERP_FACTOR = 20;

export default function Atmosphere() {
  const interactiveRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const node = interactiveRef.current;
    if (!node) return;

    target.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    current.current = { ...target.current };

    const handlePointerMove = (event: PointerEvent) => {
      target.current.x = event.clientX;
      target.current.y = event.clientY;
    };

    const tick = () => {
      current.current.x += (target.current.x - current.current.x) / LERP_FACTOR;
      current.current.y += (target.current.y - current.current.y) / LERP_FACTOR;
      node.style.transform = `translate3d(${
        current.current.x - node.offsetWidth / 2
      }px, ${current.current.y - node.offsetHeight / 2}px, 0)`;
      frameRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    frameRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ background: "linear-gradient(40deg, #FFF3EA, #FAFAF7 62%, #F4F2EC)" }}
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
        className="absolute inset-0"
        style={{ filter: `url(#${GOO_FILTER_ID}) blur(40px)` }}
      >
        <div
          className="gradient-blob"
          style={
            {
              "--blob-color": "var(--color-accent)",
              width: "80%",
              height: "80%",
              top: "10%",
              left: "10%",
              transformOrigin: "center center",
              animation: "moveVertical 14s ease infinite",
            } as React.CSSProperties
          }
        />
        <div
          className="gradient-blob"
          style={
            {
              "--blob-color": "#FFA05A",
              width: "80%",
              height: "80%",
              top: "calc(50% - 40%)",
              left: "calc(50% - 40%)",
              transformOrigin: "calc(50% - 400px)",
              animation: "moveInCircle 20s reverse infinite",
            } as React.CSSProperties
          }
        />
        <div
          className="gradient-blob"
          style={
            {
              "--blob-color": "var(--color-accent)",
              width: "80%",
              height: "80%",
              top: "calc(50% - 40%)",
              left: "calc(50% - 40% + 200px)",
              opacity: 0.75,
              transformOrigin: "calc(50% + 400px)",
              animation: "moveInCircle 18s linear infinite",
            } as React.CSSProperties
          }
        />
        <div
          className="gradient-blob"
          style={
            {
              "--blob-color": "#FFC38A",
              width: "80%",
              height: "80%",
              top: "calc(50% - 20%)",
              left: "calc(50% - 40%)",
              opacity: 0.7,
              transformOrigin: "calc(50% - 200px)",
              animation: "moveHorizontal 18s ease infinite",
            } as React.CSSProperties
          }
        />
        <div
          className="gradient-blob"
          style={
            {
              "--blob-color": "#FF8A4C",
              width: "60%",
              height: "60%",
              top: "calc(50% - 30%)",
              left: "calc(50% - 30%)",
              transformOrigin: "calc(50% - 800px) calc(50% + 200px)",
              animation: "moveInCircle 10s ease infinite",
            } as React.CSSProperties
          }
        />

        {/* The one blue blob, tied to the cursor so the secondary accent
            appears as a response to the visitor rather than as wash. */}
        <div
          ref={interactiveRef}
          className="gradient-blob"
          style={
            {
              "--blob-color": "var(--color-accent-2)",
              width: "36%",
              height: "36%",
              top: 0,
              left: 0,
              opacity: 0.55,
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
