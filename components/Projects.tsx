import SectionWrapper from "./SectionWrapper";
import ProjectCard from "./ProjectCard";
import FeaturedProjectCard from "./FeaturedProjectCard";

const projects = [
  {
    title: "AI Fraud Detection & Transaction Monitoring Engine",
    description:
      "An end-to-end fraud detection system combining a trained XGBoost model with a hybrid rules engine, served through a FastAPI backend and containerized with Docker.",
    tags: ["Python", "XGBoost", "FastAPI", "Docker"],
    year: "2026",
    status: "Complete",
    featured: true,
  },
  {
    title: "GlossBERT — Word Sense Disambiguation",
    description:
      "A word sense disambiguation system built on GlossBERT, exploring how contextual embeddings resolve ambiguous word meanings against dictionary gloss definitions.",
    tags: ["NLP", "BERT", "PyTorch"],
    year: "2025",
    status: "Complete",
  },
];

export default function Projects() {
  const [featured, secondary] = projects;

  return (
    <SectionWrapper id="projects" number="02" title="Projects">
      <div className="space-y-6">
        <FeaturedProjectCard {...featured} />
        <ProjectCard {...secondary} />
      </div>
    </SectionWrapper>
  );
}