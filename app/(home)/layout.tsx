import { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";

import { siteConfig } from "@/config/site";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${siteConfig.authorName} | Software Engineer`,
  description:
    "Aditya Sahani — Full Stack Developer & AI/ML Engineer. Building fast, resilient systems and the interfaces on top of them.",
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      {children}
    </div>
  );
}
