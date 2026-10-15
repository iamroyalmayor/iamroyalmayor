import { ArrowRight, ArrowUpRight, Mail } from "lucide-react";
import { products } from "@/content/products";
import { site } from "@/content/site";

export function Products() {
  return (
    <section id="products" aria-labelledby="products-title" className="border-t border-line py-20 md:py-28">
      <div className="shell">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <h2 id="products-title" className="h-section md:col-span-6">
            Products I&apos;m building
          </h2>
          <p className="max-w-[34rem] text-muted md:col-span-6 md:justify-self-end">
            Software where the infrastructure and security work above meets real users.
          </p>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {products.map((p) => (
            <li key={p.id} className="flex flex-col rounded-lg border border-line bg-panel p-6">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl font-semibold tracking-[-0.025em]">{p.name}</h3>
                {p.stage && (
                  <span className="shrink-0 rounded-full border border-line-strong px-2 py-0.5 font-mono text-[0.6875rem] text-soft">
                    {p.stage}
                  </span>
                )}
              </div>
              <p className="mt-3 text-[0.9375rem] text-muted">{p.summary}</p>
              <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Focus areas">
                {p.tags.map((t) => (
                  <li key={t} className="rounded border border-line px-1.5 py-0.5 font-mono text-[0.6875rem] text-soft">
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-6 text-sm">
                {p.url && (
                  <a href={p.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 font-medium text-text hover:text-signal">
                    Visit <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </a>
                )}
                {p.related && (
                  <a href={`/work/${p.related}/`} className="inline-flex items-center gap-1.5 font-medium text-text hover:text-signal">
                    Infrastructure write-up <ArrowRight className="size-3.5" aria-hidden="true" />
                  </a>
                )}
                {!p.url && (
                  <a
                    href={`mailto:${site.email}?subject=${encodeURIComponent(`About ${p.name}`)}`}
                    className="inline-flex items-center gap-1.5 text-muted hover:text-signal"
                  >
                    <Mail className="size-3.5" aria-hidden="true" /> Ask about {p.name}
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
