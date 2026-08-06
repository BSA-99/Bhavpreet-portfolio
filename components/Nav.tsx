"use client";

import { RESUME_AVAILABLE, RESUME_HREF } from "@/lib/resume";

const navLinks = [
  { number: "01", label: "Work", href: "#work" },
  { number: "02", label: "Projects", href: "#projects" },
  { number: "03", label: "Practice", href: "#skills" },
  { number: "04", label: "About", href: "#about" },
  { number: "05", label: "Contact", href: "#contact" },
];

export default function Nav() {
  return (
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
      </nav>
    </header>
  );
}
