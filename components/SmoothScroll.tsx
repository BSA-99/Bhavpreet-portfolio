"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { setLenis, tickScrollProgress } from "@/lib/lenis";

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      anchors: true,
    });
    setLenis(lenis);

    /* The id has to live outside raf(), because raf() reassigns it on
       every frame. Closing over a single `const` from the first call
       would leave cleanup cancelling frame #1 while the loop kept
       running against a destroyed instance. */
    let rafId = 0;

    function raf(time: number) {
      lenis.raf(time);
      /* Publishes scroll progress to subscribers. Piggybacks on this
         loop rather than opening a second one — see lib/lenis.ts. */
      tickScrollProgress();
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      setLenis(null);
      lenis.destroy();
    };
  }, []);

  return null;
}
