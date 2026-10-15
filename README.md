# Ademola: portfolio

Next.js 16 + TypeScript + Tailwind CSS 4, exported as a fully static site (Vercel or Netlify).

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static site in ./out
```

## Editing content

| What | Where |
|---|---|
| Name, headline, intro, availability, email, socials, domain | `src/content/site.ts` |
| Infrastructure & security project pages (`/work/<slug>/`) | `src/content/work.ts` |
| Products (KiraOSINT, KiraCall, WellsTV, Proxmox Cloud Platform) | `src/content/products.ts` |
| Capabilities and their evidence links | `src/components/home/Capabilities.tsx` |
| About copy | `src/components/home/About.tsx` |

### Project pages

Each entry in `src/content/work.ts` generates a full page. To finish a project:

1. Check `classification`: `"production"`, `"personal"`, or `"lab"`.
2. Correct the overview, technologies, implementation, and controls to match what you actually built.
3. Add `evidence` items: terminal output, config excerpts, chart data, service status, screenshots, or documents. See `/evidence-kit/` (not linked, not indexed) for every type rendered with sample data.
4. Add `challenges` and `outcomes` you can stand behind.
5. Add `repo` / `writeup` links if they're public.
6. Set `reviewed: true` to remove the "Draft write-up" notice.

Put images in `public/work/<slug>/` and reference them as `/work/<slug>/file.png`. Set `diagramImage` to replace the generated architecture diagram with your own.

To add an 11th project, copy an entry, give it a new `slug`, and rebuild. The index, filters, and hero counts update automatically.

## Deploy

- **Vercel:** import the repo. No settings are needed.
- **Netlify:** import the repo. `netlify.toml` sets the build command and the `out` publish directory.

Set `url` in `src/content/site.ts` once there's a domain.

## Contact form

There is no backend. The form checks the input, then opens the visitor's email app with the message already drafted. To receive messages directly, connect Formspree or Netlify Forms in `src/components/ContactForm.tsx`.

# iamroyalmayor
