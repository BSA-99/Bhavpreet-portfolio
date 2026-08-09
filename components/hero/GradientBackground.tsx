"use client";

import { useEffect, useRef } from "react";

const GOO_FILTER_ID = "hero-goo-filter";

const GRAIN_SVG =
  "<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'>" +
  "<filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter>" +
  "<rect width='100%' height='100%' filter='url(%23n)'/></svg>";

const GRAIN_DATA_URI = `url("data:image/svg+xml,${encodeURIComponent(GRAIN_SVG)}")`;

const LERP_FACTOR = 20;

export default function GradientBackground() {
  const interactiveRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const node = interactiveRef.current;
    if (!node) return;

    target.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    current.current = { ...target.current };

    const handleMouseMove = (event: MouseEvent) => {
      target.current.x = event.clientX;
      target.current.y = event.clientY;
    };

    const tick = () => {
      current.current.x += (target.current.x - current.current.x) / LERP_FACTOR;
      current.current.y += (target.current.y - current.current.y) / LERP_FACTOR;
      node.style.transform = `translate(${current.current.x - node.offsetWidth / 2}px, ${
        current.current.y - node.offsetHeight / 2
      }px)`;
      frameRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", handleMouseMove);
    frameRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      style={{ background: "linear-gradient(40deg, #FFF3EA, #FAFAF7)" }}
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

      <div className="absolute inset-0" style={{ filter: `url(#${GOO_FILTER_ID}) blur(40px)` }}>
        <div
          className="gradient-blob"
          style={
            {
              "--blob-color": "var(--color-tangerine)",
              width: "80%",
              height: "80%",
              top: "10%",
              left: "10%",
              transformOrigin: "center center",
              animation: "moveVertical 12s ease infinite",
            } as React.CSSProperties
          }
        />
        <div
          className="gradient-blob"
          style={
            {
              "--blob-color": "var(--color-blue)",
              width: "80%",
              height: "80%",
              top: "calc(50% - 40%)",
              left: "calc(50% - 40%)",
              transformOrigin: "calc(50% - 400px)",
              animation: "moveInCircle 8s reverse infinite",
            } as React.CSSProperties
          }
        />
        <div
          className="gradient-blob"
          style={
            {
              "--blob-color": "var(--color-tangerine)",
              width: "80%",
              height: "80%",
              top: "calc(50% - 40%)",
              left: "calc(50% - 40% + 200px)",
              transformOrigin: "calc(50% + 400px)",
              animation: "moveInCircle 16s linear infinite",
            } as React.CSSProperties
          }
        />
        <div
          className="gradient-blob"
          style={
            {
              "--blob-color": "var(--color-blue)",
              width: "80%",
              height: "80%",
              top: "calc(50% - 20%)",
              left: "calc(50% - 40%)",
              opacity: 0.7,
              transformOrigin: "calc(50% - 200px)",
              animation: "moveHorizontal 16s ease infinite",
            } as React.CSSProperties
          }
        />
        <div
          className="gradient-blob"
          style={
            {
              "--blob-color": "#FFA05A",
              width: "60%",
              height: "60%",
              top: "calc(50% - 30%)",
              left: "calc(50% - 30%)",
              transformOrigin: "calc(50% - 800px) calc(50% + 200px)",
              animation: "moveInCircle 8s ease infinite",
            } as React.CSSProperties
          }
        />
        <div
          ref={interactiveRef}
          className="gradient-blob"
          style={
            {
              "--blob-color": "var(--color-blue)",
              width: "40%",
              height: "40%",
              top: 0,
              left: 0,
              opacity: 0.6,
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
