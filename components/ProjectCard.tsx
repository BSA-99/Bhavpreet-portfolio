"use client";

import { motion } from "framer-motion";

export interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  year: string;
  status: string;
  featured?: boolean;
}

export default function ProjectCard({
  title,
  description,
  tags,
  year,
  status,
  featured = false,
}: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`rounded-2xl border border-border bg-surface p-8 ${featured ? "md:p-10" : ""}`}
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="rounded-full border border-border px-3 py-1 text-xs text-muted">
          {status}
        </span>
        <span className="text-xs text-muted">{year}</span>
      </div>

      <h3 className={`font-display font-medium ${featured ? "text-3xl" : "text-xl"}`}>
        {title}
      </h3>

      <p className={`mt-3 text-muted ${featured ? "max-w-2xl" : ""}`}>{description}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-blue/30 px-3 py-1 text-xs text-blue"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}