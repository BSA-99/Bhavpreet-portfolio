"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  Variants,
} from "framer-motion";
import ResumeLink from "@/components/ResumeLink";
import LiquidMetalText from "@/components/LiquidMetalText";
import { ENTER, SNAP } from "@/lib/motion";
import {
  lockScroll,
  subscribeScrollProgress,
  subscribeScrollY,
  unlockScroll,
} from "@/lib/lenis";

/* Numbers follow page order: About, Work, Projects, Skills, Education,
   Contact. Hrefs are root-relative rather than bare fragments so the
   nav still works from the /work/[slug] detail pages, where a bare
   "#about" would resolve against a page that has no such section. */
const navLinks = [
  { number: "01", label: "About", href: "/#about" },
  { number: "02", label: "Work", href: "/#work" },
  { number: "03", label: "Projects", href: "/#projects" },
  { number: "04", label: "Skills", href: "/#skills" },
  { number: "05", label: "Education", href: "/#education" },
  { number: "06", label: "Contact", href: "/#contact" },
];

/** "/#about" -> "about". The nav hrefs carry the leading slash so they
 *  work off-page; the observer below needs the bare element id. */
const sectionId = (href: string) => href.replace(/^\/?#/, "");

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: ENTER },
};

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const reduce = useReducedMotion();

  /* Scroll progress as a 0-1 value, which is exactly a scaleX.
     Published from the frame loop in lib/lenis.ts rather than read via
     Motion's `useScroll` or a DOM scroll listener, neither of which
     tracks correctly under Lenis.

     Not passed through `useSpring`. Lenis has already smoothed the
     scroll position, so a spring on top is a second smoothing pass on
     the same input — and because the value is set from inside a rAF
     callback, after Motion's frame loop has run, the spring is
     re-targeted a frame late on every update and crawls instead of
     following. The raw value is both exact and already smooth. */
  const progress = useMotionValue(0);

  useEffect(
    () => subscribeScrollProgress((value) => progress.set(value)),
    [progress]
  );

  useEffect(() => {
    if (!isOpen) return;
    lockScroll();
    return unlockScroll;
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

  /* Hide-on-scroll, but only past the hero — within it the pill also
     reads as the panel's own top edge, so it stays put regardless of
     direction. Below that, hides on any real downward move and
     reappears the moment the reader scrolls up, so navigation is never
     more than one wheel-tick away. */
  const [navHidden, setNavHidden] = useState(false);
  const lastScrollYRef = useRef(0);
  const heroBottomRef = useRef(0);

  useEffect(() => {
    const measureHeroBottom = () => {
      const hero = document.getElementById("hero");
      heroBottomRef.current = hero
        ? hero.getBoundingClientRect().bottom + window.scrollY
        : 0;
    };
    measureHeroBottom();
    window.addEventListener("resize", measureHeroBottom);
    return () => window.removeEventListener("resize", measureHeroBottom);
  }, []);

  useEffect(() => {
    const DIRECTION_THRESHOLD = 8;

    return subscribeScrollY((y) => {
      const delta = y - lastScrollYRef.current;
      lastScrollYRef.current = y;

      if (isOpen || y < heroBottomRef.current) {
        setNavHidden(false);
        return;
      }

      if (delta > DIRECTION_THRESHOLD) {
        setNavHidden(true);
      } else if (delta < -DIRECTION_THRESHOLD) {
        setNavHidden(false);
      }
    });
  }, [isOpen]);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(sectionId(link.href)))
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
      <motion.header
        animate={{ y: navHidden ? "-130%" : "0%" }}
        transition={reduce ? { duration: 0 } : SNAP}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
      >
        {/* `.glass-deep` rather than the base `.glass` — the nav is fixed,
            so the Hero's own `.glass-deep` panel sits directly behind it
            for the whole first viewport (Hero starts at y=0; this header
            is out of flow). The base fill was too close in opacity to
            read as a separate surface against that panel. */}
        <nav className="glass glass-deep relative mx-auto flex h-[60px] max-w-[1200px] items-center justify-between gap-4 overflow-hidden px-4 sm:h-[64px] sm:px-5">
          {/* Read progress, clipped to the pill's own rounding. It is
              driven straight off scroll rather than animating on its
              own, so it stays legible under reduced motion — only the
              spring smoothing is dropped there. */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-[2px] origin-left"
            style={{
              scaleX: progress,
              background: "var(--gradient-emphasis)",
              opacity: 0.9,
            }}
          />

          <Link
            href="/"
            className="relative z-[2] font-display text-[0.8125rem] font-bold tracking-tight whitespace-nowrap sm:text-[0.875rem] lg:text-[1rem]"
          >
            <LiquidMetalText text="BHAVPREET SINGH ARNEJA" />
          </Link>

          <ul className="relative z-[2] hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => {
              const isActive = activeId === sectionId(link.href);
              return (
                <li key={link.href} className="relative">
                  <a
                    href={link.href}
                    className={`font-body text-[0.9375rem] font-medium transition-colors duration-200 ${
                      isActive ? "text-text" : "text-muted hover:text-text"
                    }`}
                  >
                    <span
                      className={`nav-number font-body ${
                        isActive ? "text-accent-ink" : "text-accent-2-ink/70"
                      }`}
                    >
                      {link.number}
                    </span>{" "}
                    {link.label}
                  </a>

                  {/* One element, shared across all five items by
                      `layoutId` — Motion tweens it between their boxes
                      instead of cross-fading five separate rules, so the
                      marker travels with the reader down the page. */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      aria-hidden="true"
                      className="absolute -bottom-1.5 left-0 right-0 h-[2px] rounded-chip"
                      style={{ background: "var(--gradient-emphasis)" }}
                      transition={reduce ? { duration: 0 } : SNAP}
                    />
                  )}
                </li>
              );
            })}
          </ul>

          <div className="relative z-[2] flex items-center gap-2.5">
            <ResumeLink
              tone="solid"
              className="px-4 py-2 text-[0.8125rem] sm:px-5 sm:py-2.5"
            />

            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              className="rounded-chip px-4 py-2 font-body text-[0.8125rem] font-medium text-text transition-colors duration-200 hover:bg-text/5 lg:hidden"
              style={{ boxShadow: "inset 0 0 0 1px var(--color-border-strong)" }}
            >
              {isOpen ? "Close" : "Menu"}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="fixed inset-0 z-40 px-3 pb-3 pt-[80px] sm:px-5 sm:pb-5 sm:pt-[88px] lg:hidden"
          >
            {/* Same glass recipe and outer inset as the nav pill and the
                Hero panel above it, rather than a plain blurred overlay —
                this is the site's one material, so the menu should read
                as another pane of it, not a different surface. */}
            <div className="glass glass-deep relative flex h-full flex-col justify-center overflow-y-auto px-8 py-10 sm:px-10">
              <motion.ul
                variants={container}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="relative z-[2] flex flex-col gap-7"
              >
                {navLinks.map((link) => (
                  <motion.li key={link.href} variants={item}>
                    <a
                      href={link.href}
                      onClick={closeMenu}
                      className="font-display text-[2.125rem] font-bold tracking-[-0.03em]"
                    >
                      <span className="font-body text-base text-accent-2-ink">
                        {link.number}
                      </span>{" "}
                      {link.label}
                    </a>
                  </motion.li>
                ))}

                <motion.li variants={item} className="pt-4">
                  <ResumeLink
                    tone="solid"
                    onNavigate={closeMenu}
                    className="px-6 py-3 text-base"
                  />
                </motion.li>
              </motion.ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
