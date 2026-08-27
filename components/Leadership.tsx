"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ENTER } from "@/lib/motion";
import { renderBoldText } from "./work/rich-text";

const XHH_URL = "https://www.xhelpinghands.com/";

const meta = [
  { label: "ORGANIZATION", value: "X Helping Hands" },
  { label: "ROLE", value: "Co-founder" },
  { label: "STATUS", value: "Federally incorporated non-profit" },
  { label: "REGION", value: "Antigonish & Pictou County, NS" },
  { label: "SINCE", value: "2022" },
];

const tags = [
  "Non-profit governance",
  "Grant writing",
  "Community programming",
  "Newcomer support",
  "Event organizing",
];

const bullets = [
  {
    text: "Co-founded and federally incorporated the organization, including provincial society registration and governance setup.",
    bold: ["federally incorporated"],
  },
  {
    text: "Wrote and submitted grant and microgrant applications — including CANConnect and Netukulimk Howl — to fund community programming.",
    bold: ["CANConnect", "Netukulimk Howl"],
  },
  {
    text: "Organized The Healing Circle, a community wellness event hosted at StFX in August 2026, from concept through to delivery.",
    bold: ["The Healing Circle"],
  },
  {
    text: "Built and maintain the organization's website and intake forms, so people can find services and request support without going through a person.",
    bold: ["website and intake forms"],
  },
];

/**
 * The one thing on the site that is neither a co-op term nor a shipped
 * project. A single wide card rather than a grid — a lone tile in a
 * three-column layout reads as something that failed to load, not as a
 * deliberate one-item section.
 *
 * Left column borrows the co-op meta rail's label/value pattern, just
 * stacked instead of laid out in a row, so the same field vocabulary
 * (ORGANIZATION here, EMPLOYER there) reads as one system rather than
 * two different ways of presenting a fact.
 */
export default function Leadership() {
  const reduce = useReducedMotion();

  return (
    <section
      id="leadership"
      className="relative scroll-mt-24 px-6 py-16 sm:px-10 lg:px-14 lg:py-24"
    >
      <div className="mx-auto max-w-[1200px]">
        <header className="mb-10 max-w-[62ch] lg:mb-12">
          <p className="mb-4 font-body text-label font-medium uppercase text-muted">
            03 / Leadership
          </p>
          <h2 className="mb-5 max-w-[24ch] font-display text-title font-bold">
            I co-founded a non-profit and still help run it.
          </h2>
          <p className="font-body text-lead text-muted">
            A youth-led organization that went from an idea to a federally
            incorporated non-profit, and the programming, grants, and events
            that keep it running.
          </p>
        </header>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={ENTER}
          className="glass glass-lift overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[0.34fr_0.66fr]">
            <div className="relative z-[2] border-b border-border p-7 sm:p-9 lg:border-b-0 lg:border-r">
              {meta.map((field, i) => (
                <div
                  key={field.label}
                  className={i > 0 ? "mt-6 border-t border-border pt-6" : ""}
                >
                  <div className="mb-1.5 font-body text-label font-medium text-muted">
                    {field.label}
                  </div>
                  <div className="font-display text-[0.9375rem] font-bold leading-snug">
                    {field.value}
                  </div>
                </div>
              ))}

              <div className="mt-6 border-t border-border pt-6">
                <div
                  className="mb-4 h-[3px] w-8 rounded-chip"
                  style={{ background: "var(--color-accent-2)" }}
                />
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span key={tag} className="chip chip-neutral">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative z-[2] p-7 sm:p-9">
              <p className="max-w-[60ch] font-body text-copy text-muted">
                X Helping Hands is a youth-led non-profit I co-founded with
                Tavneet Kaur to support newcomers and international students
                settling in Antigonish and Pictou County. We took it from an
                idea to a federally incorporated organization — provincial
                society registration, governance structure, and the funding
                applications that keep programming running.
              </p>
              <p className="mt-4 max-w-[60ch] font-body text-copy text-muted">
                It&apos;s the work that taught me how to operate without a
                spec: figuring out what a community actually needs, then
                building the structures to deliver it.
              </p>

              <ul className="mt-7 flex max-w-[62ch] flex-col gap-4">
                {bullets.map((bullet) => (
                  <li
                    key={bullet.text}
                    className="grid grid-cols-[10px_1fr] gap-4 font-body text-copy text-muted"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[9px] block h-[6px] w-[6px] rounded-full"
                      style={{ background: "var(--color-accent-2)" }}
                    />
                    <span>{renderBoldText(bullet.text, bullet.bold)}</span>
                  </li>
                ))}
              </ul>

              <a
                href={XHH_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-8 inline-flex w-fit items-center gap-2 px-6 py-3 font-body text-[0.8125rem] font-medium"
              >
                Visit X Helping Hands
                <ArrowUpRight size={15} strokeWidth={2} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
