"use client";

import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { Panel } from "./Panel";

// Line chart for monitoring evidence: one y-axis, recessive grid, crosshair tooltip on
// hover and keyboard, optional warning threshold, and a table view of the same data.

const seriesColor = ["var(--color-series-1)", "var(--color-series-2)"];

type Props = {
  title: string;
  unit: string;
  xLabels: string[];
  series: { name: string; values: number[] }[];
  threshold?: { value: number; label: string };
  caption?: string;
};

const H = 240;
const PAD = { top: 16, right: 16, bottom: 28, left: 44 };

// Four even steps on round numbers (1, 2, 2.5, 5 × 10^n).
function niceStep(v: number) {
  const raw = (v || 1) / 4;
  const pow = 10 ** Math.floor(Math.log10(raw));
  const f = raw / pow;
  return (f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10) * pow;
}

export function MetricChart({ title, unit, xLabels, series, threshold, caption }: Props) {
  const [active, setActive] = useState<number | null>(null);
  const [table, setTable] = useState(false);
  const id = useId();
  const box = useRef<HTMLDivElement>(null);
  const [W, setW] = useState(640);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setW(Math.max(280, Math.round(e.contentRect.width))));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const shown = series.slice(0, 2); // more than two series belongs in small multiples

  const { max, xs, ys } = useMemo(() => {
    const all = shown.flatMap((s) => s.values).concat(threshold ? [threshold.value] : []);
    const step = niceStep(Math.max(...all) * 1.05);
    const max = step * 4;
    const innerW = W - PAD.left - PAD.right;
    const innerH = H - PAD.top - PAD.bottom;
    const xs = xLabels.map((_, i) => PAD.left + (innerW * i) / Math.max(1, xLabels.length - 1));
    const ys = (v: number) => PAD.top + innerH - (innerH * v) / max;
    return { max, xs, ys };
  }, [shown, threshold, xLabels, W]);

  const ticks = [0, 0.25, 0.5, 0.75, 1].map((f) => Math.round(max * f * 100) / 100);
  const labelEvery = Math.ceil(xLabels.length / Math.max(3, Math.floor(W / 90)));

  function onMove(e: PointerEvent<SVGSVGElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * W;
    let best = 0;
    xs.forEach((px, i) => {
      if (Math.abs(px - x) < Math.abs(xs[best] - x)) best = i;
    });
    setActive(best);
  }

  function onKey(e: KeyboardEvent<SVGSVGElement>) {
    if (e.key === "ArrowRight") setActive((a) => Math.min(xLabels.length - 1, (a ?? -1) + 1));
    else if (e.key === "ArrowLeft") setActive((a) => Math.max(0, (a ?? xLabels.length) - 1));
    else return;
    e.preventDefault();
  }

  const tipLeft = active !== null ? (xs[active] / W) * 100 : 0;

  return (
    <Panel
      as="figure"
      title={title}
      meta={
        <button
          type="button"
          onClick={() => setTable((t) => !t)}
          className="rounded px-1.5 py-0.5 underline-offset-2 hover:text-text hover:underline"
          aria-pressed={table}
        >
          {table ? "Chart" : "Table"}
        </button>
      }
    >
      {shown.length > 1 && (
        <ul className="flex flex-wrap gap-4 px-4 pt-3 text-xs text-soft" aria-label="Legend">
          {shown.map((s, i) => (
            <li key={s.name} className="flex items-center gap-2">
              <span aria-hidden="true" className="h-0.5 w-4 rounded" style={{ background: seriesColor[i] }} />
              {s.name}
            </li>
          ))}
        </ul>
      )}

      {table ? (
        <div className="overflow-x-auto p-4">
          <table className="tabular w-full text-left text-sm">
            <thead className="text-muted">
              <tr>
                <th className="py-1.5 pr-4 font-medium">Time</th>
                {shown.map((s) => (
                  <th key={s.name} className="py-1.5 pr-4 font-medium">
                    {s.name} ({unit})
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {xLabels.map((x, i) => (
                <tr key={x + i} className="border-t border-line">
                  <td className="py-1.5 pr-4 font-mono text-muted">{x}</td>
                  {shown.map((s) => (
                    <td key={s.name} className="py-1.5 pr-4 font-mono text-text">
                      {s.values[i]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div ref={box} className="relative px-2 pt-2 pb-1">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            width={W}
            height={H}
            className="block max-w-full touch-pan-y outline-none focus-visible:outline-2 focus-visible:outline-signal"
            role="img"
            aria-label={`${title}, ${unit}. Use left and right arrow keys to read values.`}
            aria-describedby={caption ? `${id}-cap` : undefined}
            tabIndex={0}
            onPointerMove={onMove}
            onPointerLeave={() => setActive(null)}
            onKeyDown={onKey}
            onBlur={() => setActive(null)}
          >
            {ticks.map((t) => (
              <g key={t}>
                <line x1={PAD.left} x2={W - PAD.right} y1={ys(t)} y2={ys(t)} stroke="var(--color-line)" strokeWidth={1} />
                <text x={PAD.left - 8} y={ys(t) + 4} textAnchor="end" fontSize={11} fill="var(--color-muted)" style={{ fontFamily: "var(--font-mono)" }}>
                  {t}
                </text>
              </g>
            ))}
            {xLabels.map((x, i) =>
              i % labelEvery === 0 && (i === xLabels.length - 1 || xLabels.length - 1 - i >= labelEvery / 2) ? (
                <text key={x + i} x={xs[i]} y={H - 8} textAnchor="middle" fontSize={11} fill="var(--color-muted)" style={{ fontFamily: "var(--font-mono)" }}>
                  {x}
                </text>
              ) : null,
            )}
            {threshold && (
              <g>
                <line x1={PAD.left} x2={W - PAD.right} y1={ys(threshold.value)} y2={ys(threshold.value)} stroke="var(--color-warn)" strokeWidth={1.5} strokeDasharray="6 4" />
                <text x={W - PAD.right} y={ys(threshold.value) - 6} textAnchor="end" fontSize={11} fill="var(--color-warn)" style={{ fontFamily: "var(--font-mono)" }}>
                  {threshold.label}
                </text>
              </g>
            )}
            {shown.map((s, si) => (
              <path
                key={s.name}
                d={s.values.map((v, i) => `${i ? "L" : "M"}${xs[i]} ${ys(v)}`).join(" ")}
                fill="none"
                stroke={seriesColor[si]}
                strokeWidth={2}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            ))}
            {active !== null && (
              <g>
                <line x1={xs[active]} x2={xs[active]} y1={PAD.top} y2={H - PAD.bottom} stroke="var(--color-muted)" strokeWidth={1} />
                {shown.map((s, si) => (
                  <circle key={s.name} cx={xs[active]} cy={ys(s.values[active])} r={4.5} fill={seriesColor[si]} stroke="var(--color-panel)" strokeWidth={2} />
                ))}
              </g>
            )}
          </svg>
          {active !== null && (
            <div
              className="pointer-events-none absolute top-3 z-10 min-w-36 -translate-x-1/2 rounded-md border border-line-strong bg-raised px-3 py-2 text-xs shadow-[0_8px_24px_-8px_rgba(0,0,0,0.6)]"
              style={{ left: `clamp(5rem, ${tipLeft}%, calc(100% - 5rem))` }}
              aria-hidden="true"
            >
              <div className="font-mono text-muted">{xLabels[active]}</div>
              {shown.map((s, si) => (
                <div key={s.name} className="mt-1 flex items-center gap-2">
                  <span className="h-0.5 w-3 rounded" style={{ background: seriesColor[si] }} />
                  <span className="tabular font-semibold text-text">
                    {s.values[active]} {unit}
                  </span>
                  <span className="text-muted">{s.name}</span>
                </div>
              ))}
            </div>
          )}
          <p className="sr-only" aria-live="polite">
            {active !== null ? `${xLabels[active]}: ${shown.map((s) => `${s.name} ${s.values[active]} ${unit}`).join(", ")}` : ""}
          </p>
        </div>
      )}
      {caption && (
        <figcaption id={`${id}-cap`} className="border-t border-line px-4 py-3 text-sm text-muted">
          {caption}
        </figcaption>
      )}
    </Panel>
  );
}
