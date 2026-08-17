"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface UseFrameSequenceOptions {
  /** Ordered list of frame URLs, e.g. ["/animations/wave/f_01.jpg", ...] */
  frames: string[];
  /** Milliseconds between frames. 55ms ≈ 18fps, matches the "choppy on purpose" look. */
  frameDurationMs?: number;
  /** How many times to play through the sequence before stopping on the last frame. */
  playCount?: number;
  /** Whether the sequence should currently be playing. */
  playing: boolean;
  /** Called once the sequence finishes its playCount plays. */
  onComplete?: () => void;
}

/**
 * Steps through a preloaded array of frame images using requestAnimationFrame
 * with a time accumulator (NOT setInterval — setInterval drifts and gets
 * throttled hard on background tabs).
 */
export function useFrameSequence({
  frames,
  frameDurationMs = 55,
  playCount = 1,
  playing,
  onComplete,
}: UseFrameSequenceOptions) {
  const [frameIndex, setFrameIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const rafRef = useRef<number | null>(null);
  const accumulatorRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);
  const playsCompletedRef = useRef(0);
  const preloadedRef = useRef<HTMLImageElement[]>([]);

  // Preload every frame up front so there's no decode hitch mid-animation.
  useEffect(() => {
    let cancelled = false;
    setLoaded(false);
    playsCompletedRef.current = 0;

    const imgs = frames.map((src) => {
      const img = new Image();
      img.src = src;
      return img;
    });
    preloadedRef.current = imgs;

    Promise.all(
      imgs.map(
        (img) =>
          new Promise<void>((resolve) => {
            if (img.complete) return resolve();
            img.onload = () => resolve();
            img.onerror = () => resolve();
          })
      )
    ).then(() => {
      if (!cancelled) setLoaded(true);
    });

    return () => {
      cancelled = true;
    };
  }, [frames]);

  const tick = useCallback(
    (time: number) => {
      if (lastTimeRef.current === null) lastTimeRef.current = time;
      const delta = time - lastTimeRef.current;
      lastTimeRef.current = time;
      accumulatorRef.current += delta;

      let steps = Math.floor(accumulatorRef.current / frameDurationMs);
      accumulatorRef.current -= steps * frameDurationMs;

      if (steps > 0) {
        setFrameIndex((prev) => {
          let next = prev;
          for (let i = 0; i < steps; i++) {
            if (next + 1 >= frames.length) {
              playsCompletedRef.current += 1;
              if (playsCompletedRef.current >= playCount) {
                // Stop on the last frame, don't loop past playCount.
                onComplete?.();
                return frames.length - 1;
              }
              next = 0;
            } else {
              next += 1;
            }
          }
          return next;
        });
      }

      rafRef.current = requestAnimationFrame(tick);
    },
    [frameDurationMs, frames.length, playCount, onComplete]
  );

  useEffect(() => {
    if (!playing || !loaded) return;

    lastTimeRef.current = null;
    accumulatorRef.current = 0;
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [playing, loaded, tick]);

  return {
    currentSrc: frames[frameIndex] ?? frames[0],
    frameIndex,
    loaded,
  };
}
