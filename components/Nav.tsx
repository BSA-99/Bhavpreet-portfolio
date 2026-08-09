"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { RESUME_AVAILABLE, RESUME_HREF } from "@/lib/resume";
import MagneticButton from "@/components/MagneticButton";
import LiquidMetalText from "@/components/LiquidMetalText";

const navLinks = [
  { number: "01", label: "Work", href: "#work" },
  { number: "02", label: "Projects", href: "#projects" },
  { number: "03", label: "Practice", href: "#skills" },
  { number: "04", label: "About", href: "#about" },
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
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-bg/80 backdrop-blur-sm">
        <nav className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4 md:px-16 lg:py-5">
          <a
            href="#"
            className="font-display whitespace-nowrap text-[10px] font-medium tracking-tighter sm:text-sm sm:tracking-tight md:text-base md:tracking-normal lg:text-[18.5px]"
          >
            <LiquidMetalText text="BHAVPREET SINGH ARNEJA" />
          </a>
          <ul className="hidden gap-9 lg:flex">
            {navLinks.map((link) => {
              const isActive = activeId === link.href.slice(1);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`text-base transition-colors ${
                      isActive ? "text-tangerine" : "text-muted hover:text-text"
                    }`}
                  >
                    <span className={isActive ? "text-tangerine" : "text-blue"}>
                      {link.number}
                    </span>{" "}
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="flex items-center gap-3">
            <MagneticButton>
              {RESUME_AVAILABLE ? (
                <a
                  href={RESUME_HREF}
                  className="rounded-full bg-tangerine px-5 py-2 text-sm font-medium text-bg transition-opacity hover:opacity-90 lg:px-6 lg:py-2.5 lg:text-base"
                >
                  Résumé
                </a>
              ) : (
                <span
                  aria-disabled="true"
                  title="Coming soon"
                  className="cursor-not-allowed rounded-full bg-tangerine px-5 py-2 text-sm font-medium text-bg opacity-40 lg:px-6 lg:py-2.5 lg:text-base"
                >
                  Résumé
                </span>
              )}
            </MagneticButton>
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-expanded={isOpen}
              className="rounded-full border border-border px-5 py-2 text-sm font-medium transition-colors hover:border-text lg:hidden"
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
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-bg px-6 lg:hidden"
          >
            <motion.ul
              variants={container}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="flex flex-col gap-8"
            >
              {navLinks.map((link) => (
                <motion.li key={link.href} variants={item}>
                  <a
                    href={link.href}
                    onClick={closeMenu}
                    className="font-display text-4xl font-medium tracking-tight"
                  >
                    <span className="text-blue">{link.number}</span> {link.label}
                  </a>
                </motion.li>
              ))}
              <motion.li variants={item} className="pt-4">
                {RESUME_AVAILABLE ? (
                  <a
                    href={RESUME_HREF}
                    onClick={closeMenu}
                    className="inline-block rounded-full bg-tangerine px-6 py-3 text-lg font-medium text-bg transition-opacity hover:opacity-90"
                  >
                    Résumé
                  </a>
                ) : (
                  <span
                    aria-disabled="true"
                    title="Coming soon"
                    className="inline-block cursor-not-allowed rounded-full bg-tangerine px-6 py-3 text-lg font-medium text-bg opacity-40"
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
