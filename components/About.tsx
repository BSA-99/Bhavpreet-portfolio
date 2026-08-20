import Image from "next/image";

const facts = [
  { label: "PROGRAM", value: "BSc CS Co-op, StFX" },
  { label: "GRADUATING", value: "December 2026" },
  { label: "FOCUS", value: "Cloud, AI systems" },
];

const PORTRAIT_FEATHER =
  "radial-gradient(circle at 50% 44%, #000 58%, transparent 76%)";

export default function About() {
  return (
    <section
      id="about"
      className="relative scroll-mt-24 px-6 py-16 sm:px-10 lg:px-14 lg:py-24"
    >
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
        <div className="glass glass-quiet relative mx-auto aspect-[4/5] w-full max-w-[380px] overflow-hidden lg:max-w-none">
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 38%, color-mix(in srgb, var(--color-accent-2) 16%, transparent) 0%, transparent 62%)",
            }}
          />
          <Image
            src="/bhavpreet-portrait-feathered.png"
            alt="Bhavpreet Singh Arneja"
            fill
            sizes="(max-width: 1024px) 380px, 420px"
            className="relative z-[2] object-cover object-top"
            style={{
              maskImage: PORTRAIT_FEATHER,
              WebkitMaskImage: PORTRAIT_FEATHER,
              maskSize: "130% 130%",
              WebkitMaskSize: "130% 130%",
              maskPosition: "center 20%",
              WebkitMaskPosition: "center 20%",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
            }}
            priority={false}
          />
        </div>

        <div>
          <h2 className="mb-6 max-w-[24ch] font-display text-title font-bold">
            Fourth-year CS Co-op at StFX, graduating December 2026.
          </h2>

          <p className="mb-4 max-w-[62ch] font-body text-lead text-muted">
            Three co-op terms on Sobeys&apos; Cloud Centre of Excellence team
            taught me that the best infrastructure work is invisible:
            governance tooling, least-privilege access reviews, and automation
            that keeps production boring.
          </p>
          <p className="mb-9 max-w-[62ch] font-body text-lead text-muted">
            Outside of cloud work I build ML systems end to end. Training
            models, wrapping them in APIs, and shipping them in containers so
            they actually run somewhere other than a notebook.
          </p>

          <div className="glass grid grid-cols-1 overflow-hidden sm:grid-cols-3">
            {facts.map((fact, i) => (
              <div
                key={fact.label}
                className={`relative z-[2] px-6 py-5 ${
                  i < facts.length - 1
                    ? "border-b border-border sm:border-b-0 sm:border-r"
                    : ""
                }`}
              >
                <div className="mb-2 font-body text-label font-medium text-muted">
                  {fact.label}
                </div>
                <div className="font-display text-[0.9375rem] font-bold leading-snug">
                  {fact.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
