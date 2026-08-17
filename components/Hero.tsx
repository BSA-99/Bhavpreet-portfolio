"use client";

import { motion, useReducedMotion, Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import { RESUME_AVAILABLE, RESUME_HREF } from "@/lib/resume";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const pane: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.985 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative flex min-h-dvh items-center justify-center px-5 pb-24 pt-32 sm:px-8 lg:pt-36">
      {/* The hero pane is the site's thesis statement for the material:
          the strongest part of the gradient sits directly behind it, so
          this is where frosted glass is most legible as glass. */}
      <motion.div
        variants={pane}
        initial={reduce ? false : "hidden"}
        animate="show"
        className="glass glass-deep w-full max-w-[1000px] px-7 py-16 sm:px-14 sm:py-20 lg:px-20 lg:py-24"
      >
        <motion.div
          variants={container}
          initial={reduce ? false : "hidden"}
          animate="show"
          className="relative z-[2] flex flex-col items-center text-center"
        >
          <motion.p
            variants={item}
            className="chip chip-neutral mb-9 text-[10.5px] uppercase tracking-[0.16em]"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="availability-ping absolute inline-flex h-full w-full rounded-full bg-accent-2 opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-2" />
            </span>
            Open to new-grad roles
          </motion.p>

          <motion.h1
            variants={item}
            className="mx-auto max-w-[20ch] font-display text-[34px] font-bold leading-[1.06] tracking-[-0.035em] text-text sm:text-[48px] lg:max-w-[26ch] lg:text-[60px]"
          >
            I build cloud infrastructure that{" "}
            <span className="text-accent-ink">doesn&apos;t break</span>.
          </motion.h1>

          <motion.p
            variants={item}
            className="mx-auto mt-8 max-w-[50ch] font-body text-[15px] leading-[1.7] text-muted sm:text-[17px]"
          >
            Fourth-year CS Co-op at StFX, on the Cloud Centre of Excellence
            team at Sobeys. I also build AI systems that catch what slips.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-12 flex flex-wrap items-center justify-center gap-3.5"
          >
            <MagneticButton>
              <a
                href="#projects"
                className="btn-primary inline-flex items-center gap-2 whitespace-nowrap px-8 py-4 font-body text-sm font-medium"
              >
                See the work
                <ArrowUpRight size={15} strokeWidth={2} />
              </a>
            </MagneticButton>

            <MagneticButton>
              {RESUME_AVAILABLE ? (
                <a
                  href={RESUME_HREF}
                  className="glass btn-ghost inline-flex items-center gap-2 whitespace-nowrap px-8 py-4 font-body text-sm font-medium text-text"
                >
                  Résumé
                  <ArrowUpRight size={15} strokeWidth={2} />
                </a>
              ) : (
                <span
                  aria-disabled="true"
                  title="Coming soon"
                  className="glass inline-flex cursor-not-allowed items-center gap-2 whitespace-nowrap px-8 py-4 font-body text-sm font-medium text-muted"
                >
                  Résumé
                </span>
              )}
            </MagneticButton>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
