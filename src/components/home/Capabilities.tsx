import { ArrowRight, Bug, Network, Rocket, Server, ShieldCheck, Workflow } from "lucide-react";
import { workBySlug } from "@/content/work";

// What an employer needs to trust me with, each backed by the project pages that show it.
const capabilities = [
  {
    title: "Administer servers",
    detail: "Build, patch, back up, and keep Linux hosts and hypervisors healthy.",
    Icon: Server,
    evidence: ["linux-server-administration-hardening", "proxmox-private-cloud", "infrastructure-automation-ansible"],
  },
  {
    title: "Design networks",
    detail: "Plan addressing, segment with VLANs, and route and filter between them.",
    Icon: Network,
    evidence: ["enterprise-network-vlan-segmentation", "network-monitoring-alerting"],
  },
  {
    title: "Deploy applications",
    detail: "Containerise services and ship them through tested, repeatable pipelines.",
    Icon: Rocket,
    evidence: ["docker-cicd-automated-deployment", "cloud-infrastructure-security-automation"],
  },
  {
    title: "Automate infrastructure",
    detail: "Describe servers and cloud resources as code so every build is identical.",
    Icon: Workflow,
    evidence: ["infrastructure-automation-ansible", "cloud-infrastructure-security-automation", "proxmox-private-cloud"],
  },
  {
    title: "Troubleshoot production issues",
    detail: "Follow the problem from metrics to logs to packets until the cause is clear.",
    Icon: Bug,
    evidence: ["network-monitoring-alerting", "network-traffic-analysis-incident-investigation", "linux-server-administration-hardening"],
  },
  {
    title: "Implement security controls",
    detail: "Harden, segment, detect, and verify, then prove each control with evidence.",
    Icon: ShieldCheck,
    evidence: ["wazuh-siem-security-operations-lab", "vulnerability-assessment-remediation", "enterprise-network-vlan-segmentation"],
  },
];

export function Capabilities() {
  return (
    <section id="capabilities" aria-labelledby="cap-title" className="py-20 md:py-28">
      <div className="shell">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <h2 id="cap-title" className="h-section md:col-span-6">
            What you can hand me
          </h2>
          <p className="max-w-[34rem] text-muted md:col-span-6 md:justify-self-end">
            Six responsibilities, each linked to the project write-ups that show the work behind it. No skill bars, no
            percentages.
          </p>
        </div>

        <ul className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map(({ title, detail, Icon, evidence }) => (
            <li key={title} className="flex flex-col bg-panel p-6">
              <Icon className="size-5 text-soft" aria-hidden="true" />
              <h3 className="mt-5 text-lg font-semibold tracking-[-0.02em]">{title}</h3>
              <p className="mt-2 text-[0.9375rem] text-muted">{detail}</p>
              <p className="mt-6 font-mono text-[0.6875rem] tracking-[0.06em] text-faint uppercase">Evidence</p>
              <ul className="mt-2 space-y-1.5">
                {evidence.map((slug) => (
                  <li key={slug}>
                    <a
                      href={`/work/${slug}/`}
                      className="group inline-flex items-start gap-2 text-sm text-soft transition-colors hover:text-signal"
                    >
                      <ArrowRight className="mt-[3px] size-3.5 shrink-0 text-faint transition-colors group-hover:text-signal" aria-hidden="true" />
                      <span className="underline decoration-line-strong underline-offset-4 group-hover:decoration-signal">
                        {workBySlug[slug].title}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
