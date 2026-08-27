import Image from "next/image";

const facts = [
  { label: "EXPERIENCE", value: "3 co-op terms, Sobeys" },
  { label: "FOCUS", value: "Cloud · Data · AI" },
  { label: "AVAILABLE", value: "January 2027" },
];

const PORTRAIT_FEATHER =
  "radial-gradient(circle at 50% 44%, #000 58%, transparent 76%)";

export default function About() {
  return (
    <section
      id="about"
      className="relative scroll-mt-24 px-6 py-16 sm:px-10 lg:px-14 lg:py-24"
    >
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-start gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
        <div className="glass glass-quiet relative mx-auto aspect-[4/5] w-full max-w-[380px] overflow-hidden lg:mt-[0.4em] lg:max-w-none">
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
            /* The hero above is 90svh, so this portrait is the first
               real image in the viewport and Next flags it as the LCP
               element. Eager rather than lazy so it is not waiting on
               the intersection observer to start fetching. */
            priority
          />
        </div>

        <div>
          <p className="mb-4 font-body text-label font-medium uppercase text-muted">
            01 / About
          </p>

          <h2 className="about-heading mb-6 font-display font-bold">
            Enterprise cloud experience, and projects I built end to end.
          </h2>

          <p className="about-body mb-4 font-body">
            I spent three co-op terms on the Cloud Centre of Excellence team
            at Sobeys, one of Canada&apos;s largest grocery retailers, working
            on governance and automation across a large Azure estate —
            identity and access management, policy enforcement, Databricks
            provisioning, and cleaning up infrastructure across an estate of
            10 subscriptions, at a scale where nothing can be done by hand.
          </p>
          <p className="about-body mb-4 font-body">
            Outside of work I build machine learning systems the whole way
            through — training the model, wrapping it in a FastAPI service,
            containerizing it with Docker, and deploying it to the cloud so
            it runs as a real endpoint rather than a script on my laptop.
          </p>
          <p className="about-body mb-9 font-body">
            I&apos;m graduating in December 2026 and looking for a new-grad
            role in cloud, backend, data, or ML engineering, starting January
            2027.
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
