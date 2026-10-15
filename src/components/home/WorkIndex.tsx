"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { work, classifications, domains, type Classification, type Domain } from "@/content/work";
import { ClassBadge, DomainTag } from "../ui/Badges";

type ClassFilter = "all" | Classification;

// Filterable index of the engineering project pages.
export function WorkIndex() {
  const [cls, setCls] = useState<ClassFilter>("all");
  const [dom, setDom] = useState<Domain | "all">("all");

  const list = work.filter((w) => (cls === "all" || w.classification === cls) && (dom === "all" || w.domains.includes(dom)));
  const count = (c: ClassFilter) => (c === "all" ? work.length : work.filter((w) => w.classification === c).length);

  const seg = (on: boolean) =>
    `inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors ${
      on ? "bg-raised text-text shadow-[inset_0_0_0_1px_var(--color-line-strong)]" : "text-muted hover:text-text"
    }`;

  return (
    <section id="work" aria-labelledby="work-title" className="border-t border-line py-20 md:py-28">
      <div className="shell">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <h2 id="work-title" className="h-section md:col-span-7">
            Infrastructure & security work
          </h2>
          <p className="max-w-[34rem] text-muted md:col-span-5 md:justify-self-end">
            Each project has its own write-up: architecture, implementation, security controls, and evidence. Labelled
            honestly as production work, personal projects, or lab builds.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div role="group" aria-label="Filter by type" className="flex flex-wrap gap-1 rounded-lg border border-line bg-panel p-1">
            {(["all", "production", "personal", "lab"] as ClassFilter[]).map((c) => (
              <button key={c} type="button" aria-pressed={cls === c} onClick={() => setCls(c)} className={seg(cls === c)}>
                {c === "all" ? "All" : classifications[c].label.replace(" project", "")}
                <span className="tabular font-mono text-xs text-faint">{count(c)}</span>
              </button>
            ))}
          </div>
          <div role="group" aria-label="Filter by discipline" className="flex flex-wrap gap-1">
            {(["all", ...Object.keys(domains)] as (Domain | "all")[]).map((d) => (
              <button
                key={d}
                type="button"
                aria-pressed={dom === d}
                onClick={() => setDom(d)}
                className={`rounded-md border px-2.5 py-1 font-mono text-xs transition-colors ${
                  dom === d ? "border-line-strong bg-raised text-text" : "border-transparent text-muted hover:text-text"
                }`}
              >
                {d === "all" ? "Any discipline" : domains[d].short}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 overflow-hidden rounded-lg border border-line bg-panel">
          <div className="hidden grid-cols-[3rem_1fr_13rem_10rem_1.5rem] gap-6 border-b border-line px-5 py-2.5 font-mono text-[0.6875rem] tracking-[0.06em] text-faint uppercase lg:grid">
            <span>No.</span>
            <span>Project</span>
            <span>Disciplines</span>
            <span>Type</span>
            <span />
          </div>
          {list.length === 0 ? (
            <p className="px-5 py-10 text-center text-muted">
              No projects match these filters.{" "}
              <button
                type="button"
                className="text-signal underline underline-offset-4"
                onClick={() => {
                  setCls("all");
                  setDom("all");
                }}
              >
                Clear filters
              </button>
            </p>
          ) : (
            <ol>
              {list.map((w) => {
                const n = work.indexOf(w) + 1;
                return (
                  <li key={w.slug} className="border-b border-line last:border-0">
                    <a
                      href={`/work/${w.slug}/`}
                      className="group grid gap-x-6 gap-y-3 px-5 py-5 transition-colors hover:bg-raised lg:grid-cols-[3rem_1fr_13rem_10rem_1.5rem] lg:items-center"
                    >
                      <span className="tabular hidden font-mono text-sm text-faint lg:block">{String(n).padStart(2, "0")}</span>
                      <span className="min-w-0">
                        <span className="block font-medium tracking-[-0.01em] text-text group-hover:text-white">{w.title}</span>
                        <span className="mt-1 block text-sm text-muted">{w.short}</span>
                      </span>
                      <span className="flex flex-wrap gap-1.5">
                        {w.domains.map((d) => (
                          <DomainTag key={d} value={d} />
                        ))}
                      </span>
                      <span className="flex items-center justify-between gap-3 lg:block">
                        <ClassBadge value={w.classification} size="sm" />
                        <ArrowUpRight className="size-4 text-faint transition-colors group-hover:text-signal lg:hidden" aria-hidden="true" />
                      </span>
                      <ArrowUpRight className="hidden size-4 text-faint transition-colors group-hover:text-signal lg:block" aria-hidden="true" />
                    </a>
                  </li>
                );
              })}
            </ol>
          )}
        </div>
        <p className="mt-3 text-sm text-muted" aria-live="polite">
          Showing {list.length} of {work.length}
        </p>
      </div>
    </section>
  );
}
