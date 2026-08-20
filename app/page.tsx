import Hero from "@/components/Hero";
import About from "@/components/About";
import WorkSection from "@/components/work/WorkSection";
import Projects from "@/components/Projects";
import Practice from "@/components/Practice";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <About />
        <WorkSection />
        <Projects />
        <Practice />
      </main>

      {/* Outside <main> on purpose: a <footer> is only the page's
          contentinfo landmark when it is not nested inside another one. */}
      <Contact />
    </>
  );
}
