import { site } from "@/content/site";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { Year } from "./Year";

export function Footer() {
  return (
    <footer className="border-t border-ink bg-paper">
      <div className="shell flex flex-col gap-8 py-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="flex items-center gap-2.5 text-lg font-bold">
            <span
              aria-hidden="true"
              className="grid size-8 place-items-center rounded-full border-[2.5px] border-ink pt-[2px] font-mono text-[13px] font-semibold"
            >
              A
            </span>
            {site.name}
          </p>
          <p className="mt-3 max-w-[30rem] text-[0.9375rem] text-muted">{site.description}</p>
        </div>
        <div className="flex flex-col gap-4 md:items-end">
          <ul className="flex items-center gap-2">
            <li>
              <a
                href={site.socials.github.url}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="grid size-10 place-items-center rounded-full border border-rule bg-card text-ink-soft transition-colors hover:border-ink hover:text-ink"
              >
                <GithubIcon className="size-[18px]" />
              </a>
            </li>
            <li>
              <a
                href={site.socials.linkedin.url}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="grid size-10 place-items-center rounded-full border border-rule bg-card text-ink-soft transition-colors hover:border-ink hover:text-ink"
              >
                <LinkedinIcon className="size-[18px]" />
              </a>
            </li>
          </ul>
          <p className="font-mono text-xs text-muted">
            © <Year /> {site.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
