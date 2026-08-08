"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ProjectCard, { type ProjectCardProps } from "./ProjectCard";

export default function FeaturedProjectCard(props: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.96, 1]);

  return (
    <motion.div ref={ref} style={{ scale }}>
      <ProjectCard {...props} />
    </motion.div>
  );
}
