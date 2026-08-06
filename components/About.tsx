import SectionWrapper from "./SectionWrapper";

export default function About() {
  return (
    <SectionWrapper id="about" number="04" title="About">
      <p className="max-w-[640px] text-lg leading-relaxed text-muted">
        I&apos;m a Computer Science Co-op student at St. Francis Xavier University, graduating
        December 2026. I&apos;m currently completing a co-op term on the Cloud Centre of
        Excellence team at Sobeys, working on Azure governance, IAM, and infrastructure
        automation. Outside of coursework and co-op, I co-founded X Helping Hands, a non-profit
        supporting newcomers and international students in Nova Scotia — building it taught me as
        much about systems thinking as any class did.
      </p>
    </SectionWrapper>
  );
}
