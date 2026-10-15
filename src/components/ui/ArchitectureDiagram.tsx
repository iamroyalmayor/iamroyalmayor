import {
  BrickWall,
  Cctv,
  Cloud,
  Container,
  Database,
  GitBranch,
  Globe,
  HardDrive,
  Laptop,
  Monitor,
  Network,
  Phone,
  Radar,
  Router,
  Server,
  Tv,
  Wifi,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import type { Diagram, NodeKind } from "@/content/work";

// Generates a zoned architecture diagram from data: zones become columns left to right,
// nodes stack inside them, and links route as orthogonal elbows between columns.

const icons: Record<NodeKind, LucideIcon> = {
  internet: Globe,
  router: Router,
  firewall: BrickWall,
  switch: Network,
  wifi: Wifi,
  server: Server,
  vm: Monitor,
  container: Container,
  database: Database,
  storage: HardDrive,
  client: Laptop,
  service: Workflow,
  sensor: Radar,
  camera: Cctv,
  phone: Phone,
  tv: Tv,
  repo: GitBranch,
  cloud: Cloud,
};

const toneColor: Record<string, string> = {
  untrusted: "var(--color-crit)",
  edge: "var(--color-warn)",
  internal: "var(--color-info)",
  restricted: "var(--color-ok)",
  mgmt: "var(--color-muted)",
};

const NODE_W = 168;
const NODE_H = 54;
const NODE_GAP = 16;
const ZONE_PAD = 14;
const ZONE_HEAD = 38;
const COL_GAP = 72;
const MARGIN = 8;
const COL_W = NODE_W + ZONE_PAD * 2;

export function ArchitectureDiagram({ diagram, title }: { diagram: Diagram; title: string }) {
  const { zones, nodes, links } = diagram;
  const colIndex = Object.fromEntries(zones.map((z, i) => [z.id, i]));
  const perZone = zones.map((z) => nodes.filter((n) => n.zone === z.id));
  const tallest = Math.max(...perZone.map((list) => list.length));
  const innerH = tallest * NODE_H + (tallest - 1) * NODE_GAP;
  const zoneH = ZONE_HEAD + innerH + ZONE_PAD * 2;
  const width = MARGIN * 2 + zones.length * COL_W + (zones.length - 1) * COL_GAP;
  const height = MARGIN * 2 + zoneH;

  const pos: Record<string, { x: number; y: number; col: number }> = {};
  perZone.forEach((list, col) => {
    const used = list.length * NODE_H + (list.length - 1) * NODE_GAP;
    const offset = (innerH - used) / 2;
    list.forEach((n, i) => {
      pos[n.id] = {
        x: MARGIN + col * (COL_W + COL_GAP) + ZONE_PAD,
        y: MARGIN + ZONE_HEAD + ZONE_PAD + offset + i * (NODE_H + NODE_GAP),
        col,
      };
    });
  });

  function route(fromId: string, toId: string) {
    const a = pos[fromId];
    const b = pos[toId];
    const ay = a.y + NODE_H / 2;
    const by = b.y + NODE_H / 2;
    if (a.col === b.col) {
      const x = a.x + NODE_W;
      return { d: `M${x} ${ay} H${x + 18} V${by} H${x + 4}`, lx: x + 18, ly: (ay + by) / 2 };
    }
    if (a.col < b.col) {
      const x1 = a.x + NODE_W;
      const xm = MARGIN + a.col * (COL_W + COL_GAP) + COL_W + COL_GAP / 2;
      return { d: `M${x1} ${ay} H${xm} V${by} H${b.x - 4}`, lx: xm, ly: ay === by ? ay : (ay + by) / 2 };
    }
    const x1 = a.x;
    const xm = MARGIN + a.col * (COL_W + COL_GAP) - COL_GAP / 2;
    return { d: `M${x1} ${ay} H${xm} V${by} H${b.x + NODE_W + 4}`, lx: xm, ly: ay === by ? ay : (ay + by) / 2 };
  }

  return (
    <div className="overflow-x-auto overscroll-x-contain" tabIndex={0} aria-label={`${title} architecture diagram (scrollable)`}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        className="block h-auto max-w-none md:max-w-full"
        style={{ minWidth: Math.min(width, 640) }}
        role="img"
        aria-label={`Architecture of ${title}: ${zones
          .map((z) => `${z.label} (${perZone[colIndex[z.id]].map((n) => n.label).join(", ")})`)
          .join("; ")}`}
      >
        <defs>
          <marker id="arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L8 4 L0 8 z" fill="var(--color-muted)" />
          </marker>
        </defs>

        {zones.map((z, i) => {
          const x = MARGIN + i * (COL_W + COL_GAP);
          return (
            <g key={z.id}>
              <rect x={x} y={MARGIN} width={COL_W} height={zoneH} rx={8} fill="var(--color-void)" stroke="var(--color-line)" strokeDasharray={z.tone === "untrusted" ? "4 4" : undefined} />
              <rect x={x + ZONE_PAD} y={MARGIN + 15} width={8} height={8} rx={2} fill={toneColor[z.tone ?? "mgmt"]} />
              <text x={x + ZONE_PAD + 16} y={MARGIN + 23} fontSize={11} fill="var(--color-soft)" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.06em" }}>
                {z.label.toUpperCase()}
              </text>
            </g>
          );
        })}

        {links.map((l) => {
          const r = route(l.from, l.to);
          return (
            <path
              key={`${l.from}-${l.to}`}
              d={r.d}
              fill="none"
              stroke="var(--color-line-strong)"
              strokeWidth={1.5}
              strokeDasharray={l.dashed ? "5 4" : undefined}
              strokeLinejoin="round"
              markerEnd="url(#arrow)"
            />
          );
        })}

        {links
          .filter((l) => l.label)
          .map((l) => {
            const r = route(l.from, l.to);
            const w = l.label!.length * 6.4 + 12;
            return (
              <g key={`label-${l.from}-${l.to}`}>
                <rect x={r.lx - w / 2} y={r.ly - 9} width={w} height={18} rx={4} fill="var(--color-panel)" stroke="var(--color-line)" />
                <text x={r.lx} y={r.ly + 3.5} textAnchor="middle" fontSize={10.5} fill="var(--color-muted)" style={{ fontFamily: "var(--font-mono)" }}>
                  {l.label}
                </text>
              </g>
            );
          })}

        {nodes.map((n) => {
          const p = pos[n.id];
          if (!p) return null;
          const Icon = icons[n.kind];
          return (
            <g key={n.id}>
              <rect x={p.x} y={p.y} width={NODE_W} height={NODE_H} rx={6} fill="var(--color-raised)" stroke="var(--color-line-strong)" />
              <Icon x={p.x + 12} y={p.y + NODE_H / 2 - 9} width={18} height={18} color="var(--color-soft)" strokeWidth={1.6} aria-hidden="true" />
              <text x={p.x + 40} y={n.sub ? p.y + 23 : p.y + NODE_H / 2 + 4.5} fontSize={13} fontWeight={560} fill="var(--color-text)">
                {n.label}
              </text>
              {n.sub && (
                <text x={p.x + 40} y={p.y + 40} fontSize={10.5} fill="var(--color-muted)" style={{ fontFamily: "var(--font-mono)" }}>
                  {n.sub}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
