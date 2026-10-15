import { CircleCheck, FileText, OctagonAlert, TriangleAlert, ExternalLink } from "lucide-react";
import type { Evidence } from "@/content/work";
import { Panel } from "./Panel";
import { CodeBlock } from "./CodeBlock";
import { MetricChart } from "./MetricChart";

const stateIcon = {
  ok: { Icon: CircleCheck, cls: "text-ok", word: "OK" },
  warn: { Icon: TriangleAlert, cls: "text-warn", word: "Warning" },
  crit: { Icon: OctagonAlert, cls: "text-crit", word: "Critical" },
};

function Caption({ text }: { text?: string }) {
  return text ? <figcaption className="border-t border-line px-4 py-3 text-sm text-muted">{text}</figcaption> : null;
}

// Renders one evidence item by type. Add new items in content/work.ts.
export function EvidenceBlock({ item }: { item: Evidence }) {
  switch (item.type) {
    case "terminal":
      return (
        <figure>
          <CodeBlock title={item.title} label="terminal" prompt={item.prompt} command={item.command} output={item.output} />
          {item.caption && <figcaption className="mt-2 text-sm text-muted">{item.caption}</figcaption>}
        </figure>
      );
    case "config":
      return (
        <figure>
          <CodeBlock title={item.title} label={item.language ?? "config"} code={item.code} />
          {item.caption && <figcaption className="mt-2 text-sm text-muted">{item.caption}</figcaption>}
        </figure>
      );
    case "chart":
      return <MetricChart {...item} />;
    case "status":
      return (
        <Panel as="figure" title={item.title}>
          <ul>
            {item.items.map((s) => {
              const { Icon, cls, word } = stateIcon[s.state];
              return (
                <li key={s.name} className="flex items-center justify-between gap-4 border-b border-line px-4 py-3 last:border-0">
                  <span className="flex min-w-0 items-center gap-3">
                    <Icon className={`size-4 shrink-0 ${cls}`} aria-hidden="true" />
                    <span className="truncate font-medium">{s.name}</span>
                  </span>
                  <span className="flex shrink-0 items-center gap-3 font-mono text-xs">
                    <span className="text-muted">{s.detail}</span>
                    <span className={cls}>{word}</span>
                  </span>
                </li>
              );
            })}
          </ul>
          <Caption text={item.caption} />
        </Panel>
      );
    case "screenshot":
      return (
        <Panel as="figure" title={item.title}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.src} alt={item.alt} loading="lazy" className="block h-auto w-full bg-void" />
          <Caption text={item.caption} />
        </Panel>
      );
    case "document":
      return (
        <Panel as="figure" title={item.title} meta={<FileText className="size-4" aria-hidden="true" />}>
          <ol className="space-y-0 px-4 py-3">
            {item.sections.map((s, i) => (
              <li key={s} className="flex gap-3 border-b border-line py-2 text-sm last:border-0">
                <span className="tabular w-6 shrink-0 font-mono text-muted">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-soft">{s}</span>
              </li>
            ))}
          </ol>
          {item.href && (
            <a href={item.href} target="_blank" rel="noreferrer" className="flex items-center gap-2 border-t border-line px-4 py-3 text-sm font-medium text-signal hover:underline">
              Read the full document <ExternalLink className="size-3.5" aria-hidden="true" />
            </a>
          )}
          <Caption text={item.caption} />
        </Panel>
      );
  }
}
