"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionWrapperProps {
  id: string;
  number: string;
  title: string;
  children: ReactNode;
}

export default function SectionWrapper({ id, number, title, children }: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      className="scroll-mt-24 border-t border-border px-6 py-24 md:px-16 md:py-32"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-12 flex items-center gap-3">
          <span className="font-display text-sm text-blue">{number} /</span>
          <h2 className="font-display text-sm uppercase tracking-wide text-muted">{title}</h2>
        </div>
        {children}
      </div>
    </motion.section>
  );
}