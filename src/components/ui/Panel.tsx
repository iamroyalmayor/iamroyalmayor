import type { ReactNode } from "react";

// The base container of the console language: a hairline panel with a title bar.
export function Panel({
  title,
  meta,
  children,
  className = "",
  bodyClassName = "",
  as: Tag = "section",
  id,
}: {
  title?: ReactNode;
  meta?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  as?: "section" | "div" | "figure" | "article";
  id?: string;
}) {
  return (
    <Tag id={id} className={`overflow-hidden rounded-lg border border-line bg-panel ${className}`}>
      {(title || meta) && (
        <div className="flex min-h-11 items-center justify-between gap-4 border-b border-line px-4 py-2.5">
          {title && <div className="min-w-0 truncate font-mono text-[0.75rem] tracking-[0.04em] text-soft uppercase">{title}</div>}
          {meta && <div className="shrink-0 font-mono text-[0.75rem] text-muted">{meta}</div>}
        </div>
      )}
      <div className={bodyClassName}>{children}</div>
    </Tag>
  );
}
