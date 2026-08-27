import Hero from "@/components/Hero";
import About from "@/components/About";
import WorkSection from "@/components/work/WorkSection";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <About />
        <WorkSection />
        <Projects />
        <Skills />
        <Education />
      </main>

      {/* Outside <main> on purpose: a <footer> is only the page's
          contentinfo landmark when it is not nested inside another one. */}
      <Contact />
    </>
  );
}
