"use client";

import { useEffect, useId, useState } from "react";

interface LiquidMetalTextProps {
  text: string;
  className?: string;
}

/* Ink wordmark with an accent sheen sweeping through it. The chrome
   version read as a different brand from the rest of the page; this
   keeps the same liquid displacement on the site's own two accents. */
const METAL_GRADIENT =
  "linear-gradient(120deg, #141414 0%, #141414 32%, #FF6B35 44%, #3D5AFE 54%, #141414 66%, #141414 100%)";

export default function LiquidMetalText({ text, className = "" }: LiquidMetalTextProps) {
  const rawId = useId();
  const filterId = `liquid-metal-${rawId.replace(/:/g, "")}`;

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => setPrefersReducedMotion(event.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <span className={`relative inline-block ${className}`}>
      <svg aria-hidden="true" focusable="false" className="absolute h-0 w-0">
        <defs>
          <filter
            id={filterId}
            x="-10%"
            y="-20%"
            width="120%"
            height="140%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.010 0.015"
              numOctaves={2}
              seed={4}
              result="turbulence"
            >
              {!prefersReducedMotion && (
                <animate
                  attributeName="baseFrequency"
                  dur="10s"
                  calcMode="linear"
                  values="0.010 0.015;0.014 0.009;0.010 0.015"
                  repeatCount="indefinite"
                />
              )}
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="turbulence"
              scale={3}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
      <span
        className={`bg-clip-text text-transparent ${
          prefersReducedMotion ? "" : "animate-metal-sheen"
        }`}
        style={{
          backgroundImage: METAL_GRADIENT,
          backgroundSize: "250% 100%",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          filter: prefersReducedMotion ? undefined : `url(#${filterId})`,
        }}
      >
        {text}
      </span>
    </span>
  );
}
