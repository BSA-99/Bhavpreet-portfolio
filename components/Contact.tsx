import { ArrowUpRight } from "lucide-react";
import { RESUME_AVAILABLE, RESUME_HREF } from "@/lib/resume";
import DotField from "@/components/DotField";

const links = [
  { label: "Email", href: "mailto:x2022fcb@stfx.ca" },
  { label: "GitHub", href: "https://github.com/BSA-99" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/bhavpreetsingharneja/" },
];

/**
 * The page's one theme switch, and its last beat.
 *
 * A saturated tangerine block fought the warm gradient behind it and
 * forced near-black type to stay legible. Ink does the opposite: the
 * accents finally get to glow instead of compete, and the page lands
 * on contrast rather than on more of the same wash.
 */
export default function Contact() {
  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden px-6 pb-20 pt-28 sm:px-10 lg:px-14 lg:pb-24 lg:pt-40"
      style={{ background: "#141414" }}
    >
      {/* Warm bleed from the page above, so the switch reads as the same
          world at night rather than a different site. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 12% -10%, rgba(255,107,53,0.30) 0%, transparent 58%), radial-gradient(90% 70% at 92% 108%, rgba(61,90,254,0.24) 0%, transparent 60%)",
        }}
      />

      <DotField />

      <div className="relative z-[2] mx-auto max-w-[1200px]">
        <h2
          className="mb-14 max-w-[17ch] font-display text-[32px] font-bold leading-[1.02] tracking-[-0.035em] sm:text-[52px] lg:text-[72px]"
          style={{ color: "#FAFAF7" }}
        >
          Looking for a new-grad engineer who leaves things more boring than
          they found them.
        </h2>

        <div className="mb-20 flex flex-wrap gap-3 lg:mb-28">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="inline-flex items-center gap-2 rounded-chip px-7 py-4 font-body text-sm font-medium transition-transform duration-300 hover:-translate-y-0.5 active:translate-y-0"
              style={{ background: "#FAFAF7", color: "#141414" }}
            >
              {link.label}
              <ArrowUpRight size={15} strokeWidth={2} />
            </a>
          ))}

          {RESUME_AVAILABLE ? (
            <a
              href={RESUME_HREF}
              className="inline-flex items-center gap-2 rounded-chip px-7 py-4 font-body text-sm font-medium transition-colors duration-300"
              style={{
                color: "#FAFAF7",
                boxShadow: "inset 0 0 0 1px rgba(250,250,247,0.34)",
              }}
            >
              Résumé
              <ArrowUpRight size={15} strokeWidth={2} />
            </a>
          ) : (
            <span
              aria-disabled="true"
              title="Coming soon"
              className="inline-flex cursor-not-allowed items-center gap-2 rounded-chip px-7 py-4 font-body text-sm font-medium"
              style={{
                color: "rgba(250,250,247,0.55)",
                boxShadow: "inset 0 0 0 1px rgba(250,250,247,0.18)",
              }}
            >
              Résumé
            </span>
          )}
        </div>

        <div
          className="flex flex-col gap-2 pt-8 font-mono text-[11px] tracking-[0.12em] sm:flex-row sm:items-center sm:justify-between"
          style={{
            borderTop: "1px solid rgba(250,250,247,0.16)",
            color: "rgba(250,250,247,0.72)",
          }}
        >
          <span>BHAVPREET SINGH ARNEJA</span>
          <span>NOVA SCOTIA, CANADA</span>
        </div>
      </div>
    </section>
  );
}
