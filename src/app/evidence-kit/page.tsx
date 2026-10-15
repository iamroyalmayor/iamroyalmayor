import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { EvidenceBlock } from "@/components/ui/Evidence";
import type { Evidence } from "@/content/work";

// Reference page for the owner: every evidence block type, rendered with SAMPLE data.
// Not linked from the site and excluded from search engines.
export const metadata: Metadata = {
  title: "Evidence kit (sample data)",
  robots: { index: false, follow: false },
};

const samples: { note: string; item: Evidence }[] = [
  {
    note: `{ type: "terminal", title, command, output, caption? }`,
    item: {
      type: "terminal",
      title: "Sample · SSH policy check",
      command: "sudo sshd -T | grep -E 'passwordauthentication|permitrootlogin'",
      output: "permitrootlogin no\npasswordauthentication no",
      caption: "Paste real command output exactly as captured.",
    },
  },
  {
    note: `{ type: "config", title, language?, code }`,
    item: {
      type: "config",
      title: "Sample · RouterOS VLAN interface",
      language: "routeros",
      code: "/interface vlan\nadd interface=bridge name=vlan20-guest vlan-id=20\n/ip address\nadd address=10.20.0.1/24 interface=vlan20-guest",
    },
  },
  {
    note: `{ type: "chart", title, unit, xLabels, series: [{ name, values }], threshold? }`,
    item: {
      type: "chart",
      title: "Sample · Uplink utilisation",
      unit: "Mbps",
      xLabels: ["00:00", "02:00", "04:00", "06:00", "08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00"],
      series: [
        { name: "Inbound", values: [12, 8, 6, 9, 38, 61, 72, 66, 70, 58, 44, 25] },
        { name: "Outbound", values: [4, 3, 2, 4, 14, 22, 27, 24, 26, 21, 15, 8] },
      ],
      threshold: { value: 80, label: "Alert at 80 Mbps" },
      caption: "Export real values from your monitoring system; the chart is drawn from the numbers.",
    },
  },
  {
    note: `{ type: "status", title, items: [{ name, state: "ok" | "warn" | "crit", detail }] }`,
    item: {
      type: "status",
      title: "Sample · Service checks",
      items: [
        { name: "nginx.service", state: "ok", detail: "active (running)" },
        { name: "Backup job", state: "warn", detail: "last run 26h ago" },
        { name: "Disk /var", state: "crit", detail: "93% used" },
      ],
    },
  },
  {
    note: `{ type: "document", title, sections: string[], href? }`,
    item: {
      type: "document",
      title: "Sample · Network runbook",
      sections: ["Addressing plan", "VLAN and port map", "Firewall rule set", "Change procedure", "Recovery steps"],
    },
  },
];

export default function EvidenceKit() {
  return (
    <>
      <Nav />
      <main id="main" className="shell py-14">
        <h1 className="text-3xl font-semibold tracking-[-0.03em]">Evidence kit</h1>
        <p className="mt-3 max-w-[44rem] text-muted">
          Private reference page. Everything below is <strong className="text-text">sample data</strong> showing each evidence
          block you can add to a project in <code className="font-mono text-soft">src/content/work.ts</code>. A{" "}
          <code className="font-mono text-soft">screenshot</code> block (<code className="font-mono text-soft">src, alt</code>) is also available.
        </p>
        <div className="mt-10 space-y-10">
          {samples.map((s) => (
            <div key={s.item.title}>
              <p className="mb-3 font-mono text-xs text-muted">{s.note}</p>
              <EvidenceBlock item={s.item} />
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
