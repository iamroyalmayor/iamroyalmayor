# Design

An **operations console for one engineer**: the site reads like well-kept infrastructure documentation. Hairline panels have mono title bars. Status is always shown as an icon plus a word. Every capability claim links to a project write-up.

## Colour (dark, solid only: no gradients, no glow)

| Token | Value | Use |
|---|---|---|
| `void` | `#0b0d0f` | Page background |
| `panel` / `raised` | `#121518` / `#181c20` | Panels, rows; hover and selected state |
| `line` / `line-strong` | `#242a2f` / `#343b42` | Hairlines, node and input borders |
| `text` / `soft` | `#e8eaeb` / `#c4c9cd` | Headings / body and long-form copy |
| `muted` | `#8f979e` | Secondary text (AA on void and panel) |
| `faint` | `#5d656c` | Decoration and column labels only |
| `signal` | `#8cbcf0` | Links, focus ring, selection |
| `ok` / `warn` / `info` / `crit` | `#4cbf8a` / `#d9a441` / `#6fa8dc` / `#e5675d` | Status, and work type (Production / Lab / Personal). Always shown with an icon and label |
| `series-1` / `series-2` | `#4596d2` / `#bc8034` | Chart lines (validated for CVD and contrast on `panel`) |

The primary button is off-white (`text`) with dark type. Secondary buttons are `panel` with a `line-strong` border.

## Type

**Geist Variable** for UI and prose. **Geist Mono Variable** for panel titles, labels, codes, numbers, and terminal/config content. Display weight is 600, with tracking from -0.032 to -0.035em. Section titles use `clamp(1.875rem, 3.2vw, 2.75rem)`.

## Components (`src/components/ui`)

- **Panel:** a 1px `line` border, 8px radius, and an optional mono title bar with meta on the right. This is the base container for everything.
- **ClassBadge / DomainTag / StatusDot:** work type is an icon plus a label in a tinted pill. Disciplines are mono tags.
- **ArchitectureDiagram:** generated from data. Zones become columns, nodes are icon cards, and links are orthogonal elbows with mono labels. Zone tone is a small square in the status colour. On mobile the diagram scrolls horizontally inside its panel.
- **CodeBlock:** a static terminal or config excerpt with a copy button. No typing animation.
- **MetricChart:** a single-axis line chart drawn at its real pixel width, with round ticks, an optional dashed warning threshold, a crosshair tooltip on hover or arrow keys, and a chart/table toggle.
- **Evidence:** dispatches terminal, config, chart, status, screenshot, and document blocks. All of them are rendered with sample data at `/evidence-kit/`.

## Layout

`.shell` has a 78rem max width with 20/40px gutters. Sections use `py-20 md:py-28` with a top `line` border. The hero sits on a 48px SVG grid pattern. Grids of equal items use the `gap-px` + `bg-line` technique for hairline dividers. Project pages have a sticky "On this page" sidebar on desktop and nine fixed sections.

## Motion

Only colour and border transitions on hover and focus. No entrance animation. Reduced motion disables transitions and smooth scrolling.
