"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Download } from "lucide-react";
import DotField from "@/components/DotField";
import { ENTER } from "@/lib/motion";
import { RESUME_PDF_HREF } from "@/lib/resume";

/**
 * The résumé, at full length.
 *
 * Same shell as a /work/[slug] page — the `.glass-deep` hero, the same
 * back-link pattern, the same type scale — so this reads as another
 * page on the site rather than a document viewer bolted onto it. The
 * PDF itself stays the single source of truth: this page frames it
 * rather than re-typesetting it, so there's nothing here to drift out
 * of sync with the actual file.
 */
export default function ResumeView() {
  const reduce = useReducedMotion();

  return (
    <main>
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
              href="/"
              className="inline-flex items-center gap-2 font-body text-meta text-muted transition-colors duration-200 hover:text-text"
            >
              <ArrowLeft size={15} strokeWidth={2} />
              Back to home
            </Link>

            <p className="mt-9 font-body text-label font-medium uppercase text-muted">
              Résumé
            </p>

            <h1 className="mt-4 max-w-[20ch] font-display text-display font-bold text-text">
              The full résumé.
            </h1>

            <p className="mt-5 max-w-[56ch] font-body text-lead text-muted">
              Everything from the sections above, plus certifications,
              coursework, and the full project list, laid out as one
              document.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={RESUME_PDF_HREF}
                download
                className="btn-primary inline-flex items-center gap-2.5 px-7 py-3.5 font-body text-sm font-medium"
              >
                <Download size={16} strokeWidth={2} />
                Download PDF
              </a>
              <a
                href={RESUME_PDF_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="glass btn-ghost inline-flex items-center gap-2.5 px-7 py-3.5 font-body text-sm font-medium text-text"
              >
                Open in new tab
                <ArrowUpRight size={15} strokeWidth={2} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="px-6 pb-16 sm:px-10 lg:px-14 lg:pb-24">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={ENTER}
          className="glass glass-lift mx-auto max-w-[850px] overflow-hidden"
        >
          <div className="relative z-[2] aspect-[850/1100] w-full border-b border-border bg-bg">
            <object
              data={`${RESUME_PDF_HREF}#view=FitH`}
              type="application/pdf"
              className="h-full w-full"
              aria-label="Résumé preview"
            >
              {/* Renders only when the browser can't show the embed
                  in place — mobile Safari, mostly. */}
              <div className="flex h-full w-full flex-col items-center justify-center gap-4 px-6 text-center">
                <p className="font-body text-copy text-muted">
                  Your browser can&apos;t preview PDFs inline.
                </p>
                <a
                  href={RESUME_PDF_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2 px-6 py-3 font-body text-sm font-medium"
                >
                  Open the PDF
                  <ArrowUpRight size={15} strokeWidth={2} />
                </a>
              </div>
            </object>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
