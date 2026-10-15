# Design

The site is drawn as a **transit-style network map**. Five discipline lines cross at projects, which are drawn as interchange stations. Every section reuses that grammar: route bullets, line strokes, and stops.

## Colour (Restrained: neutrals + one signal)

| Token | Value | Use |
|---|---|---|
| `paper` | `#f3f4f1` | Page ground (map paper) |
| `card` | `#ffffff` | Panels, cards, form |
| `ink` | `#121417` | Text, all map lines, primary buttons |
| `ink-soft` | `#2b2f35` | Long-form body, chip text |
| `muted` | `#555a61` | Secondary text (≥4.5:1 on paper and card) |
| `faint` | `#8b9097` | Icons and decoration only, never text |
| `rule` / `rule-strong` | `#d9dbd5` / `#b9bcb5` | Hairlines, card borders, input borders |
| `signal` / `signal-deep` / `signal-wash` | `#1f47d1` / `#1636a3` / `#e6ebfb` | Active line, focus, form submit, hover |
| `go` | `#1b7a4b` | Availability dot only |

No gradients, glass, or glow. Depth is only a 1px border plus one soft, offset shadow (hero map panel and hovered project cards).

## Lines

Lines are told apart by **stroke pattern, not colour** (`src/content/lines.ts`): Software solid 6, Infrastructure cased (hollow) 8, Cloud dashed 11/6, Security dotted (round caps), Smart dash-dot. An active line turns `signal`, and the others dim to 16% opacity. Every line has a round bullet with a two-letter mono code (SE, IN, CL, SW, SM).

## Type

- **Overpass Variable** (self-hosted via Fontsource), a highway-signage grotesque used for everything. Display weights 760–820 with tracking from -0.02 to -0.035em. Hero is `clamp(2.5rem, 5.4vw, 4.25rem)`; section titles are `clamp(2rem, 3.6vw, 3rem)`.
- **Overpass Mono** is used only for route codes, map stop labels, and data-like strings (VLAN ids, hostnames, handles).
- Body is 17px at 1.6–1.7 line height, with prose capped near 34rem.

## Layout

- `.shell` has a 76rem max width with 20px gutters (40px from md up). Desktop uses a 12-column grid.
- Sections are separated by a 1px `rule` top border, with `py-20` (or `md:py-28`) spacing.
- Project grid spans alternate 7/5, 5/7, 4/8. On desktop the visual absorbs any row-height difference.
- No eyebrow labels above headings. Section numbers appear only in the four-step process.

## Components

Pill buttons (ink fill for primary, white with `rule-strong` border for secondary), pill legend toggles with `aria-pressed`, 2xl-radius cards, md-radius tag chips, route strips (a line stroke plus a hollow stop dot over each skill), and an underlined text link with a `rule-strong` decoration that turns `signal` on hover.

## Motion

One authored moment: the map's lines draw in left to right with a staggered `clip-path` reveal (1.6s expo-out), then the stations settle. Everything else uses short colour and border transitions. Under `prefers-reduced-motion`, all of this is off and smooth scrolling is disabled.

## Browser surfaces

Selection is signal on white, the caret is signal, focus is a 2px signal outline offset by 3px, the scrollbar is themed, and links use a 0.2em underline offset.
