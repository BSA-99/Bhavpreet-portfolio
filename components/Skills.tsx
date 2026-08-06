import SectionWrapper from "./SectionWrapper";

const categories = [
  {
    title: "Cloud & Infrastructure",
    context: "Governance, access management, and automation at scale.",
    items: ["Azure", "Azure Resource Graph", "KQL", "IAM / RBAC", "Azure Policy", "Bash / Cloud Shell"],
  },
  {
    title: "ML / AI",
    context: "From model training to serving predictions in production.",
    items: ["Python", "XGBoost", "PyTorch", "scikit-learn", "FastAPI", "BERT / NLP"],
  },
  {
    title: "Languages & Frameworks",
    context: "What I build with day to day.",
    items: ["TypeScript", "Python", "React / Next.js", "Kotlin", "Java"],
  },
  {
    title: "Tools",
    context: "The everyday toolkit.",
    items: ["Git", "Docker", "VS Code", "Postman"],
  },
];

export default function Skills() {
  return (
    <SectionWrapper id="skills" number="03" title="Practice">
      <div className="grid gap-10 md:grid-cols-2">
        {categories.map((category) => (
          <div key={category.title}>
            <h3 className="font-display text-lg font-medium">{category.title}</h3>
            <p className="mt-1 text-sm text-muted">{category.context}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {category.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-border px-3 py-1.5 text-sm text-text"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}