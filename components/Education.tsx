"use client";

import { motion, useReducedMotion } from "framer-motion";
import DotField from "@/components/DotField";
import { ENTER } from "@/lib/motion";

const degree = [
  { label: "INSTITUTION", value: "St. Francis Xavier University" },
  { label: "PROGRAM", value: "Bachelor of Science, Computer Science (Co-op)" },
  { label: "LOCATION", value: "Antigonish, NS" },
  { label: "GRADUATING", value: "December 2026" },
];

/* Placeholder shape pending the real course list — swap these for the
   actual courses once decided, weighted toward systems, data, and ML
   over intro-level ones. */
const coursework = [
  "Data Structures & Algorithms",
  "Operating Systems",
  "Database Systems",
  "Computer Networks",
  "Machine Learning",
  "Software Engineering",
  "Distributed Systems",
  "Statistics",
];

const involvement = [
  {
    title: "Science Atlantic Mathematics, Statistics & Computer Science Conference",
    detail:
      "St. Francis Xavier University, Antigonish, NS — competed in 2023 and 2024, collaborating with post-secondary students from across Atlantic Canada.",
  },
  {
    title: "International Collegiate Programming Contest (ICPC), Northeastern North American Regional",
    detail:
      "Université de Moncton, NB — represented StFX, placing 63rd of 93 teams.",
  },
];

/**
 * The supporting section, not a headline one — but it now shares the
 * footer's shell (one glass panel, the same dot texture) rather than
 * sitting bare on the page background, so the site's two "wrap-up"
 * surfaces — where it ends and where it started — read as the same
 * material.
 */
export default function Education() {
  const reduce = useReducedMotion();

  const rise = (delay = 0) => ({
    initial: reduce ? false : ({ opacity: 0, y: 20 } as const),
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { ...ENTER, delay },
  });

  return (
    <section
      id="education"
      className="relative scroll-mt-24 px-3 py-3 sm:px-5 sm:py-5"
    >
      <div className="glass relative mx-auto max-w-[1200px] overflow-hidden px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
        <DotField tone="light" />

        <div className="relative z-[2]">
          <motion.header {...rise()} className="max-w-[62ch]">
            <p className="mb-4 font-body text-label font-medium uppercase text-muted">
              05 / Education
            </p>
            <h2 className="max-w-[22ch] font-display text-title font-bold">
              Where the foundation comes from.
            </h2>
          </motion.header>

          <motion.div
            {...rise(0.06)}
            className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-border pt-9 sm:grid-cols-4 lg:pt-10"
          >
            {degree.map((row) => (
              <div key={row.label}>
                <div className="mb-2 font-body text-label font-medium uppercase text-muted">
                  {row.label}
                </div>
                <div className="font-display text-[0.9375rem] font-bold leading-snug">
                  {row.value}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div {...rise(0.12)} className="mt-10">
            <h3 className="mb-4 font-body text-label font-medium uppercase text-muted">
              Relevant coursework
            </h3>
            <div className="flex flex-wrap gap-2">
              {coursework.map((course) => (
                <span key={course} className="chip chip-neutral">
                  {course}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div {...rise(0.18)} className="mt-10">
            <h3 className="mb-4 font-body text-label font-medium uppercase text-muted">
              Involvement
            </h3>
            <ul className="flex flex-col gap-5">
              {involvement.map((item) => (
                <li key={item.title}>
                  <p className="font-display text-[0.9375rem] font-bold leading-snug">
                    {item.title}
                  </p>
                  <p className="mt-1 font-body text-copy text-muted">
                    {item.detail}
                  </p>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
