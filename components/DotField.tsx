"use client";

import { useEffect, useRef } from "react";

interface DotFieldProps {
  className?: string;
}

/**
 * Interactive cross-hatch field for the contact block.
 *
 * Draws ink-toned crosses over a transparent canvas. The section's own
 * gradient supplies the colour, so this only adds texture and the
 * cursor push, which is the section's one piece of feedback motion.
 *
 * Pointer state lives in refs; the component never re-renders.
 */
export default function DotField({ className }: DotFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
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
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const move = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.tx = e.clientX - r.left;
      mouse.ty = e.clientY - r.top;
      mouse.inside =
        mouse.tx >= 0 && mouse.ty >= 0 && mouse.tx <= r.width && mouse.ty <= r.height;
    };

    let raf: number | null = null;

    const draw = () => {
      mouse.x += (mouse.tx - mouse.x) * 0.12;
      mouse.y += (mouse.ty - mouse.y) * 0.12;

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
        bloom.addColorStop(0, "rgba(255,138,76,0.20)");
        bloom.addColorStop(1, "rgba(255,255,255,0)");
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
          ctx.strokeStyle = `rgba(250,250,247,${0.1 + t * 0.42})`;
          ctx.lineWidth = 1 + t * 0.9;
          ctx.beginPath();
          ctx.moveTo(nx - arm, ny);
          ctx.lineTo(nx + arm, ny);
          ctx.moveTo(nx, ny - arm);
          ctx.lineTo(nx, ny + arm);
          ctx.stroke();
        }
      }

      raf = requestAnimationFrame(draw);
    };

    if (reduced) {
      // Static grid, no loop.
      draw();
      if (raf !== null) cancelAnimationFrame(raf);
      raf = null;
    } else {
      window.addEventListener("pointermove", move, { passive: true });
      draw();
    }

    return () => {
      if (raf !== null) cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", move);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 block h-full w-full ${className ?? ""}`}
    />
  );
}
