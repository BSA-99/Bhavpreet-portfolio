"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ENTER, revealDelay } from "@/lib/motion";

type Category = {
  title: string;
  items: string[];
  accent: "orange" | "blue";
  /** Cells with a wash carry a tinted gradient so the bento is not
   *  five identical white boxes. */
  wash: boolean;
  span: string;
};

/* Grouped by standard resume/ATS categories rather than personal
   workflow groupings, so the section reads correctly whether a
   recruiter is scanning for cloud, backend, data, or ML keywords. */
const categories: Category[] = [
  {
    title: "Languages",
    items: ["Python", "TypeScript", "Java", "Kotlin", "SQL", "R"],
    accent: "blue",
    wash: false,
    span: "lg:col-span-2",
  },
  {
    title: "Cloud and DevOps",
    items: [
      "Azure",
      "Google Cloud Platform",
      "Azure Resource Graph",
      "KQL",
      "IAM / RBAC",
      "Azure Policy",
      "Azure Key Vault",
      "Entra ID / SCIM",
      "Docker",
      "Azure DevOps",
      "PowerShell",
    ],
    accent: "orange",
    wash: true,
    span: "lg:col-span-2",
  },
  {
    title: "Data Engineering",
    items: [
      "Databricks",
      "Apache Spark / PySpark",
      "Delta Lake",
      "Azure Data Factory",
      "BigQuery",
      "ETL Pipelines",
    ],
    accent: "blue",
    wash: false,
    span: "lg:col-span-2",
  },
  {
    title: "Machine Learning and AI",
    items: ["PyTorch", "TensorFlow / Keras", "XGBoost", "scikit-learn", "FastAPI", "BERT / NLP"],
    accent: "orange",
    wash: true,
    span: "lg:col-span-3",
  },
  {
    title: "Frameworks and Tools",
    items: ["React / Next.js", "Git / GitHub", "ServiceNow", "Jira / Confluence"],
    accent: "blue",
    wash: false,
    span: "lg:col-span-3",
  },
];

const ACCENT_VAR: Record<string, string> = {
  orange: "var(--color-accent)",
  blue: "var(--color-accent-2)",
};

const certifications = [
  "Microsoft Azure Fundamentals (AZ-900)",
  "Fortinet Cybersecurity Fundamentals",
  "AWS AI Practitioner — in progress",
];

export default function Skills() {
  const reduce = useReducedMotion();

  return (
    <section
      id="skills"
      className="relative scroll-mt-24 px-6 py-16 sm:px-10 lg:px-14 lg:py-24"
    >
      <div className="mx-auto max-w-[1200px]">
        <header className="mb-10 max-w-[62ch] lg:mb-12">
          <h2 className="mb-5 max-w-[22ch] font-display text-title font-bold">
            Skills and Tools
          </h2>
          <p className="font-body text-lead text-muted">
            Five areas, ordered by how much of my work sits in each.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 sm:gap-7 lg:grid-cols-6">
          {categories.map((category, i) => {
            const accent = ACCENT_VAR[category.accent];
            return (
              <motion.div
                key={category.title}
                initial={reduce ? false : { opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ ...ENTER, delay: revealDelay(i % 3) }}
                className={`rule-cell glass glass-lift overflow-hidden px-7 pb-10 pt-9 sm:px-10 sm:pb-12 sm:pt-11 ${category.span}`}
              >
                {category.wash && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background: `radial-gradient(120% 90% at 100% 0%, color-mix(in srgb, ${accent} 16%, transparent) 0%, transparent 62%)`,
                    }}
                  />
                )}

                <div className="relative z-[2]">
                  <div
                    className="rule-draw mb-6 h-[3px] w-8 rounded-chip"
                    style={{ background: accent }}
                  />

                  <h3 className="mb-6 font-display text-heading font-bold">
                    {category.title}
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {category.items.map((tech) => (
                      <span key={tech} className="chip chip-neutral">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ ...ENTER, delay: revealDelay(1) }}
          className="glass glass-quiet mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 px-7 py-6 text-center sm:mt-7 sm:px-10"
        >
          {certifications.map((cert) => (
            <span
              key={cert}
              className="relative z-[2] font-body text-copy text-muted"
            >
              {cert}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
