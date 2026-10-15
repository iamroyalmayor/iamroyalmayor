# Ademola: portfolio

Next.js 16 + TypeScript + Tailwind CSS 4, exported as a fully static site.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static site in ./out
```

## Editing content

| What | Where |
|---|---|
| Name, headline, intro, availability status, email, socials, domain | `src/content/site.ts` |
| Projects (text, roles, tags, links, screenshots) | `src/content/projects.ts` |
| Disciplines and skills | `src/content/lines.ts` |
| About copy | `src/components/About.tsx` |

**Screenshots:** put an image in `public/projects/` and set `image: "/projects/name.png"` on the project. It replaces the illustration automatically. Add `url` or `repo` to show live and source links. Without them, the card offers an email enquiry about the project.

## Deploy

- **Vercel:** import the repo. The framework is detected automatically, and no settings are needed.
- **Netlify:** import the repo. `netlify.toml` already sets `npm run build` with `out` as the publish directory.

Once there's a domain, set `url` in `src/content/site.ts` so SEO metadata uses absolute URLs.

## Contact form

There is no backend. The form checks the input, then opens the visitor's email app with the message already drafted, and it says so on the page. To receive messages directly, connect a form service (Formspree, Netlify Forms, etc.) in `src/components/ContactForm.tsx`.
# iamroyalmayor
