"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useFrameSequence } from "./useFrameSequence";

// Fill these in once your frames are renumbered and placed in /public/animations/
const WAVE_FRAMES = Array.from(
  { length: 24 }, // confirmed: 24 frames, verified clean (no drift, no pop)
  (_, i) => `/animations/wave/f_${String(i + 1).padStart(2, "0")}.jpg`
);

// f_01 is the wave->typing bridge frame (hand still mid-lower). It plays
// ONCE on the way into the typing state, then hands off to the loop below.
// This avoids the visible pop you'd get looping f_01 back-to-back with f_20,
// since f_01's hand position doesn't match the settled typing pose.
const TYPING_ENTRY_FRAMES = ["/animations/typing/f_01.jpg"];

// f_02 through f_20 — the settled typing pose. These loop continuously;
// the small frame-to-frame jitter reads as a subtle "still working" flicker.
const TYPING_LOOP_FRAMES = Array.from(
  { length: 19 }, // <- update to your actual culled count minus the entry frame
  (_, i) => `/animations/typing/f_${String(i + 2).padStart(2, "0")}.jpg`
);

type Mode = "idle" | "wave" | "typingEntry" | "typingLoop";

export default function AnimatedIllustration() {
  const [mode, setMode] = useState<Mode>("wave");
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const lastScrollY = useRef(0);
  const hasWavedOnLoad = useRef(false);

  // Respect prefers-reduced-motion — degrade to a static frame.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = () => setPrefersReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Play the wave twice on load, then rest. Direction toggles after that.
  useEffect(() => {
    if (prefersReducedMotion) return;
    hasWavedOnLoad.current = true;
    setMode("wave");
  }, [prefersReducedMotion]);

  // Scroll direction as a state toggle — never hijacks scroll itself.
  useEffect(() => {
    if (prefersReducedMotion) return;
    lastScrollY.current = window.scrollY;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const goingDown = y > lastScrollY.current + 4;
        const goingUp = y < lastScrollY.current - 4;

        if (goingDown && mode !== "typingEntry" && mode !== "typingLoop") {
          setMode("typingEntry");
        }
        if (goingUp && mode !== "wave" && y < 100) setMode("wave");

        lastScrollY.current = y;
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mode, prefersReducedMotion]);

  const waveSeq = useFrameSequence({
    frames: WAVE_FRAMES,
    playCount: 2, // waves twice, then holds on the last frame
    playing: mode === "wave" && !prefersReducedMotion,
  });

  // Plays f_01 exactly once, then hands off to the loop below.
  const typingEntrySeq = useFrameSequence({
    frames: TYPING_ENTRY_FRAMES,
    playCount: 1,
    playing: mode === "typingEntry" && !prefersReducedMotion,
    onComplete: () => setMode("typingLoop"),
  });

  // f_02...f_20, looping continuously while typingLoop is active.
  const typingLoopSeq = useFrameSequence({
    frames: TYPING_LOOP_FRAMES,
    playCount: Infinity,
    playing: mode === "typingLoop" && !prefersReducedMotion,
  });

  // Reduced-motion / pre-hydration fallback: a real <img>-equivalent,
  // present in markup immediately, not dependent on JS running.
  if (prefersReducedMotion) {
    return (
      <Image
        src={WAVE_FRAMES[WAVE_FRAMES.length - 1]}
        alt="Illustrated portrait, waving"
        width={400}
        height={300}
        priority
        style={{ mixBlendMode: "multiply", filter: "contrast(1.22)" }}
      />
    );
  }

  const src =
    mode === "typingEntry"
      ? typingEntrySeq.currentSrc
      : mode === "typingLoop"
      ? typingLoopSeq.currentSrc
      : waveSeq.currentSrc;

  return (
    <Image
      src={src}
      alt="Illustrated portrait"
      width={400}
      height={300}
      priority
      unoptimized // frame-swapping raw JPEGs; skip Next's image optimizer per-frame
      style={{
        // Multiply blend: black linework stays crisp regardless of what's
        // behind it, white fill areas take on the backdrop's own color
        // instead of showing as an opaque white box. Works directly on the
        // plain white-background JPGs — no transparency processing needed.
        mixBlendMode: "multiply",
        filter: "contrast(1.22)", // punches the linework back up post-blend
      }}
    />
  );
}
