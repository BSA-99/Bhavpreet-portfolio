import Hero from "@/components/Hero";
import About from "@/components/About";
import WorkSection from "@/components/work/WorkSection";
import Projects from "@/components/Projects";
import Practice from "@/components/Practice";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <WorkSection />
      <Projects />
      <Practice />
      <Contact />
    </main>
  );
}
