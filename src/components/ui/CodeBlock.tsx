"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Panel } from "./Panel";

// Static terminal / config excerpt. No typing animation: evidence is shown as captured.
export function CodeBlock({
  title,
  label,
  prompt,
  command,
  output,
  code,
}: {
  title: string;
  label: string;
  prompt?: string;
  command?: string;
  output?: string;
  code?: string;
}) {
  const [copied, setCopied] = useState(false);
  const copyText = command ?? code ?? "";

  async function copy() {
    try {
      await navigator.clipboard.writeText(copyText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable: the text stays selectable */
    }
  }

  return (
    <Panel
      title={title}
      meta={
        <span className="flex items-center gap-3">
          <span>{label}</span>
          <button
            type="button"
            onClick={copy}
            className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-muted transition-colors hover:bg-raised hover:text-text"
            aria-label={copied ? "Copied" : command ? "Copy command" : "Copy code"}
          >
            {copied ? <Check className="size-3.5 text-ok" aria-hidden="true" /> : <Copy className="size-3.5" aria-hidden="true" />}
          </button>
        </span>
      }
    >
      <pre className="overflow-x-auto bg-void px-4 py-4 font-mono text-[0.8125rem] leading-relaxed text-soft">
        {command !== undefined && (
          <code className="block">
            <span className="text-muted select-none">{prompt ?? "$"} </span>
            <span className="text-text">{command}</span>
          </code>
        )}
        {output && <code className="mt-1 block whitespace-pre text-muted">{output}</code>}
        {code && <code className="block whitespace-pre">{code}</code>}
      </pre>
    </Panel>
  );
}
