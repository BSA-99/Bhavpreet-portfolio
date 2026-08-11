import Hero from "@/components/Hero";
import WorkSection from "@/components/work/WorkSection";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";

export default function Home() {
  return (
    <main>
      <Hero />
      <WorkSection />
      <Projects />
      <Skills />
    </main>
  );
}