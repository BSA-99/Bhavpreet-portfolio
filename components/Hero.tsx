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
    <section className="relative flex min-h-dvh flex-col px-3 pb-3 pt-3 sm:px-5 sm:pb-5 sm:pt-4">
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
            className="chip chip-neutral mb-8 uppercase tracking-[0.1em]"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="availability-ping absolute inline-flex h-full w-full rounded-full bg-accent-2 opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-2" />
            </span>
            Open to new-grad roles
          </motion.p>

          <motion.h1
            variants={item}
            className="mx-auto max-w-[20ch] font-display text-display font-bold text-text lg:max-w-[25ch]"
          >
            I build cloud infrastructure that{" "}
            <span
              className="gradient-text bg-clip-text text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]"
              style={{ backgroundImage: "var(--gradient-emphasis)" }}
            >
              doesn&apos;t break
            </span>
            , and AI systems that catch what shouldn&apos;t slip through.
          </motion.h1>

          <motion.p
            variants={item}
            className="mx-auto mt-8 max-w-[54ch] font-body text-lead text-muted"
          >
            Fourth-year CS Co-op student at StFX, currently on the Cloud
            Centre of Excellence team at Sobeys. Graduating December 2026.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-11 flex flex-wrap items-center justify-center gap-3.5"
          >
            <a
              href="#projects"
              className="btn-primary inline-flex items-center gap-2 whitespace-nowrap px-7 py-3.5 font-body text-sm font-medium"
            >
              See the work
              <ArrowUpRight size={15} strokeWidth={2} />
            </a>

            <ResumeLink tone="glass" className="px-7 py-3.5 text-sm" />
          </motion.div>

          {/* A quiet close to the panel, the same register as the
              footer's bottom bar — small, muted, split left/right.
              Nothing here restates the subhead above; it is the two
              facts a recruiter checks first and doesn't want to
              scroll for. */}
          <motion.div
            variants={item}
            className="mt-16 flex w-full max-w-[420px] flex-col items-center gap-1.5 border-t border-border pt-6 font-body text-micro text-muted sm:max-w-[480px] sm:flex-row sm:justify-between sm:gap-3"
          >
            <span>Cloud Centre of Excellence, Sobeys</span>
            <span>Nova Scotia, Canada</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
