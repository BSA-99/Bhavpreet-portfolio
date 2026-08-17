"use client";

import { motion, useReducedMotion } from "framer-motion";

type Category = {
  title: string;
  blurb: string;
  items: string[];
  accent: "orange" | "blue";
  /** Cells with a wash carry a tinted gradient so the bento is not
   *  four identical white boxes. */
  wash: boolean;
  span: string;
};

const categories: Category[] = [
  {
    title: "Cloud and Infrastructure",
    blurb: "Governance, access management, and automation at scale.",
    items: [
      "Azure",
      "Azure Resource Graph",
      "KQL",
      "IAM / RBAC",
      "Azure Policy",
      "Bash / Cloud Shell",
    ],
    accent: "orange",
    wash: true,
    span: "lg:col-span-7",
  },
  {
    title: "ML and AI",
    blurb: "From model training to serving predictions in production.",
    items: ["Python", "XGBoost", "PyTorch", "scikit-learn", "FastAPI", "BERT / NLP"],
    accent: "blue",
    wash: false,
    span: "lg:col-span-5",
  },
  {
    title: "Languages and Frameworks",
    blurb: "What I build with day to day.",
    items: ["TypeScript", "Python", "React / Next.js", "Kotlin", "Java"],
    accent: "blue",
    wash: false,
    span: "lg:col-span-5",
  },
  {
    title: "Tools",
    blurb: "The everyday toolkit.",
    items: ["Git", "Docker", "VS Code", "Postman"],
    accent: "orange",
    wash: true,
    span: "lg:col-span-7",
  },
];

const ACCENT_VAR: Record<string, string> = {
  orange: "var(--color-accent)",
  blue: "var(--color-accent-2)",
};

export default function Practice() {
  const reduce = useReducedMotion();

  return (
    <section
      id="skills"
      className="relative scroll-mt-24 px-6 py-28 sm:px-10 lg:px-14 lg:py-44"
    >
      <div className="mx-auto max-w-[1200px]">
        <header className="mb-16 max-w-[62ch] lg:mb-20">
          <h2 className="mb-5 max-w-[22ch] font-display text-[26px] font-bold leading-[1.12] tracking-[-0.025em] sm:text-[34px] lg:text-[44px]">
            What I reach for, and what I reach for it to do.
          </h2>
          <p className="font-body text-[15px] leading-[1.7] text-muted sm:text-base">
            Four groups, ordered by how much of my week each one takes.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 sm:gap-7 lg:grid-cols-12">
          {categories.map((category, i) => {
            const accent = ACCENT_VAR[category.accent];
            return (
              <motion.div
                key={category.title}
                initial={reduce ? false : { opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.65,
                  delay: (i % 2) * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`practice-cell glass glass-lift overflow-hidden px-7 pb-10 pt-9 sm:px-10 sm:pb-12 sm:pt-11 ${category.span}`}
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
                    className="rule-draw mb-6 h-[3px] w-9 rounded-chip"
                    style={{ background: accent }}
                  />

                  <h3 className="mb-2.5 font-display text-[18px] font-bold leading-snug sm:text-xl">
                    {category.title}
                  </h3>

                  <p className="mb-6 max-w-[38ch] font-body text-[14px] leading-[1.6] text-muted">
                    {category.blurb}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {category.items.map((tech) => (
                      <span
                        key={tech}
                        className={
                          category.accent === "blue" ? "chip chip-blue" : "chip"
                        }
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
