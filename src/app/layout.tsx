import type { Metadata, Viewport } from "next";
import { site } from "@/content/site";
import "./globals.css";

const title = `${site.name}: Security, Infrastructure & Software Engineer`;

export const metadata: Metadata = {
  ...(site.url ? { metadataBase: new URL(site.url) } : {}),
  title,
  description: `${site.headline} ${site.description}`,
  authors: [{ name: site.name }],
  keywords: [
    "cybersecurity",
    "ethical hacking",
    "network engineering",
    "Proxmox",
    "cloud engineering",
    "software engineer",
    "FastAPI",
    "Next.js",
    "IPTV",
    "VoIP",
    "smart home",
    "ELV",
  ],
  openGraph: {
    type: "website",
    title,
    description: site.headline,
    siteName: site.name,
  },
  twitter: { card: "summary", title, description: site.headline },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f3f4f1",
  colorScheme: "light",
};

// Direction contract, kept in the emitted HTML so later edits can be checked against it.
const contract = `<!--
THESIS: The career as a transit-style network map. Five discipline lines (security, infrastructure, cloud, software, smart systems) cross at projects drawn as interchange stations. Refuses the dark terminal hero and the skill-badge wall.
OWN-WORLD: Map paper #f3f4f1, white panels, near-black ink lines distinguished by stroke pattern (solid, cased, dashed, dotted, dash-dot), one cobalt signal #1f47d1 for the active line and primary action. Overpass (highway-signage grotesque) with Overpass Mono for route codes. Round route bullets, thin rules, pill controls.
STORY: The visitor sees breadth as one connected system, traces a line, jumps to the project, reads the route guides, and writes.
FIRST VIEWPORT: Left 5/12 headline, intro, two CTAs. Right 7/12 white map panel with status board header and line legend that traces each discipline.
FORM: Network/transit map, candidate 4 of 7; seed 6b59331b.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
-->`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div hidden dangerouslySetInnerHTML={{ __html: contract }} />
        <a
          href="#main"
          className="sr-only z-50 rounded-full bg-ink px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
