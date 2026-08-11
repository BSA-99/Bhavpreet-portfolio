"use client";

import { Fragment, useRef } from "react";
import { useScroll, useSpring } from "framer-motion";
import WorkAmbient from "./WorkAmbient";
import WorkTimeline, { TimelineDot } from "./WorkTimeline";
import WorkEntry from "./WorkEntry";
import { workEntries } from "./work-data";

const LEDGER = [
  { label: "Employer", value: "Sobeys Inc." },
  { label: "Location", value: "Stellarton, NS" },
  { label: "Terms", value: "3" },
  { label: "Span", value: "May 2025 — Present" },
];

export default function WorkSection() {
  const wrapRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start 0.8", "end 0.3"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });

  return (
    <section
      id="work"
      className="relative scroll-mt-24 overflow-hidden border-t border-border px-6 py-24 md:px-16 md:py-32"
    >
      <WorkAmbient />

      <div className="relative z-10 mx-auto max-w-[1200px]">
        {/* Header */}
        <div className="mb-16 min-[900px]:mb-24">
          <div className="mb-6 flex items-center gap-3">
            <span
              className="font-mono text-sm font-medium"
              style={{
                backgroundImage: "linear-gradient(90deg, #3D5AFE, #FF6B35)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              01 /
            </span>
            <span className="font-mono text-sm uppercase tracking-wide text-muted">Work</span>
            <span className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
          </div>

          <h2 className="font-display max-w-3xl text-[34px] font-extrabold leading-[1.1] tracking-tight min-[900px]:text-[60px]">
            Three terms building the guardrails that{" "}
            <span
              style={{
                backgroundImage: "linear-gradient(90deg, #3D5AFE, #8B5CF6 50%, #FF6B35)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              keep a cloud estate honest
            </span>
            .
          </h2>

          <p className="mt-6 max-w-xl text-base text-muted min-[900px]:text-lg">
            Governance tooling, access reviews, and automation across three terms on Sobeys&apos;
            Cloud Centre of Excellence team — the unglamorous work that keeps production boring.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-6 border-t border-border pt-6 min-[900px]:grid-cols-4">
            {LEDGER.map((row) => (
              <div key={row.label}>
                <div className="font-mono text-[11px] uppercase tracking-wide text-muted">{row.label}</div>
                <div className="mt-1 text-sm font-medium">{row.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline + entries */}
        <div
          ref={wrapRef}
          className="relative grid grid-cols-[28px_1fr] gap-x-6 gap-y-16 min-[900px]:grid-cols-[40px_1fr] min-[900px]:gap-x-10"
        >
          <WorkTimeline progress={smoothProgress} />

          {workEntries.map((entry, i) => (
            <Fragment key={entry.id}>
              <TimelineDot
                progress={smoothProgress}
                threshold={workEntries.length === 1 ? 1 : i / (workEntries.length - 1)}
                accent={entry.accent}
              />
              <WorkEntry entry={entry} />
            </Fragment>
          ))}
        </div>

        {/* Closing line */}
        <div className="mt-16 grid grid-cols-[28px_1fr] gap-x-6 min-[900px]:grid-cols-[40px_1fr] min-[900px]:gap-x-10">
          <span />
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-border" />
            <span className="font-mono text-sm text-muted">02 / Projects</span>
          </div>
        </div>
      </div>
    </section>
  );
}
