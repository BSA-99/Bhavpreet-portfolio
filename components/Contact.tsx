import { ArrowUpRight } from "lucide-react";
import ResumeLink from "@/components/ResumeLink";
import DotField from "@/components/DotField";

const EMAIL = "x2022fcb@stfx.ca";
const GITHUB = "https://github.com/BSA-99";
const LINKEDIN = "https://www.linkedin.com/in/bhavpreetsingharneja/";

/* Mirrors the nav, minus Contact — the footer is Contact, and a link
   that scrolls you to where you already are is furniture. */
const sections = [
  { label: "About", href: "/#about" },
  { label: "Work", href: "/#work" },
  { label: "Projects", href: "/#projects" },
  { label: "Skills", href: "/#skills" },
  { label: "Education", href: "/#education" },
];

const elsewhere = [
  { label: "GitHub", href: GITHUB },
  { label: "LinkedIn", href: LINKEDIN },
  { label: "Email", href: `mailto:${EMAIL}` },
];

/* Not links. The facts a recruiter checks before they check anything
   else, so they sit in the footer rather than only in the About copy. */
const currently = [
  "Open to new-grad roles",
  "3 co-op terms completed, Sobeys",
  "CS Co-op at StFX, graduating Dec 2026",
  "Co-founder, X Helping Hands",
  "Nova Scotia, Canada",
];

/* Brand marks, not UI icons — lucide dropped its logo set, and these
   are the only two that need drawing. 24px viewBox, single path each. */
function GitHubMark() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true">
      <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.6-4.04-1.6-.55-1.4-1.34-1.77-1.34-1.77-1.09-.75.08-.73.08-.73 1.21.08 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.96 0-1.32.47-2.39 1.24-3.23-.13-.3-.54-1.53.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.25 2.88.12 3.18.77.84 1.23 1.91 1.23 3.23 0 4.63-2.8 5.65-5.48 5.95.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" />
    </svg>
  );
}

function LinkedInMark() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14Zm1.78 13.02H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

/* Icon buttons borrow the nav's Menu-button recipe rather than a fourth
   surface treatment: hairline ring, ink on hover, nothing else. */
const ICON_BUTTON =
  "inline-flex h-10 w-10 items-center justify-center rounded-chip text-muted transition-colors duration-200 hover:bg-text/5 hover:text-text";

/**
 * The page's last beat, and its second piece of chrome.
 *
 * This used to be a near-black slab. It was the one place on the site
 * where the material changed — everything above it is frosted glass
 * over the fixed gradient field, and then the page ended in a flat
 * rectangle of ink that belonged to a different design. The switch was
 * doing no work that the content needed.
 *
 * It is now the same pane as the nav, at the other end of the page:
 * one glass panel, inset by the same gutter, so the site opens and
 * closes on the same surface. The ask still leads — headline, then the
 * two things to do about it — and the directory sits underneath, where
 * a footer directory belongs.
 */
