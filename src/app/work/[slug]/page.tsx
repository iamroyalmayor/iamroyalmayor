import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink, FileText, NotebookPen, ShieldCheck } from "lucide-react";
import { work, workBySlug, classifications, domains } from "@/content/work";
import { site } from "@/content/site";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { GithubIcon } from "@/components/BrandIcons";
import { ClassBadge, DomainTag } from "@/components/ui/Badges";
import { Panel } from "@/components/ui/Panel";
import { ArchitectureDiagram } from "@/components/ui/ArchitectureDiagram";
import { EvidenceBlock } from "@/components/ui/Evidence";

export function generateStaticParams() {
  return work.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = workBySlug[slug];
  if (!p) return {};
  return {
    title: `${p.title} · ${site.name}`,
    description: p.short,
    openGraph: { title: p.title, description: p.short, type: "article" },
  };
}

const toc = [
  { id: "overview", label: "Overview" },
  { id: "architecture", label: "Architecture" },
  { id: "technologies", label: "Technologies" },
  { id: "implementation", label: "Implementation" },
  { id: "controls", label: "Security controls" },
  { id: "evidence", label: "Testing & evidence" },
  { id: "challenges", label: "Challenges" },
  { id: "outcomes", label: "Outcomes" },
  { id: "resources", label: "Resources" },
];

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="scroll-mt-24 border-t border-line pt-10 pb-14 first:border-0 first:pt-0">
      <h2 id={`${id}-h`} className="text-2xl font-semibold tracking-[-0.03em]">
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function Pending({ what }: { what: string }) {
  return (
    <div className="flex gap-3 rounded-lg border border-dashed border-line-strong px-5 py-5 text-[0.9375rem] text-muted">
      <NotebookPen className="mt-0.5 size-4 shrink-0 text-soft" aria-hidden="true" />
      <p>
        <span className="font-medium text-soft">Documentation in progress.</span> {what}
      </p>
    </div>
  );
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = workBySlug[slug];
  if (!p) notFound();

  const i = work.indexOf(p);
  const prev = work[i - 1];
  const next = work[i + 1];

  return (
    <>
      <Nav />
      <main id="main">
        <header className="grid-paper border-b border-line">
          <div className="shell pt-10 pb-12 md:pt-14 md:pb-16">
            <nav aria-label="Breadcrumb" className="font-mono text-xs text-muted">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <a href="/#work" className="inline-flex items-center gap-1.5 hover:text-text">
                    <ArrowLeft className="size-3.5" aria-hidden="true" /> All work
                  </a>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-soft">
                  {String(i + 1).padStart(2, "0")}
                </li>
              </ol>
            </nav>

            <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <h1 className="text-[clamp(2rem,4.4vw,3.5rem)] leading-[1.06] font-semibold tracking-[-0.032em]">{p.title}</h1>
                <p className="mt-5 max-w-[42rem] text-lg text-muted">{p.short}</p>
              </div>
              <dl className="overflow-hidden rounded-lg border border-line bg-panel text-sm lg:col-span-4">
                {[
                  ["Type", <ClassBadge key="c" value={p.classification} />],
                  [
                    "Disciplines",
                    <span key="d" className="flex flex-wrap justify-end gap-1.5">
                      {p.domains.map((d) => (
                        <DomainTag key={d} value={d} />
                      ))}
                    </span>,
                  ],
                  [
                    "Write-up",
                    <span key="w" className="font-mono text-xs text-soft">
                      {p.reviewed ? "Reviewed" : "Draft"}
                    </span>,
                  ],
                  [
                    "Repository",
                    p.repo ? (
                      <a key="r" href={p.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-signal hover:underline">
                        <GithubIcon className="size-3.5" /> View source
                      </a>
                    ) : (
                      <span key="r" className="font-mono text-xs text-muted">
                        Not public
                      </span>
                    ),
                  ],
                ].map(([k, v]) => (
                  <div key={k as string} className="flex items-center justify-between gap-4 border-b border-line px-4 py-3 last:border-0">
                    <dt className="text-muted">{k}</dt>
                    <dd className="text-right">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <p className="mt-6 text-sm text-muted">
              <span className="text-soft">{classifications[p.classification].label}:</span>{" "}
              {classifications[p.classification].description.toLowerCase()}.
            </p>
          </div>
        </header>

        <div className="shell grid gap-10 py-14 lg:grid-cols-12 lg:gap-12">
          <aside className="hidden lg:col-span-3 lg:block">
            <nav aria-label="On this page" className="sticky top-24">
              <p className="font-mono text-[0.6875rem] tracking-[0.06em] text-faint uppercase">On this page</p>
              <ol className="mt-3 space-y-0.5 border-l border-line">
                {toc.map((t) => (
                  <li key={t.id}>
                    <a href={`#${t.id}`} className="-ml-px block border-l border-transparent py-1.5 pl-4 text-sm text-muted transition-colors hover:border-soft hover:text-text">
                      {t.label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <article className="min-w-0 lg:col-span-9">
            {!p.reviewed && (
              <div className="mb-12 flex gap-3 rounded-lg border border-warn/35 bg-warn-dim px-5 py-4 text-[0.9375rem]">
                <FileText className="mt-0.5 size-4 shrink-0 text-warn" aria-hidden="true" />
                <p className="text-soft">
                  <span className="font-medium text-text">Draft write-up.</span> This page sets out the project&apos;s scope,
                  design, and controls. Test evidence, challenges, and outcomes are added as they are documented.
                </p>
              </div>
            )}

            <Section id="overview" title="Overview">
              <div className="prose-tech max-w-[44rem] text-[1.0625rem] leading-[1.75] text-soft">
                {p.overview.map((para) => (
                  <p key={para.slice(0, 24)}>{para}</p>
                ))}
              </div>
            </Section>

            <Section id="architecture" title="Architecture">
              <Panel as="figure" title="Architecture diagram" meta={`${p.diagram.nodes.length} components`}>
                <div className="p-4">
                  {p.diagramImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.diagramImage.src} alt={p.diagramImage.alt} className="block h-auto w-full" />
                  ) : (
                    <>
                      <ArchitectureDiagram diagram={p.diagram} title={p.title} />
                      <p className="mt-3 font-mono text-xs text-muted md:hidden">Scroll sideways to see the full diagram →</p>
                    </>
                  )}
                </div>
                <figcaption className="border-t border-line px-4 py-3 text-sm text-muted">{p.diagramCaption}</figcaption>
              </Panel>
            </Section>

            <Section id="technologies" title="Technologies">
              <div className="overflow-hidden rounded-lg border border-line">
                <table className="w-full text-left text-[0.9375rem]">
                  <thead className="bg-panel font-mono text-[0.6875rem] tracking-[0.06em] text-faint uppercase">
                    <tr>
                      <th scope="col" className="px-4 py-2.5 font-normal">
                        Technology
                      </th>
                      <th scope="col" className="px-4 py-2.5 font-normal">
                        Role in this project
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {p.technologies.map((t) => (
                      <tr key={t.name} className="border-t border-line align-top">
                        <th scope="row" className="w-[38%] px-4 py-3 font-medium text-text">
                          {t.name}
                        </th>
                        <td className="px-4 py-3 text-muted">{t.role}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>

            <Section id="implementation" title="Implementation">
              <ol className="space-y-0">
                {p.implementation.map((s, n) => (
                  <li key={s.title} className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-line py-4 last:border-0">
                    <span className="tabular pt-0.5 font-mono text-sm text-faint">{String(n + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 className="font-medium text-text">{s.title}</h3>
                      <p className="mt-1 text-[0.9375rem] text-muted">{s.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Section>

            <Section id="controls" title="Security controls">
              <ul className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
                {p.controls.map((c) => (
                  <li key={c.title} className="flex gap-3 bg-panel p-4 sm:last:odd:col-span-2">
                    <ShieldCheck className="mt-0.5 size-4 shrink-0 text-ok" aria-hidden="true" />
                    <div>
                      <h3 className="text-[0.9375rem] font-medium text-text">{c.title}</h3>
                      <p className="mt-1 text-sm text-muted">{c.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Section>

            <Section id="evidence" title="Testing & evidence">
              {p.evidence.length ? (
                <div className="space-y-6">
                  {p.evidence.map((e) => (
                    <EvidenceBlock key={e.title} item={e} />
                  ))}
                </div>
              ) : (
                <Pending what="Configuration excerpts, command output, monitoring data, and screenshots that verify each control will be published here." />
              )}
            </Section>

            <Section id="challenges" title="Challenges">
              {p.challenges.length ? (
                <ul className="space-y-4">
                  {p.challenges.map((c) => (
                    <li key={c.problem} className="rounded-lg border border-line bg-panel p-5">
                      <p className="font-mono text-[0.6875rem] tracking-[0.06em] text-faint uppercase">Problem</p>
                      <p className="mt-1 text-soft">{c.problem}</p>
                      <p className="mt-4 font-mono text-[0.6875rem] tracking-[0.06em] text-faint uppercase">Resolution</p>
                      <p className="mt-1 text-soft">{c.resolution}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <Pending what="The problems hit during the build and how each was resolved." />
              )}
            </Section>

            <Section id="outcomes" title="Outcomes">
              {p.outcomes.length ? (
                <ul className="max-w-[44rem] space-y-2 text-soft">
                  {p.outcomes.map((o) => (
                    <li key={o} className="flex gap-3">
                      <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-muted" />
                      {o}
                    </li>
                  ))}
                </ul>
              ) : (
                <Pending what="What changed as a result, stated only where it can be shown." />
              )}
            </Section>

            <Section id="resources" title="Resources">
              <ul className="flex flex-wrap gap-3">
                {p.repo && (
                  <li>
                    <a href={p.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md border border-line-strong bg-panel px-4 py-2.5 text-sm font-medium hover:border-muted">
                      <GithubIcon className="size-4" /> Repository <ExternalLink className="size-3.5 text-muted" aria-hidden="true" />
                    </a>
                  </li>
                )}
                {p.writeup && (
                  <li>
                    <a href={p.writeup} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md border border-line-strong bg-panel px-4 py-2.5 text-sm font-medium hover:border-muted">
                      <FileText className="size-4" aria-hidden="true" /> Technical write-up <ExternalLink className="size-3.5 text-muted" aria-hidden="true" />
                    </a>
                  </li>
                )}
                <li>
                  <a
                    href={`mailto:${site.email}?subject=${encodeURIComponent(`About: ${p.title}`)}`}
                    className="inline-flex items-center gap-2 rounded-md border border-line-strong bg-panel px-4 py-2.5 text-sm font-medium hover:border-muted"
                  >
                    Ask me about this project
                  </a>
                </li>
              </ul>
              {!p.repo && !p.writeup && (
                <p className="mt-4 text-sm text-muted">No public repository for this project yet. Configuration details are available on request.</p>
              )}
            </Section>

            <nav aria-label="More projects" className="grid gap-3 border-t border-line pt-10 sm:grid-cols-2">
              {prev ? (
                <a href={`/work/${prev.slug}/`} className="group rounded-lg border border-line bg-panel p-4 transition-colors hover:border-line-strong">
                  <span className="flex items-center gap-1.5 font-mono text-xs text-muted">
                    <ArrowLeft className="size-3.5" aria-hidden="true" /> Previous
                  </span>
                  <span className="mt-2 block font-medium group-hover:text-white">{prev.title}</span>
                </a>
              ) : (
                <span />
              )}
              {next && (
                <a href={`/work/${next.slug}/`} className="group rounded-lg border border-line bg-panel p-4 text-right transition-colors hover:border-line-strong">
                  <span className="flex items-center justify-end gap-1.5 font-mono text-xs text-muted">
                    Next <ArrowRight className="size-3.5" aria-hidden="true" />
                  </span>
                  <span className="mt-2 block font-medium group-hover:text-white">{next.title}</span>
                </a>
              )}
            </nav>
          </article>
        </div>
        <p className="sr-only">Disciplines: {p.domains.map((d) => domains[d].label).join(", ")}</p>
      </main>
      <Footer />
    </>
  );
}
