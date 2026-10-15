import type { Metadata, Viewport } from "next";
import { site } from "@/content/site";
import "./globals.css";

const title = `${site.name}: ${site.role}`;

export const metadata: Metadata = {
  ...(site.url ? { metadataBase: new URL(site.url) } : {}),
  title,
  description: `${site.headline} ${site.description}`,
  authors: [{ name: site.name }],
  keywords: [
    "systems administration",
    "network engineering",
    "VLAN",
    "DevOps",
    "Proxmox",
    "Docker",
    "Ansible",
    "cloud infrastructure",
    "cybersecurity",
    "Wazuh",
    "SIEM",
    "vulnerability assessment",
  ],
  openGraph: { type: "website", title, description: site.headline, siteName: site.name },
  twitter: { card: "summary", title, description: site.headline },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0b0d0f",
  colorScheme: "dark",
};

// Direction contract, kept in the emitted HTML so later edits can be checked against it.
const contract = `<!--
THESIS: An operations console for one engineer: the portfolio reads like infrastructure documentation, with every claim linked to a project write-up. Refuses the neon hacker terminal and the skill-badge wall.
OWN-WORLD: Near-black void #0b0d0f, hairline panels #121518 with mono title bars, off-white text, one steel-blue signal #8cbcf0, status colours (ok/warn/info) only with labels. Geist + Geist Mono. Generated zoned architecture diagrams, static terminal/config blocks, single-axis metric charts. Solid colours only, no gradients or glow.
STORY: Visitor sees the index counts, checks capabilities against evidence links, opens a project page, reads architecture and controls, and gets in touch.
FIRST VIEWPORT: Left 7/12 headline, intro, two CTAs on a faint grid. Right 5/12 portfolio-index panel: type counts, coverage by discipline, availability.
FORM: Operations console / technical documentation. Second iteration after the transit-map direction was rejected by the user.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
-->`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div hidden dangerouslySetInnerHTML={{ __html: contract }} />
        <a
          href="#main"
          className="sr-only z-50 rounded-md bg-text px-4 py-2 font-semibold text-void focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
