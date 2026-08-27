"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import DotField from "@/components/DotField";
import ImageSlot from "@/components/ImageSlot";
import { ENTER, revealDelay } from "@/lib/motion";
import { renderBoldText } from "./rich-text";
import type { WorkEntry } from "./work-data";

const ACCENT_VAR: Record<string, string> = {
  blue: "var(--color-accent-2)",
  orange: "var(--color-accent)",
};

const ACCENT_INK: Record<string, string> = {
  blue: "var(--color-accent-2-ink)",
  orange: "var(--color-accent-ink)",
};

interface WorkDetailProps {
  entry: WorkEntry;
  previous?: WorkEntry;
  next?: WorkEntry;
}

/**
 * One co-op term, at full length.
 *
 * Built from the same parts as the rest of the site rather than a new
 * visual language: the hero is the `.glass-deep` pane the home page
 * opens on, the meta rail is the same four-cell strip the Work section
 * uses, and the type comes from the shared scale. The only thing that
 * changes between terms is the accent, which is already carried in the
 * data.
 */
export default function WorkDetail({ entry, previous, next }: WorkDetailProps) {
  const reduce = useReducedMotion();
  const accent = ACCENT_VAR[entry.accent];
  const accentInk = ACCENT_INK[entry.accent];

  const meta = [
    { label: "EMPLOYER", value: entry.company },
    { label: "LOCATION", value: entry.location },
    { label: "DATES", value: entry.dates },
    { label: "FOCUS", value: entry.focus },
  ];

  const rise = (i = 0) => ({
    initial: reduce ? false : ({ opacity: 0, y: 24 } as const),
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { ...ENTER, delay: revealDelay(i) },
  });

  return (
    <main>
      {/* HERO
          Same gutter and pane as the home page's opening panel, with
          enough top padding to clear the fixed nav. */}
      <section className="relative px-3 pb-3 pt-3 sm:px-5 sm:pb-5 sm:pt-4">
        <div className="glass glass-deep relative overflow-hidden px-6 pb-14 pt-28 sm:px-10 sm:pt-32 lg:px-14 lg:pb-16">
          <DotField tone="light" />

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={ENTER}
            className="relative z-[2] mx-auto max-w-[1100px]"
          >
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 font-body text-meta text-muted transition-colors duration-200 hover:text-text"
            >
              <ArrowLeft size={15} strokeWidth={2} />
              All work
            </Link>

            <p
              className="mt-9 font-body text-label font-medium uppercase"
              style={{ color: accentInk }}
            >
              {entry.index} / {entry.focus}
            </p>

            <h1 className="mt-4 max-w-[20ch] font-display text-display font-bold text-text">
              {entry.role}
            </h1>

            <p className="mt-5 font-body text-lead text-muted">
              {entry.company} · {entry.location} · {entry.dates}
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {entry.stack.map((tech) => (
                <span
                  key={tech}
                  className={entry.accent === "blue" ? "chip chip-blue" : "chip"}
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <div className="px-6 sm:px-10 lg:px-14">
        <div className="mx-auto max-w-[1200px]">
          {/* META RAIL */}
          <motion.div
            {...rise()}
            className="glass glass-quiet grid grid-cols-2 overflow-hidden sm:grid-cols-4"
          >
            {meta.map((row, i) => (
              <div
                key={row.label}
                className={`relative z-[2] px-6 py-7 sm:px-8 ${
                  i < meta.length - 1
                    ? "border-b border-border sm:border-b-0 sm:border-r"
                    : ""
                } ${i === 1 ? "border-b sm:border-b-0" : ""}`}
              >
                <div className="mb-2 font-body text-label font-medium text-muted">
                  {row.label}
                </div>
                <div className="font-display text-[0.9375rem] font-bold sm:text-base">
                  {row.value}
                </div>
              </div>
            ))}
          </motion.div>

          {/* OVERVIEW */}
          <section className="py-16 lg:py-24">
            <motion.div {...rise()} className="max-w-[62ch]">
              <h2 className="about-heading mb-6 font-display font-bold">
                The term in short.
              </h2>
              {entry.summary.map((paragraph) => (
                <p key={paragraph} className="about-body mb-4 font-body">
                  {paragraph}
                </p>
              ))}
            </motion.div>
          </section>

          {/* HIGHLIGHTS */}
          <section className="pb-16 lg:pb-24">
            <motion.header {...rise()} className="mb-10 max-w-[62ch] lg:mb-12">
              <h2 className="mb-5 max-w-[22ch] font-display text-title font-bold">
                What I worked on.
              </h2>
              <p className="font-body text-lead text-muted">
                {entry.bullets.length} pieces of work from the term, in the
                order they mattered most.
              </p>
            </motion.header>

            <div className="grid grid-cols-1 gap-6 sm:gap-7 lg:grid-cols-2">
              {entry.bullets.map((bullet, i) => (
                <motion.article
                  key={bullet.heading}
                  {...rise(i % 2)}
                  className="rule-cell glass glass-lift overflow-hidden px-7 pb-10 pt-9 sm:px-10 sm:pb-12 sm:pt-11"
                >
                  <div className="relative z-[2]">
                    <div className="mb-6 flex items-center gap-4">
                      <span
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-inner font-body text-[0.75rem] font-medium"
                        style={{
                          background: `color-mix(in srgb, ${accent} 12%, transparent)`,
                          color: accentInk,
                          boxShadow: `inset 0 0 0 1px color-mix(in srgb, ${accent} 26%, transparent)`,
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div
                        className="rule-draw h-[3px] w-8 rounded-chip"
                        style={{ background: accent }}
                      />
                    </div>

                    <h3 className="mb-3 font-display text-heading font-bold">
                      {bullet.heading}
                    </h3>

                    <p className="max-w-[46ch] font-body text-copy text-muted">
                      {renderBoldText(bullet.text, bullet.bold)}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>

          {/* GALLERY */}
          <section className="pb-16 lg:pb-24">
            <motion.header {...rise()} className="mb-10 max-w-[62ch] lg:mb-12">
              <h2 className="mb-5 max-w-[22ch] font-display text-title font-bold">
                From the term.
              </h2>
              <p className="font-body text-lead text-muted">
                Screens and moments from the work.
              </p>
            </motion.header>

            <div
              className={
                entry.photos.length === 1
                  ? "grid grid-cols-1 justify-items-center gap-6 sm:gap-7"
                  : "grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7"
              }
            >
              {entry.photos.map((photo, i) => (
                <motion.figure
                  key={photo.caption}
                  {...rise(i)}
                  className={`glass glass-lift overflow-hidden ${
                    entry.photos.length === 1 ? "w-full max-w-[560px]" : ""
                  }`}
                >
                  <div
                    className="relative z-[2]"
                    style={{ aspectRatio: photo.aspectRatio ?? "16 / 10" }}
                  >
                    <ImageSlot
                      label={photo.caption}
                      src={photo.src}
                      alt={photo.alt ?? photo.caption}
                      className="h-full w-full"
                      objectPosition={photo.imagePosition}
                      fit="contain"
                    />
                  </div>
                </motion.figure>
              ))}
            </div>
          </section>

          {/* PAGER */}
          <section className="pb-16 lg:pb-24">
            <div className="grid grid-cols-1 gap-6 border-t border-border pt-12 sm:gap-7 lg:grid-cols-2 lg:pt-16">
              {previous ? (
                <PagerCard entry={previous} direction="previous" />
              ) : (
                <span aria-hidden="true" className="hidden lg:block" />
              )}
              {next && <PagerCard entry={next} direction="next" />}
            </div>

            <div className="mt-10 flex justify-center">
              <Link
                href="/#work"
                className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 font-body text-sm font-medium"
              >
                Back to all work
                <ArrowUpRight size={15} strokeWidth={2} />
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function PagerCard({
  entry,
  direction,
}: {
  entry: WorkEntry;
  direction: "previous" | "next";
}) {
  const isNext = direction === "next";

  return (
    <Link
      href={`/work/${entry.slug}`}
      className={`glass glass-lift group flex flex-col gap-2 px-7 py-8 sm:px-9 ${
        isNext ? "lg:items-end lg:text-right" : ""
      }`}
    >
      <span className="relative z-[2] flex items-center gap-2 font-body text-label font-medium uppercase text-muted">
        {!isNext && (
          <ArrowLeft
            size={13}
            strokeWidth={2}
            className="transition-transform duration-300 group-hover:-translate-x-0.5"
          />
        )}
        {isNext ? "Next term" : "Previous term"}
        {isNext && (
          <ArrowRight
            size={13}
            strokeWidth={2}
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          />
        )}
      </span>

      <span className="relative z-[2] font-display text-heading font-bold">
        {entry.role}
      </span>

      <span className="relative z-[2] font-body text-meta text-muted">
        {entry.dates}
      </span>
    </Link>
  );
}
