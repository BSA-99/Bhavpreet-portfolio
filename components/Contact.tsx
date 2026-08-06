import SectionWrapper from "./SectionWrapper";

const links = [
  { label: "Email", value: "x2022fcb@stfx.ca", href: "x2022fcb@stfx.ca" },
  { label: "LinkedIn", value: "Bhavpreet's LinkedIn", href: "https://www.linkedin.com/in/bhavpreetsingharneja/" },
  { label: "GitHub", value: "Github", href: "https://github.com/BSA-99" },
  { label: "Résumé", value: "Download PDF", href: "/resume.pdf" },
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
      </ul>

      <p className="mt-20 text-xs text-muted">© 2026 Bhavpreet Singh Arneja</p>
    </SectionWrapper>
  );
}
