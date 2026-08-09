"use client";

import { motion, Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import GradientBackground from "@/components/hero/GradientBackground";
import DotMotif from "@/components/hero/DotMotif";
import PhotoCard from "@/components/hero/PhotoCard";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const TEXT_SHADOW = "0 1px 24px rgba(255,255,255,0.5)";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-24">
      <GradientBackground />
      <DotMotif />

      <div className="relative z-10 mx-auto flex w-full max-w-[1520px] flex-col items-center gap-10 px-8 py-10 lg:flex-row lg:items-center lg:justify-start lg:gap-8 lg:pl-12 lg:pr-6 min-[1600px]:max-w-[1700px]">
        <div className="order-1 flex shrink-0 justify-center lg:order-2">
          <PhotoCard
            src="/bhavpreet-portrait-feathered.png"
            alt="Portrait of Bhavpreet Singh Arneja"
            size={590}
          />
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative order-2 w-full max-w-xl text-center lg:order-1 lg:min-w-0 lg:max-w-[798px] lg:flex-1 lg:text-left min-[1600px]:max-w-[900px]"
        >
          <div
            aria-hidden="true"
            className="absolute -inset-10 z-0"
            style={{
              background:
                "radial-gradient(ellipse 90% 80% at 30% 50%, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.12) 45%, rgba(255,255,255,0) 68%)",
            }}
          />

          <motion.div
            variants={item}
            className="relative z-10 mb-6 inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-xs uppercase tracking-wide text-muted"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue" />
            </span>
            Open to new-grad roles
          </motion.div>

          <motion.h1
            variants={item}
            className="relative z-10 font-display text-3xl font-medium leading-[1.1] tracking-tight sm:text-4xl lg:text-[60px] lg:leading-[1.15] min-[1600px]:text-[68px]"
            style={{ color: "#14141a", textShadow: TEXT_SHADOW }}
          >
            I build cloud infrastructure that{" "}
            <span
              className="bg-clip-text text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #2B46E0, #8A3FE0 50%, #E0551F)",
              }}
            >
              doesn&apos;t break
            </span>
            , and AI systems that catch what shouldn&apos;t slip through.
          </motion.h1>

          <motion.p
            variants={item}
            className="relative z-10 mx-auto mt-6 max-w-xl text-base text-muted md:text-lg lg:mx-0 lg:max-w-[520px] lg:text-[16px] lg:leading-[1.6]"
            style={{ textShadow: TEXT_SHADOW }}
          >
            Fourth-year CS Co-op student at StFX, currently on the Cloud Centre of Excellence team at Sobeys. Graduating December 2026.
          </motion.p>

          <motion.div
            variants={item}
            className="relative z-10 mt-8 flex flex-wrap justify-center gap-4 lg:justify-start"
          >
            <MagneticButton>
              <a
                href="#projects"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#14141a] px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                See the work
                <ArrowUpRight size={13} />
              </a>
            </MagneticButton>
            <MagneticButton>
              <a
                href="/resume.pdf"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/50 bg-white/20 px-6 py-3 text-sm font-medium text-[#14141a] backdrop-blur-sm transition-colors hover:bg-white/35"
              >
                Résumé
                <ArrowUpRight size={13} />
              </a>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
