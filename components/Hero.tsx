"use client";

import { motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function Hero() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      setTime(
        new Intl.DateTimeFormat("en-US", {
          hour: "numeric",
          minute: "2-digit",
          timeZone: "America/Halifax",
        }).format(new Date())
      );
    };
    update();
    const interval = setInterval(update, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex min-h-screen flex-col justify-center px-6 pt-24 md:px-16">
      <motion.div variants={container} initial="hidden" animate="show" className="max-w-3xl">
        <motion.div
          variants={item}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-xs uppercase tracking-wide text-muted"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-blue" />
          </span>
          Open to new-grad roles
        </motion.div>

        <motion.h1
          variants={item}
          className="font-display text-5xl font-medium leading-[1.05] tracking-tight md:text-7xl"
        >
          I build cloud infrastructure that doesn&apos;t break, and AI systems that catch what shouldn&apos;t slip through.
        </motion.h1>

        <motion.p variants={item} className="mt-6 max-w-xl text-lg text-muted">
          Fourth-year CS Co-op student at StFX, currently on the Cloud Centre of Excellence team at Sobeys. Graduating December 2026.
        </motion.p>

        <motion.div variants={item} className="mt-8 flex gap-4">
          <a
            href="#projects"
            className="rounded-full bg-tangerine px-6 py-3 text-sm font-medium text-bg transition-opacity hover:opacity-90"
          >
            See the work
          </a>
          <a
            href="/resume.pdf"
            className="rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:border-text"
          >
            Résumé
          </a>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-8 left-6 text-xs text-muted md:left-16">
        Antigonish, NS — {time}
      </div>
    </section>
  );
}
