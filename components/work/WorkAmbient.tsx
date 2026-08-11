"use client";

import { useEffect, useRef } from "react";

const GRAIN_SVG =
  "<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'>" +
  "<filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/></filter>" +
  "<rect width='100%' height='100%' filter='url(%23n)' opacity='0.18'/></svg>";

const GRAIN_DATA_URI = `url("data:image/svg+xml,${encodeURIComponent(GRAIN_SVG)}")`;

const BLOBS = [
  { color: "var(--color-blue)", size: 560, top: "-6%", left: "-8%", opacity: 0.16, duration: "28s", anim: "workDriftA" },
  { color: "var(--color-tangerine)", size: 460, top: "4%", left: "72%", opacity: 0.14, duration: "34s", anim: "workDriftB" },
  { color: "var(--color-purple)", size: 520, top: "44%", left: "-10%", opacity: 0.15, duration: "30s", anim: "workDriftB" },
  { color: "var(--color-blue)", size: 400, top: "62%", left: "68%", opacity: 0.12, duration: "26s", anim: "workDriftA" },
];

const MAX_POINTS = 70;
const POINT_HEX = ["#3D5AFE", "#FF6B35", "#8B5CF6"];
const LIFE_DECAY = 0.011;

interface TrailPoint {
  x: number;
  y: number;
  life: number;
  radius: number;
  color: string;
}

export default function WorkAmbient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<TrailPoint[]>([]);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasHover = window.matchMedia("(hover: hover)").matches;
    if (prefersReducedMotion || !hasHover) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;

      const points = pointsRef.current;
      points.push({
        x,
        y,
        life: 1,
        radius: 70 + Math.random() * 70,
        color: POINT_HEX[Math.floor(Math.random() * POINT_HEX.length)],
      });
      if (points.length > MAX_POINTS) points.shift();
    };

    const tick = () => {
      const rect = container.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const points = pointsRef.current;
      for (const point of points) {
        point.life -= LIFE_DECAY;
        if (point.life <= 0) continue;

        const gradient = ctx.createRadialGradient(
          point.x,
          point.y,
          0,
          point.x,
          point.y,
          point.radius
        );
        const alpha = 0.15 * point.life;
        gradient.addColorStop(0, hexToRgba(point.color, alpha));
        gradient.addColorStop(1, hexToRgba(point.color, 0));

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      pointsRef.current = points.filter((point) => point.life > 0);
      frameRef.current = requestAnimationFrame(tick);
    };

    container.addEventListener("mousemove", handleMouseMove);
    frameRef.current = requestAnimationFrame(tick);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      resizeObserver.disconnect();
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      style={{ backgroundColor: "#FAFAF7" }}
    >
      {BLOBS.map((blob, i) => (
        <div
          key={i}
          className="work-blob"
          style={
            {
              "--blob-size": `${blob.size}px`,
              "--blob-opacity": blob.opacity,
              top: blob.top,
              left: blob.left,
              background: `radial-gradient(circle at center, ${blob.color} 0%, transparent 70%)`,
              animation: `${blob.anim} ${blob.duration} ease-in-out infinite`,
            } as React.CSSProperties
          }
        />
      ))}

      <canvas ref={canvasRef} className="absolute inset-0" />

      <div
        className="absolute inset-0"
        style={{
          backgroundImage: GRAIN_DATA_URI,
          backgroundSize: "140px 140px",
          backgroundRepeat: "repeat",
          mixBlendMode: "multiply",
          opacity: 0.5,
        }}
      />
    </div>
  );
}

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
