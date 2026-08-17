"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { RESUME_AVAILABLE, RESUME_HREF } from "@/lib/resume";
import MagneticButton from "@/components/MagneticButton";
import LiquidMetalText from "@/components/LiquidMetalText";

/* Numbers follow page order: About, Work, Projects, Practice, Contact.
   Slugs are unchanged so existing anchors and links keep working. */
const navLinks = [
  { number: "01", label: "About", href: "#about" },
  { number: "02", label: "Work", href: "#work" },
  { number: "03", label: "Projects", href: "#projects" },
  { number: "04", label: "Practice", href: "#skills" },
  { number: "05", label: "Contact", href: "#contact" },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) return;

    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }

        let maxId: string | null = null;
        let maxRatio = 0;
        for (const [id, ratio] of ratios) {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            maxId = id;
          }
        }

        if (maxId) {
          setActiveId(maxId);
        }
      },
      {
        rootMargin: "-40% 0px -40% 0px",
        threshold: Array.from({ length: 21 }, (_, i) => i / 20),
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
        <nav className="glass mx-auto flex h-[60px] max-w-[1200px] items-center justify-between gap-4 px-4 sm:h-[64px] sm:px-5">
          <a
            href="#"
            className="relative z-[2] font-display text-[11px] font-bold tracking-tight whitespace-nowrap sm:text-[13px] lg:text-[15px]"
          >
            <LiquidMetalText text="BHAVPREET SINGH ARNEJA" />
          </a>

          <ul className="relative z-[2] hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => {
              const isActive = activeId === link.href.slice(1);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`font-body text-[14px] transition-colors duration-200 ${
                      isActive ? "text-text" : "text-muted hover:text-text"
                    }`}
                  >
                    <span
                      className={`font-mono text-[11px] ${
                        isActive ? "text-accent-ink" : "text-accent-2-ink/70"
                      }`}
                    >
                      {link.number}
                    </span>{" "}
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="relative z-[2] flex items-center gap-2.5">
            <MagneticButton>
              {RESUME_AVAILABLE ? (
                <a
                  href={RESUME_HREF}
                  className="inline-flex whitespace-nowrap rounded-chip bg-text px-4 py-2 font-body text-[13px] font-medium text-bg transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 sm:px-5 sm:py-2.5"
                >
                  Résumé
                </a>
              ) : (
                <span
                  aria-disabled="true"
                  title="Coming soon"
                  className="inline-flex cursor-not-allowed whitespace-nowrap rounded-chip bg-text/45 px-4 py-2 font-body text-[13px] font-medium text-bg sm:px-5 sm:py-2.5"
                >
                  Résumé
                </span>
              )}
            </MagneticButton>

            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              className="rounded-chip px-4 py-2 font-body text-[13px] font-medium text-text transition-colors duration-200 hover:bg-text/5 lg:hidden"
              style={{ boxShadow: "inset 0 0 0 1px var(--color-border-strong)" }}
            >
              {isOpen ? "Close" : "Menu"}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-bg/85 px-8 backdrop-blur-2xl lg:hidden"
          >
            <motion.ul
              variants={container}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="flex flex-col gap-7"
            >
              {navLinks.map((link) => (
                <motion.li key={link.href} variants={item}>
                  <a
                    href={link.href}
                    onClick={closeMenu}
                    className="font-display text-[34px] font-bold tracking-[-0.03em]"
                  >
                    <span className="font-mono text-base text-accent-2-ink">
                      {link.number}
                    </span>{" "}
                    {link.label}
                  </a>
                </motion.li>
              ))}

              <motion.li variants={item} className="pt-4">
                {RESUME_AVAILABLE ? (
                  <a
                    href={RESUME_HREF}
                    onClick={closeMenu}
                    className="inline-block rounded-chip bg-text px-6 py-3 font-body text-base font-medium text-bg"
                  >
                    Résumé
                  </a>
                ) : (
                  <span
                    aria-disabled="true"
                    title="Coming soon"
                    className="inline-block cursor-not-allowed rounded-chip bg-text/45 px-6 py-3 font-body text-base font-medium text-bg"
                  >
                    Résumé
                  </span>
                )}
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
