import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Contact from "@/components/Contact";
import WorkDetail from "@/components/work/WorkDetail";
import {
  getWorkEntry,
  getWorkNeighbours,
  workEntries,
} from "@/components/work/work-data";

/* Every term is known at build time, so all three prerender as static
   HTML alongside the home page. */
export function generateStaticParams() {
  return workEntries.map((entry) => ({ slug: entry.slug }));
}

/* `params` is a promise in the App Router, and it is typed explicitly
   rather than through the generated `PageProps<'/work/[slug]'>` helper
   so this file type-checks on a clean tree, before any build has had a
   chance to emit .next/types. */
type WorkTermPageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({
  params,
}: WorkTermPageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getWorkEntry(slug);

  if (!entry) return { title: "Work — Bhavpreet Singh Arneja" };

  return {
    title: `${entry.role} — Bhavpreet Singh Arneja`,
    description: entry.summary[0],
  };
}

export default async function WorkTermPage({ params }: WorkTermPageProps) {
  const { slug } = await params;
  const entry = getWorkEntry(slug);

  if (!entry) notFound();

  const { previous, next } = getWorkNeighbours(slug);

  return (
    <>
      <WorkDetail entry={entry} previous={previous} next={next} />

      {/* Outside <main> on purpose: a <footer> is only the page's
          contentinfo landmark when it is not nested inside another one. */}
      <Contact />
    </>
  );
}
