"use client";

import { Fragment, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { WorkEntry as WorkEntryType } from "./work-data";

const ACCENT_HEX: Record<"blue" | "orange" | "purple", string> = {
  blue: "#3D5AFE",
  orange: "#FF6B35",
  purple: "#8B5CF6",
};

function renderBoldText(text: string, bold?: string[]) {
  if (!bold || bold.length === 0) return text;
  const escaped = bold.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const pattern = new RegExp(`(${escaped.join("|")})`, "g");
  const parts = text.split(pattern);
  return parts.map((part, i) =>
    bold.includes(part) ? <b key={i} className="font-semibold text-text">{part}</b> : <Fragment key={i}>{part}</Fragment>
  );
}

interface WorkEntryProps {
  entry: WorkEntryType;
}

export default function WorkEntry({ entry }: WorkEntryProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const accentColor = ACCENT_HEX[entry.accent];

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const node = cardRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const mx = ((event.clientX - rect.left) / rect.width) * 100;
    const my = ((event.clientY - rect.top) / rect.height) * 100;
    node.style.setProperty("--mx", `${mx}%`);
    node.style.setProperty("--my", `${my}%`);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="work-card group overflow-hidden rounded-[30px] border border-white/60 bg-white/[0.42] p-6 shadow-[0_25px_60px_-25px_rgba(20,20,26,0.25),inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-[34px] backdrop-saturate-[165%] [-webkit-backdrop-filter:blur(34px)_saturate(165%)] min-[900px]:p-9"
      style={{ "--accent": accentColor } as React.CSSProperties}
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="relative z-10 grid gap-8 min-[900px]:grid-cols-[300px_1fr] min-[900px]:gap-12">
        {/* Meta column */}
        <div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm" style={{ color: accentColor }}>
              {entry.index}
            </span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <h3 className="font-display mt-4 text-2xl font-bold leading-tight">{entry.role}</h3>
          <p className="mt-2 text-sm text-muted">
            {entry.company} · {entry.location}
          </p>
          <p className="font-mono mt-1 text-xs text-muted">{entry.dates}</p>

          {entry.current && (
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-[11px] uppercase tracking-wide text-muted">
              <span className="relative flex h-1.5 w-1.5">
                <span
                  className="work-ping absolute inline-flex h-full w-full rounded-full"
                  style={{ backgroundColor: accentColor }}
                />
                <span
                  className="relative inline-flex h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: accentColor }}
                />
              </span>
              Current
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-2">
            {entry.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border px-3 py-1 text-xs text-muted transition-colors duration-300 group-hover:border-[var(--accent)]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Body column */}
        <div>
          <ul className="space-y-3">
            {entry.bullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-3 leading-relaxed text-muted">
                <span className="mt-[0.65em] h-[2px] w-3 shrink-0 bg-current opacity-40" />
                <span>{renderBoldText(bullet.text, bullet.bold)}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 grid grid-cols-1 divide-y divide-border border-t border-border pt-6 min-[900px]:grid-cols-3 min-[900px]:divide-x min-[900px]:divide-y-0">
            {entry.metrics.map((metric, i) => (
              <div
                key={i}
                className="px-4 py-3 text-center first:pt-0 min-[900px]:py-0 min-[900px]:first:pl-0"
              >
                <div className="font-display text-2xl font-bold min-[900px]:text-3xl" style={{ color: accentColor }}>
                  {metric.value}
                </div>
                <div className="mt-1 text-[11px] uppercase tracking-wide text-muted">{metric.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            {entry.photos.map((photo, i) => {
              const isLeft = i === 0;
              return (
                <div key={photo.src} className="group/photo relative aspect-[4/3]">
                  <div
                    className={`work-photo absolute inset-0 overflow-hidden rounded-2xl ${isLeft ? "work-photo-left" : "work-photo-right"}`}
                    style={{ transformOrigin: isLeft ? "bottom left" : "bottom right" }}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 900px) 45vw, 220px"
                      className="object-cover"
                    />
                    <div aria-hidden="true" className="work-scanline pointer-events-none absolute inset-0" />
                  </div>
                  <div className="pointer-events-none absolute inset-x-2 bottom-2 z-20 rounded-full bg-white/50 px-3 py-1 text-center text-[11px] text-text opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover/photo:opacity-100">
                    {photo.caption}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
