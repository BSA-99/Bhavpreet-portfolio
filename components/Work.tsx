import SectionWrapper from "./SectionWrapper";

const workEntries = [
  {
    role: "Cloud Centre of Excellence Co-op",
    company: "Sobeys Inc.",
    dates: "Jan 2026 – Present",
    points: [
      "Built Azure Resource Graph and KQL-based discovery tooling to identify and remediate hundreds of stale cloud resources across production subscriptions.",
      "Led cross-team retirement coordination for legacy disk infrastructure spanning multiple owner teams.",
    ],
  },
];

export default function Work() {
  return (
    <SectionWrapper id="work" number="01" title="Work">
      <div className="space-y-16">
        {workEntries.map((entry) => (
          <div key={entry.role} className="grid gap-2 md:grid-cols-[1fr_2fr] md:gap-12">
            <div>
              <h3 className="font-display text-xl font-medium">{entry.role}</h3>
              <p className="mt-1 text-sm text-muted">
                {entry.company} · {entry.dates}
              </p>
            </div>
            <ul className="space-y-3">
              {entry.points.map((point, i) => (
                <li key={i} className="leading-relaxed text-muted">
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}