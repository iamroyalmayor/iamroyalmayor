import { ArrowDown, ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { work, domains, classifications, type Classification, type Domain } from "@/content/work";
import { ClassBadge, StatusDot } from "../ui/Badges";

// The hero's right panel summarises the actual work index: every number is counted
// from content/work.ts, so it stays true as projects are added.
export function Hero() {
  const byClass = (Object.keys(classifications) as Classification[]).map((c) => ({
    c,
    n: work.filter((w) => w.classification === c).length,
  }));
  const byDomain = (Object.keys(domains) as Domain[]).map((d) => ({
    d,
    n: work.filter((w) => w.domains.includes(d)).length,
  }));

  return (
    <section id="top" aria-labelledby="hero-title" className="grid-paper border-b border-line">
      <div className="shell grid gap-12 pt-14 pb-20 md:pt-20 md:pb-24 lg:grid-cols-12 lg:items-center lg:gap-12">
        <div className="lg:col-span-7">
          <h1 id="hero-title" className="max-w-[16ch] text-[clamp(2.5rem,5.6vw,4.5rem)] leading-[1.04] font-semibold tracking-[-0.035em]">
            {site.headline}
          </h1>
          <p className="mt-7 max-w-[36rem] text-lg leading-relaxed text-muted">{site.intro}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#work"
              className="inline-flex items-center gap-2 rounded-md bg-text px-5 py-3 font-semibold text-void transition-colors hover:bg-white"
            >
              Explore My Work <ArrowDown className="size-4" aria-hidden="true" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-md border border-line-strong bg-panel px-5 py-3 font-semibold text-text transition-colors hover:border-muted"
            >
              Let&apos;s Connect <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="overflow-hidden rounded-lg border border-line bg-panel shadow-[0_24px_60px_-30px_rgba(0,0,0,0.8)]">
            <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-2.5">
              <span className="font-mono text-xs tracking-[0.04em] text-soft uppercase">Portfolio index</span>
              <span className="font-mono text-xs text-muted">{work.length} engineering projects</span>
            </div>

            <dl className="grid grid-cols-3 border-b border-line">
              {byClass.map(({ c, n }) => (
                <div key={c} className="min-w-0 border-r border-line px-3 py-4 last:border-r-0 sm:px-4">
                  <dt>
                    <ClassBadge value={c} size="sm" short />
                  </dt>
                  <dd className="tabular mt-3 text-3xl font-semibold tracking-[-0.03em]">{n}</dd>
                </div>
              ))}
            </dl>

            <div className="px-4 py-4">
              <p className="font-mono text-xs tracking-[0.04em] text-muted uppercase">Coverage by discipline</p>
              <ul className="mt-3 space-y-2.5">
                {byDomain.map(({ d, n }) => (
                  <li key={d} className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1.5 sm:grid-cols-[11rem_1fr_auto]">
                    <span className="text-sm text-soft">{domains[d].label}</span>
                    <span aria-hidden="true" className="order-3 col-span-2 flex gap-1 sm:order-none sm:col-span-1">
                      {work.map((w, i) => (
                        <span key={w.slug} className={`h-1.5 flex-1 rounded-sm ${i < n ? "bg-soft" : "bg-line"}`} />
                      ))}
                    </span>
                    <span className="tabular font-mono text-xs text-muted">
                      {n} <span className="sr-only">projects</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-line bg-void/40 px-4 py-3 text-sm">
              <StatusDot state={site.status.available ? "ok" : "idle"} label={site.status.label} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
