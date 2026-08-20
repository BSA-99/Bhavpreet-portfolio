"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { setLenis } from "@/lib/lenis";

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