export default function Contact() {
  return (
    <footer
      id="contact"
      className="relative scroll-mt-24 px-3 pb-3 pt-6 sm:px-5 sm:pb-5 lg:pt-10"
    >
      <div className="glass relative mx-auto max-w-[1200px] overflow-hidden px-6 pb-8 pt-12 sm:px-10 lg:px-14 lg:pb-10 lg:pt-16">
        {/* The cross-hatch survives the repaint, re-toned for a pale
            ground. It is the footer's only feedback motion. */}
        <DotField tone="light" />

        <div className="relative z-[2]">
          <h2 className="mb-4 max-w-[17ch] font-display text-hero font-bold text-text">
            Ready to build things that hold up in production.
          </h2>
          <p className="mb-9 max-w-[52ch] font-body text-lead text-muted">
            Open to new-grad roles in cloud, data, and AI. Let&apos;s build
            something that ships.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href={`mailto:${EMAIL}`}
              className="btn-primary inline-flex items-center gap-2 px-7 py-4 font-body text-sm font-medium"
            >
              Get in touch
              <ArrowUpRight size={15} strokeWidth={2} />
            </a>

            <ResumeLink tone="glass" className="px-7 py-4 text-sm" />
          </div>

          {/* DIRECTORY
              Wordmark column plus three lists. Two columns on phones so
              the lists stay side by side rather than becoming one long
              scroll of link. */}
          <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 border-t border-border pt-12 sm:gap-x-10 lg:mt-20 lg:grid-cols-12 lg:gap-x-8 lg:pt-16">
            <div className="col-span-2 lg:col-span-5">
              <p
                className="gradient-text bg-clip-text font-display font-bold text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]"
                style={{
                  backgroundImage: "var(--gradient-emphasis)",
                  fontSize: "clamp(2.5rem, 1.4rem + 4.4vw, 4rem)",
                  lineHeight: 0.92,
                  letterSpacing: "-0.04em",
                }}
              >
                BHAVPREET
              </p>

              <p className="mt-5 max-w-[34ch] font-body text-copy text-muted">
                Software engineer building infrastructure, pipelines, and
                models that run in production.
              </p>

              <div className="mt-6 flex items-center gap-1">
                <a
                  href={GITHUB}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className={ICON_BUTTON}
                >
                  <GitHubMark />
                </a>
                <a
                  href={LINKEDIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className={ICON_BUTTON}
                >
                  <LinkedInMark />
                </a>
              </div>

              {/* The address is written out rather than hidden behind a
                  verb, because half of the people who want it are going
                  to copy it into their own client. */}
              <div className="mt-9">
                <h3 className="mb-4 font-body text-label font-medium uppercase text-muted">
                  Drop me a line
                </h3>
                <a
                  href={`mailto:${EMAIL}`}
                  className="flex w-full max-w-[400px] items-center justify-between gap-3 rounded-chip bg-white/70 py-1.5 pl-6 pr-1.5 transition-transform duration-300 hover:-translate-y-0.5 active:translate-y-0"
                  style={{ boxShadow: "inset 0 0 0 1px var(--color-border-strong)" }}
                >
                  <span className="truncate font-body text-meta text-muted">
                    {EMAIL}
                  </span>
                  <span className="btn-primary inline-flex shrink-0 items-center gap-1.5 px-5 py-2.5 font-body text-[0.8125rem] font-medium">
                    Say hello
                  </span>
                </a>
              </div>
            </div>

            <nav aria-label="Sections" className="lg:col-span-2">
              <h3 className="mb-5 font-body text-label font-medium uppercase text-muted">
                Sections
              </h3>
              <ul className="flex flex-col gap-3.5">
                {sections.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="font-body text-meta text-text transition-colors duration-200 hover:text-accent-ink"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Elsewhere" className="lg:col-span-2">
              <h3 className="mb-5 font-body text-label font-medium uppercase text-muted">
                Elsewhere
              </h3>
              <ul className="flex flex-col gap-3.5">
                {elsewhere.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        link.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="font-body text-meta text-text transition-colors duration-200 hover:text-accent-ink"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="col-span-2 lg:col-span-3">
              <h3 className="mb-5 font-body text-label font-medium uppercase text-muted">
                Currently
              </h3>
              <ul className="flex flex-col gap-3.5">
                {currently.map((line) => (
                  <li key={line} className="font-body text-meta text-muted">
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-14 flex flex-col gap-3 border-t border-border pt-7 font-body text-micro text-muted sm:flex-row sm:items-center sm:justify-between lg:mt-16">
            <span>© {new Date().getFullYear()} Bhavpreet Singh Arneja</span>
            <div className="flex flex-wrap items-center gap-x-7 gap-y-2">
              <span>Nova Scotia, Canada</span>
              <span>Built with Next.js and Tailwind</span>
              {/* Bare "#" on purpose: "top" means the top of whichever
                  page this footer is rendered on, home or a work term. */}
              <a
                href="#"
                className="transition-colors duration-200 hover:text-text"
              >
                Back to top
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
