import { Metadata } from "next";
import { IBM_Plex_Mono, Inter, Inter_Tight } from "next/font/google";

import { siteConfig } from "@/config/site";

/* Three roles, one voice. Inter Tight and Inter are siblings, so display and
   body read as the same family at different tensions. All three have font
   metrics in Next, so each gets a size-adjusted fallback and nothing shifts
   on load. */

/** Display: hero, section headings, entry titles. Tight by design. */
const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-display",
  display: "swap",
});

/** Body: everything you read in sentences. */
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-sans",
  display: "swap",
});

/** Data: years, counts, tech tags. Never prose, never a fake terminal. */
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${siteConfig.authorName} | Software Engineer`,
  description:
    "Aditya Sahani — software engineer building AI agents, automation workflows and the backend systems behind them.",
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
    <div
      className={`${interTight.variable} ${inter.variable} ${plexMono.variable}`}
    >
      {children}
    </div>
  );
}
