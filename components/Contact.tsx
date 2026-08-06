import SectionWrapper from "./SectionWrapper";
import { RESUME_AVAILABLE, RESUME_HREF } from "@/lib/resume";

const links = [
  { label: "Email", value: "x2022fcb@stfx.ca", href: "mailto:x2022fcb@stfx.ca" },
  { label: "LinkedIn", value: "Bhavpreet's LinkedIn", href: "https://www.linkedin.com/in/bhavpreetsingharneja/" },
  { label: "GitHub", value: "Github", href: "https://github.com/BSA-99" },
];

export default function Contact() {
  return (
    <SectionWrapper id="contact" number="05" title="Contact">
      <h3 className="font-display max-w-xl text-3xl font-medium leading-tight tracking-tight md:text-4xl">
        Open to opportunities — let&apos;s talk.
      </h3>

      <ul className="mt-12 space-y-4">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="group flex items-baseline gap-3 text-lg"
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              <span className="text-blue">{link.label}</span>
              <span className="text-muted transition-colors group-hover:text-text">
                {link.value}
              </span>
            </a>
          </li>
        ))}
        <li>
          {RESUME_AVAILABLE ? (
            <a href={RESUME_HREF} className="group flex items-baseline gap-3 text-lg">
              <span className="text-blue">Résumé</span>
              <span className="text-muted transition-colors group-hover:text-text">
                Download PDF
              </span>
            </a>
          ) : (
            <span
              aria-disabled="true"
              title="Coming soon"
              className="flex cursor-not-allowed items-baseline gap-3 text-lg opacity-40"
            >
              <span className="text-blue">Résumé</span>
              <span className="text-muted">Coming soon</span>
            </span>
          )}
        </li>
      </ul>

      <p className="mt-20 text-xs text-muted">© 2026 Bhavpreet Singh Arneja</p>
    </SectionWrapper>
  );
}
