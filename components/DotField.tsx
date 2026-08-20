"use client";

import { useEffect, useRef } from "react";

type Tone = "ink" | "light";

interface DotFieldProps {
  className?: string;
  /**
   * Which ground the field is drawn on. `ink` paints white crosses for
   * a dark surface; `light` paints ink crosses, quieter, for a frosted
   * pane on the white page. The canvas is transparent either way — the
   * surface underneath supplies the colour.
   */
  tone?: Tone;
}

/* Stroke and bloom per ground. The light pane needs far less of both:
   the same alphas that read as texture on ink read as dirt on white. */
const TONES: Record<Tone, {
  stroke: string;
  base: number;
  gain: number;
  bloom: [string, string];
}> = {
  ink: {
    stroke: "255,255,255",
    base: 0.1,
    gain: 0.42,
    bloom: ["rgba(140,166,198,0.26)", "rgba(140,166,198,0)"],
  },
  light: {
    stroke: "16,17,20",
    base: 0.07,
    gain: 0.13,
    bloom: ["rgba(61,90,254,0.10)", "rgba(61,90,254,0)"],
  },
};

/**
 * Interactive cross-hatch field for the footer.
 *
 * Draws crosses over a transparent canvas in whichever tone the ground
 * asks for, so this only adds texture and the cursor push, which is the
 * footer's one piece of feedback motion.
 *
 * Pointer state lives in refs; the component never re-renders.
 *
 * The loop is demand-driven, not perpetual. It runs only while the
 * canvas is on screen AND the field is still settling toward the
 * pointer; once the lerp converges it paints one last frame and stops.
 * A cross-hatch that has finished moving is a static image, and
 * re-rasterising a static image every 16ms is work with no output.
 */
export default function DotField({ className, tone = "ink" }: DotFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const paint = TONES[tone];

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999, inside: false };
    const step = 26;
    const reach = 170;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    /* Resizing the backing store clears it, and with a demand-driven
       loop there is no next frame to repaint it — so ask for one. */
    const ro = new ResizeObserver(() => {
      resize();
      repaint();
    });
    ro.observe(canvas);

    const move = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.tx = e.clientX - r.left;
      mouse.ty = e.clientY - r.top;
      mouse.inside =
        mouse.tx >= 0 && mouse.ty >= 0 && mouse.tx <= r.width && mouse.ty <= r.height;
    };

    let raf: number | null = null;
    let onScreen = false;

    /* Below this the cross-hatch is no longer visibly moving, so the
       next frame would be a pixel-identical repaint. */
    const SETTLE_EPSILON = 0.05;

    const draw = () => {
      /* Named apart from the per-cross dx/dy below, which shadow these
         inside the grid loop. */
      const settleX = mouse.tx - mouse.x;
      const settleY = mouse.ty - mouse.y;
      mouse.x += settleX * 0.12;
      mouse.y += settleY * 0.12;

      ctx.clearRect(0, 0, w, h);

      // Soft light bloom that follows the cursor, giving the flat block
      // a sense of depth without lifting text contrast off the ink.
      if (mouse.inside) {
        const bloom = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          8,
          mouse.x,
          mouse.y,
          reach * 1.6
        );
        bloom.addColorStop(0, paint.bloom[0]);
        bloom.addColorStop(1, paint.bloom[1]);
        ctx.fillStyle = bloom;
        ctx.fillRect(0, 0, w, h);
      }

      ctx.lineCap = "butt";
      for (let x = step; x < w; x += step) {
        for (let y = step; y < h; y += step) {
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          const t = mouse.inside ? Math.max(0, 1 - d / reach) : 0;
          const push = t * t * 15;
          const nx = d > 0.01 ? x + (dx / d) * push : x;
          const ny = d > 0.01 ? y + (dy / d) * push : y;
          const arm = 2.4 + t * 4;
          ctx.strokeStyle = `rgba(${paint.stroke},${paint.base + t * paint.gain})`;
          ctx.lineWidth = 1 + t * 0.9;
          ctx.beginPath();
          ctx.moveTo(nx - arm, ny);
          ctx.lineTo(nx + arm, ny);
          ctx.moveTo(nx, ny - arm);
          ctx.lineTo(nx, ny + arm);
          ctx.stroke();
        }
      }

      /* Settled and nothing pulling it — stop until the pointer moves
         again. This frame already shows the resting state. */
      if (
        Math.abs(settleX) < SETTLE_EPSILON &&
        Math.abs(settleY) < SETTLE_EPSILON
      ) {
        raf = null;
        return;
      }

      raf = requestAnimationFrame(draw);
    };

    /* Idempotent: a burst of pointermove events schedules one frame. */
    const wake = () => {
      if (raf === null && onScreen) raf = requestAnimationFrame(draw);
    };

    /* Unconditional single frame, for repaints the gating shouldn't
       suppress (resize). */
    const repaint = () => {
      if (raf === null) raf = requestAnimationFrame(draw);
    };

    const sleep = () => {
      if (raf !== null) cancelAnimationFrame(raf);
      raf = null;
    };

    if (reduced) {
      // Static grid, no loop, no pointer tracking.
      draw();
      return () => {
        sleep();
        ro.disconnect();
      };
    }

    const onMove = (e: PointerEvent) => {
      move(e);
      wake();
    };

    /* The contact block is the last section on the page, so without this
       the loop would run through every other section on the way down. */
    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        if (onScreen) {
          wake();
        } else {
          sleep();
        }
      },
      { rootMargin: "120px" }
    );
    io.observe(canvas);

    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      sleep();
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, [tone]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 block h-full w-full ${className ?? ""}`}
    />
  );
}
