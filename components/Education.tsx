"use client";

import { motion, useReducedMotion } from "framer-motion";
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

/* ICPC lists participation only, not placement — competing in a
   regional at all is the signal; a mid-pack finish in a field that
   includes graduate-heavy programs neither helps nor hurts, and
   volunteering the number invites a question worth not answering.

   ICTC's year is left off rather than guessed — add it back once
   confirmed. */
const involvement = [
  "ICPC Northeast North American Regional — competed with StFX teams, 2023 and 2024",
  "ICTC Digital Youth Ambassador",
];

/**
 * The supporting section, not a headline one — visually lighter than
 * Work or Projects on purpose. No accent washes, no hover lift, a
 * single glass-quiet rail rather than a full card system: the degree
 * and the courses are context for the sections above, not a new claim
 * competing with them.
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
      className="relative scroll-mt-24 px-6 py-14 sm:px-10 lg:px-14 lg:py-20"
    >
      <div className="mx-auto max-w-[1200px]">
        <header className="mb-8 max-w-[62ch] lg:mb-10">
          <p className="mb-4 font-body text-label font-medium uppercase text-muted">
            05 / Education
          </p>
          <h2 className="mb-4 max-w-[22ch] font-display text-title font-bold">
            Where the foundation comes from.
          </h2>
        </header>

        <motion.div
          {...rise()}
          className="glass glass-quiet grid grid-cols-2 overflow-hidden sm:grid-cols-4"
        >
          {degree.map((row, i) => (
            <div
              key={row.label}
              className={`relative z-[2] px-6 py-6 sm:px-7 ${
                i < degree.length - 1
                  ? "border-b border-border sm:border-b-0 sm:border-r"
                  : ""
              } ${i === 1 ? "border-b sm:border-b-0" : ""}`}
            >
              <div className="mb-2 font-body text-label font-medium text-muted">
                {row.label}
              </div>
              <div className="font-display text-[0.9375rem] font-bold leading-snug">
                {row.value}
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div {...rise(0.06)} className="mt-8">
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

        <motion.div {...rise(0.12)} className="mt-8">
          <h3 className="mb-4 font-body text-label font-medium uppercase text-muted">
            Involvement
          </h3>
          <ul className="flex flex-col gap-2.5">
            {involvement.map((line) => (
              <li key={line} className="font-body text-copy text-muted">
                {line}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
