"use client";

import { motion, useReducedMotion, Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import ResumeLink from "@/components/ResumeLink";
import DotField from "@/components/DotField";
import { ENTER } from "@/lib/motion";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

/* Critically damped, response 0.4. Nothing here was thrown by the
   user, so it arrives without overshoot. */
const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: ENTER,
  },
};

const HEADLINE = "I like building things that solve real problems.";

/* The headline arrives a word at a time rather than as one block. The
   stagger is tight (35ms) and the travel short — at this size a longer
   one reads as the page still loading rather than as the line landing.
   `y` is in `em` so it scales with the clamped font size. */
const headlineContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.035 } },
};

const headlineWord: Variants = {
  hidden: { opacity: 0, y: "0.4em" },
  show: { opacity: 1, y: 0, transition: ENTER },
};

const metaColumns = [
  "3 co-op terms completed",
  "Azure · Python · Next.js",
  "Nova Scotia, Canada · Available January 2027",
];

/**
 * The page's first beat, framed the same way as its last.
 *
 * This used to be text set directly on the atmosphere — the one
 * section on the site with no glass anywhere, floating on the exact
 * spot where the gradient field is busiest. `.glass-deep` already
 * existed in globals.css for precisely this ("the gradient behind is
 * strongest and the copy needs a legible ground") but nothing ever
 * used it. Wrapping the hero in it, inset by the same gutter as the
 * nav pill above and the footer panel below, makes those three the
 * page's chrome: one glass system that opens, closes, and now also
 * frames the arrival.
 */
export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative flex min-h-[90svh] flex-col px-3 pb-3 pt-3 sm:px-5 sm:pb-5 sm:pt-4">
      <div className="glass glass-deep relative flex flex-1 flex-col items-center justify-center overflow-hidden px-6 py-16 sm:px-10">
        <DotField tone="light" />

        <motion.div
          variants={container}
          initial={reduce ? false : "hidden"}
          animate="show"
          className="relative z-[2] flex w-full max-w-[1100px] flex-col items-center text-center"
        >
          <motion.p
            variants={item}
            className="chip chip-neutral hero-badge mb-8 uppercase"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="availability-ping absolute inline-flex h-full w-full rounded-full bg-accent-2 opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-2" />
            </span>
            Open to new-grad roles · January 2027
          </motion.p>

          {/* The whole line is still one accessible string — the per-word
              spans are presentational, so screen readers and copy-paste
              get the sentence, not a column of fragments. */}
          <motion.h1
            variants={headlineContainer}
            aria-label={HEADLINE}
            className="hero-headline mx-auto font-display text-text"
          >
            {HEADLINE.split(" ").map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                variants={headlineWord}
                aria-hidden="true"
                className="inline-block whitespace-pre"
              >
                {word}
                {i < HEADLINE.split(" ").length - 1 ? " " : ""}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p variants={item} className="hero-subheadline mx-auto font-body">
            Fourth-year Computer Science Co-op student at St. Francis Xavier
            University, graduating December 2026. Three completed co-op terms
            building Azure governance and automation tooling for enterprise
            cloud environments, plus machine learning systems I&apos;ve
            trained, containerized, and deployed myself.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-11 flex flex-wrap items-center justify-center gap-3.5"
          >
            <a
              href="#work"
              className="btn-primary inline-flex items-center gap-2 whitespace-nowrap px-7 py-3.5 font-body text-sm font-medium"
            >
              See the work
              <ArrowUpRight size={15} strokeWidth={2} />
            </a>

            <ResumeLink tone="glass" className="px-7 py-3.5 text-sm" />
          </motion.div>

          {/* A quiet close to the panel, the same register as the
              footer's bottom bar — small, muted, split across three
              columns. Nothing here restates the subhead above; it is
              the facts a recruiter checks first and doesn't want to
              scroll for. */}
          <motion.div
            variants={item}
            className="hero-meta mt-16 flex w-full max-w-[640px] flex-col items-center gap-2 border-t border-border pt-6 font-body text-muted sm:flex-row sm:justify-between sm:gap-3"
          >
            {metaColumns.map((column) => (
              <span key={column}>{column}</span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
