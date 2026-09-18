import Atmosphere from "@/components/Atmosphere";
import Nav from "@/components/Nav";
import SmoothScroll from "@/components/SmoothScroll";
import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

/**
 * A real pairing, not a family split in two.
 *
 * Space Grotesk carries display — the hero headline, section titles,
 * the wordmark: a grotesque with enough personality in its curves
 * (the squared-off "o", the angled terminals) to hold a page down at
 * 60px+. Inter carries body: built for screens at UI sizes, its
 * letterforms stay open and even at 14–17px where a display face
 * starts to feel over-drawn. Two variable instances, each loaded once,
 * each doing the size range it's actually good at.
 */
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://bhavpreet-portfolio.vercel.app";
const TITLE = "Bhavpreet Singh Arneja";
const DESCRIPTION = "Cloud and AI infrastructure. Portfolio.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    siteName: TITLE,
    // Image comes from app/opengraph-image.tsx — Next picks that file
    // convention up automatically and generates the og:image/twitter:image
    // tags from it, so it isn't repeated here.
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // The variable classes live on <html>, not <body>. --font-display
    // below resolves var(--font-space-grotesk) at the element where
    // it's declared (:root, i.e. <html>) — a custom property's var()
    // references are resolved in the cascade context of the rule that
    // declares them, not wherever they're later read. Put the source
    // variable one level below :root and :root's own reference to it
    // is permanently invalid, which then inherits as invalid to every
    // descendant, body included.
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="antialiased">
        <Atmosphere />
        <SmoothScroll />
        <Nav />
        {children}
      </body>
    </html>
  );
}
