import { FlaskConical, Server, User } from "lucide-react";
import { classifications, domains, type Classification, type Domain } from "@/content/work";

const classStyle: Record<Classification, { cls: string; Icon: typeof Server }> = {
  production: { cls: "border-ok/40 bg-ok-dim text-ok", Icon: Server },
  personal: { cls: "border-info/40 bg-info-dim text-info", Icon: User },
  lab: { cls: "border-warn/40 bg-warn-dim text-warn", Icon: FlaskConical },
};

// Work type is always shown as icon + word, never colour alone.
export function ClassBadge({ value, size = "md", short = false }: { value: Classification; size?: "sm" | "md"; short?: boolean }) {
  const { cls, Icon } = classStyle[value];
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border font-mono tracking-[0.02em] whitespace-nowrap ${cls} ${
        size === "sm" ? "px-2 py-0.5 text-[0.6875rem]" : "px-2.5 py-1 text-xs"
      }`}
    >
      <Icon className={size === "sm" ? "size-3" : "size-3.5"} aria-hidden="true" />
      {short ? classifications[value].label.replace(" project", "") : classifications[value].label}
    </span>
  );
}

export function DomainTag({ value }: { value: Domain }) {
  return (
    <span className="inline-flex items-center rounded border border-line px-1.5 py-0.5 font-mono text-[0.6875rem] text-soft">
      {domains[value].short}
    </span>
  );
}

export function StatusDot({ state, label }: { state: "ok" | "warn" | "crit" | "idle"; label?: string }) {
  const color = { ok: "bg-ok", warn: "bg-warn", crit: "bg-crit", idle: "bg-faint" }[state];
  return (
    <span className="inline-flex items-center gap-2">
      <span aria-hidden="true" className={`size-2 shrink-0 rounded-full ${color}`} />
      {label && <span>{label}</span>}
    </span>
  );
}
