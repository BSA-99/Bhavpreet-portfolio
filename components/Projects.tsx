"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import ProjectCard from "./ProjectCard";

const projects = [
  {
    status: "Complete",
    year: "2026",
    title: "AI Fraud Detection and Transaction Monitoring Engine",
    description:
      "An end-to-end fraud detection system combining a trained XGBoost model with a hybrid rules engine, served through a FastAPI backend and containerized with Docker.",
    tags: ["Python", "XGBoost", "FastAPI", "Docker"],
    imageLabel: "Fraud dashboard screenshot",
    accent: "orange" as const,
    githubUrl: "#",
  },
  {
    status: "Complete",
    year: "2025",
    title: "GlossBERT Word Sense Disambiguation",
    description:
      "A word sense disambiguation system built on GlossBERT, exploring how contextual embeddings resolve ambiguous word meanings against dictionary gloss definitions.",
    tags: ["NLP", "BERT", "PyTorch"],
    imageLabel: "GlossBERT demo screenshot",
    accent: "blue" as const,
    githubUrl: "#",
  },
];

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section
      id="projects"
      className="relative scroll-mt-24 px-6 py-28 sm:px-10 lg:px-14 lg:py-44"
    >
      <div className="mx-auto max-w-[1200px]">
        <header className="mb-16 max-w-[62ch] lg:mb-20">
          <h2 className="mb-5 max-w-[22ch] font-display text-[26px] font-bold leading-[1.12] tracking-[-0.025em] sm:text-[34px] lg:text-[44px]">
            Things I built to find out whether they would work.
          </h2>
          <p className="font-body text-[15px] leading-[1.7] text-muted sm:text-base">
            Models trained, wrapped in an API, and shipped in a container. Each
            one runs somewhere other than a notebook.
          </p>
        </header>

        {/* Asymmetric split: the newer, larger project takes 7 columns,
            the second takes 5, and the in-progress note runs full width
            as a slim strip. Three items, three cells, no filler. */}
        <div className="grid grid-cols-1 gap-6 sm:gap-7 lg:grid-cols-12">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={reduce ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.7,
                delay: i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={i === 0 ? "lg:col-span-7" : "lg:col-span-5"}
            >
              <ProjectCard
                {...project}
                isActive={activeIndex === i}
                onToggle={() => setActiveIndex(activeIndex === i ? null : i)}
                onClose={() => setActiveIndex(null)}
              />
            </motion.div>
          ))}

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="glass glass-quiet flex items-center gap-6 px-7 py-9 sm:px-10 lg:col-span-12"
          >
            <span
              aria-hidden="true"
              className="relative z-[2] flex h-11 w-11 shrink-0 items-center justify-center rounded-inner"
              style={{
                background:
                  "color-mix(in srgb, var(--color-accent) 12%, transparent)",
                boxShadow:
                  "inset 0 0 0 1px color-mix(in srgb, var(--color-accent) 26%, transparent)",
              }}
            >
              <Plus size={17} strokeWidth={2} className="text-accent-ink" />
            </span>
            <p className="relative z-[2] max-w-[46ch] font-body text-[14px] leading-[1.6] text-muted sm:text-[15px]">
              More projects in progress. Up to five will land here as they
              ship.
            </p>
          </motion.div>
        </div>
      </div>

      {activeIndex !== null && (
        <div
          onClick={() => setActiveIndex(null)}
          className="fixed inset-0 z-[190] bg-text/70 backdrop-blur-sm"
        />
      )}
    </section>
  );
}
