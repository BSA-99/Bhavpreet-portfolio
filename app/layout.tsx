import Atmosphere from "@/components/Atmosphere";
import Nav from "@/components/Nav";
import SmoothScroll from "@/components/SmoothScroll";
import type { Metadata } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const archivoHeading = Archivo({
  variable: "--font-heading",
  weight: ["600", "700", "800"],
  subsets: ["latin"],
});

const archivoBody = Archivo({
  variable: "--font-body",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

/* Mono carries metrics, stack tags and small labels. It is what gives
   the page its technical register without shouting. */
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono-stack",
  weight: ["400", "500"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bhavpreet Singh Arneja",
  description: "Cloud and AI infrastructure. Portfolio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${archivoHeading.variable} ${archivoBody.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <Atmosphere />
        <SmoothScroll />
        <Nav />
        {children}
      </body>
    </html>
  );
}
