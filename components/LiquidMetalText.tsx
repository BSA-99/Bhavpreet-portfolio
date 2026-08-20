import { useId } from "react";

interface LiquidMetalTextProps {
  text: string;
  className?: string;
}

/* Ink wordmark with an accent sheen sweeping through it. The chrome
   version read as a different brand from the rest of the page; this
   keeps the same liquid displacement on the site's own two accents. */
const METAL_GRADIENT =
  "linear-gradient(120deg, #101114 0%, #101114 32%, #FF6B35 44%, #3D5AFE 54%, #101114 66%, #101114 100%)";

/**
 * The displacement is static and the sheen is a one-shot on hover.
 *
 * Both used to loop forever: an `<animate>` on the turbulence's
 * baseFrequency plus a 7s background-position keyframe. An SVG filter
 * over text is not a compositor-friendly property, so that combination
 * re-rasterised the wordmark every frame of every session, in fixed
 * chrome that is never off screen.
 *
 * The texture is what reads as "liquid metal", not the movement — so
 * the turbulence stays and only the perpetual motion goes. The sheen
 * now answers a hover, matching how `.btn-primary` already behaves.
 */
export default function LiquidMetalText({ text, className = "" }: LiquidMetalTextProps) {
  const rawId = useId();
  const filterId = `liquid-metal-${rawId.replace(/:/g, "")}`;

  return (
    <span className={`liquid-metal relative inline-block ${className}`}>
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
            />
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
        className="liquid-metal__fill bg-clip-text text-transparent"
        style={{
          backgroundImage: METAL_GRADIENT,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          filter: `url(#${filterId})`,
        }}
      >
        {text}
      </span>
    </span>
  );
}
