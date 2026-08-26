"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { ENTER, revealDelay } from "@/lib/motion";

const projects = [
  {
    status: "Complete",
    year: "2026",
    title: "AI Fraud Detection and Transaction Monitoring Engine",
    description:
      "An end-to-end fraud detection system combining a trained XGBoost model with a hybrid rules engine, served through a FastAPI backend and containerized with Docker.",
    tags: ["Python", "XGBoost", "FastAPI", "Docker"],
    imageLabel: "Fraud dashboard screenshot",
    image: "/images/fraud-dashboard.png",
    imagePosition: "15% 20%",
    accent: "orange" as const,
    githubUrl: "https://github.com/BSA-99/fraud-detection-engine",
  },
  {
    status: "Complete",
    year: "2025",
    title: "GlossBERT Word Sense Disambiguation",
    description:
      "A word sense disambiguation model built on GlossBERT, using contextual embeddings to resolve ambiguous word meanings against dictionary definitions.",
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
      className="relative scroll-mt-24 px-6 py-16 sm:px-10 lg:px-14 lg:py-24"
    >
      <div className="mx-auto max-w-[1200px]">
        <header className="mb-10 max-w-[62ch] lg:mb-12">
          <h2 className="mb-5 max-w-[22ch] font-display text-title font-bold">
            Things I&apos;ve shipped.
          </h2>
          <p className="font-body text-lead text-muted">
            Built end to end: designed, trained or developed, and deployed as
            something that actually runs.
          </p>
        </header>

        {/* Even split now that nothing anchors the bottom of the grid —
            two cards, equal width, so neither visibly overhangs the
            other. */}
        <div className="grid grid-cols-1 gap-6 sm:gap-7 lg:grid-cols-2">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={reduce ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ ...ENTER, delay: revealDelay(i) }}
            >
              <ProjectCard
                {...project}
                isActive={activeIndex === i}
                onToggle={() => setActiveIndex(activeIndex === i ? null : i)}
                onClose={() => setActiveIndex(null)}
              />
            </motion.div>
          ))}
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
