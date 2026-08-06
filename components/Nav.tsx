"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { RESUME_AVAILABLE, RESUME_HREF } from "@/lib/resume";

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

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-bg/80 backdrop-blur-sm">
        <nav className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4 md:px-16">
          <a href="#" className="font-display text-lg font-medium tracking-tight">
            king.jack
          </a>
          <ul className="hidden gap-8 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-muted transition-colors hover:text-text"
                >
                  <span className="text-blue">{link.number}</span> {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            {RESUME_AVAILABLE ? (
              <a
                href={RESUME_HREF}
                className="rounded-full bg-tangerine px-5 py-2 text-sm font-medium text-bg transition-opacity hover:opacity-90"
              >
                Résumé
              </a>
            ) : (
              <span
                aria-disabled="true"
                title="Coming soon"
                className="cursor-not-allowed rounded-full bg-tangerine px-5 py-2 text-sm font-medium text-bg opacity-40"
              >
                Résumé
              </span>
            )}
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-expanded={isOpen}
              className="rounded-full border border-border px-5 py-2 text-sm font-medium transition-colors hover:border-text md:hidden"
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
            className="fixed inset-0 z-40 flex flex-col justify-center bg-bg px-6 md:hidden"
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
