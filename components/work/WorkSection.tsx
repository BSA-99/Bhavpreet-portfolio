"use client";

import { Fragment, useState } from "react";
import { ChevronDown } from "lucide-react";
import { workEntries } from "./work-data";

const EMPLOYER_META = [
  { label: "EMPLOYER", value: "Sobeys Inc." },
  { label: "LOCATION", value: "Stellarton, NS" },
  { label: "TERMS", value: "3" },
  { label: "SPAN", value: "May 2025 to Present" },
];

const ACCENT_VAR: Record<string, string> = {
  blue: "var(--color-accent-2)",
  orange: "var(--color-accent)",
};

const ACCENT_INK: Record<string, string> = {
  blue: "var(--color-accent-2-ink)",
  orange: "var(--color-accent-ink)",
};

function renderBoldText(text: string, bold?: string[]) {
  if (!bold || bold.length === 0) return text;
  const escaped = bold.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const pattern = new RegExp(`(${escaped.join("|")})`, "g");
  const parts = text.split(pattern);
  return parts.map((part, i) =>
    bold.includes(part) ? (
      <b key={i} className="font-semibold text-text">
        {part}
      </b>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    )
  );
}

export default function WorkSection() {
  /* Every term is expanded on arrival. The detail is the point of this
     section, so hiding it behind a click costs more than it saves.
     Rows stay collapsible for anyone who wants to skim. */
  const [openIds, setOpenIds] = useState<Set<string>>(
    () => new Set(workEntries.map((entry) => entry.id))
  );

  const toggle = (id: string) =>
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });

  return (
    <section
      id="work"
      className="relative scroll-mt-24 px-6 py-28 sm:px-10 lg:px-14 lg:py-44"
    >
      <div className="mx-auto max-w-[1200px]">
        <header className="mb-16 max-w-[62ch] lg:mb-20">
          <h2 className="mb-5 max-w-[24ch] font-display text-[26px] font-bold leading-[1.12] tracking-[-0.025em] sm:text-[34px] lg:text-[44px]">
            Three terms building the guardrails that keep a cloud estate
            honest.
          </h2>
          <p className="font-body text-[15px] leading-[1.7] text-muted sm:text-base">
            Governance tooling, access reviews, and automation across three
            terms on Sobeys&apos; Cloud Centre of Excellence team. The
            unglamorous work that keeps production boring.
          </p>
        </header>

        <div className="glass glass-quiet mb-10 grid grid-cols-2 overflow-hidden sm:grid-cols-4">
          {EMPLOYER_META.map((row, i) => (
            <div
              key={row.label}
              className={`relative z-[2] px-6 py-7 sm:px-8 ${
                i < EMPLOYER_META.length - 1
                  ? "border-b border-border sm:border-b-0 sm:border-r"
                  : ""
              } ${i === 1 ? "border-b sm:border-b-0" : ""}`}
            >
              <div className="mb-2 font-mono text-[10px] font-medium tracking-[0.16em] text-muted">
                {row.label}
              </div>
              <div className="font-display text-[15px] font-bold sm:text-base">
                {row.value}
              </div>
            </div>
          ))}
        </div>

        <div className="glass overflow-hidden">
          {workEntries.map((entry, entryIndex) => {
            const open = openIds.has(entry.id);
            const accent = ACCENT_VAR[entry.accent];
            const accentInk = ACCENT_INK[entry.accent];

            return (
              <div
                key={entry.id}
                className={`relative z-[2] ${
                  entryIndex < workEntries.length - 1
                    ? "border-b border-border"
                    : ""
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(entry.id)}
                  aria-expanded={open}
                  aria-controls={`work-panel-${entry.id}`}
                  className="grid w-full cursor-pointer grid-cols-[auto_1fr_auto] items-center gap-4 px-6 py-7 text-left transition-colors duration-300 hover:bg-white/25 sm:gap-6 sm:px-9 sm:py-9"
                >
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-inner font-mono text-[12px] font-medium transition-all duration-300 sm:h-12 sm:w-12 sm:text-[13px]"
                    style={
                      open
                        ? { background: accent, color: "#FAFAF7" }
                        : {
                            background: `color-mix(in srgb, ${accent} 12%, transparent)`,
                            color: accentInk,
                            boxShadow: `inset 0 0 0 1px color-mix(in srgb, ${accent} 26%, transparent)`,
                          }
                    }
                  >
                    {entry.index}
                  </span>

                  <span className="min-w-0">
                    <span className="block font-display text-[16px] font-bold leading-snug sm:text-xl lg:text-[22px]">
                      {entry.role}
                    </span>
                    <span className="mt-1 block font-body text-xs text-muted sm:text-[13px]">
                      {entry.company}, {entry.location}
                    </span>
                  </span>

                  <span className="flex shrink-0 items-center gap-3 sm:gap-5">
                    {entry.current && (
                      <span className="chip hidden sm:inline-flex">
                        Current
                      </span>
                    )}
                    <span className="hidden font-mono text-[12px] tabular-nums text-muted md:inline">
                      {entry.dates}
                    </span>
                    <span
                      className={`flex text-muted transition-transform duration-300 ${
                        open ? "rotate-180" : ""
                      }`}
                    >
                      <ChevronDown size={17} strokeWidth={2} />
                    </span>
                  </span>
                </button>

                {open && (
                  <div
                    id={`work-panel-${entry.id}`}
                    className="grid animate-[riseIn_320ms_cubic-bezier(0.16,1,0.3,1)_both] grid-cols-1 gap-10 px-6 pb-10 sm:grid-cols-[1.3fr_0.7fr] sm:gap-14 sm:px-9 sm:pb-12 sm:pl-[112px]"
                  >
                    <div>
                      <div className="mb-5 flex flex-wrap gap-2">
                        {entry.stack.map((tech) => (
                          <span
                            key={tech}
                            className={
                              entry.accent === "blue" ? "chip chip-blue" : "chip"
                            }
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <ul className="flex flex-col gap-4">
                        {entry.bullets.map((bullet, i) => (
                          <li
                            key={i}
                            className="grid grid-cols-[10px_1fr] gap-4 font-body text-[15px] leading-[1.65] text-muted"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-[9px] block h-[6px] w-[6px] rounded-full"
                              style={{ background: accent }}
                            />
                            <span>{renderBoldText(bullet.text, bullet.bold)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="glass glass-quiet grid grid-cols-3 self-start overflow-hidden sm:grid-cols-1">
                      {entry.metrics.map((metric, i) => (
                        <div
                          key={i}
                          className={`relative z-[2] px-4 py-4 ${
                            i < entry.metrics.length - 1
                              ? "border-r border-border sm:border-r-0 sm:border-b"
                              : ""
                          }`}
                        >
                          <div
                            className="font-mono text-[22px] font-medium tracking-[-0.02em] sm:text-[26px]"
                            style={{ color: accentInk }}
                          >
                            {metric.value}
                          </div>
                          <div className="mt-1 font-body text-[11px] leading-tight text-muted">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
