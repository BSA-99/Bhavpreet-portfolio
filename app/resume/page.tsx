import type { Metadata } from "next";
import Contact from "@/components/Contact";
import ResumeView from "@/components/ResumeView";

export const metadata: Metadata = {
  title: "Résumé — Bhavpreet Singh Arneja",
  description: "Bhavpreet Singh Arneja's résumé.",
};

export default function ResumePage() {
  return (
    <>
      <ResumeView />

      {/* Outside <main> on purpose: a <footer> is only the page's
          contentinfo landmark when it is not nested inside another one. */}
      <Contact />
    </>
  );
}
