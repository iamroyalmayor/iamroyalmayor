import { site } from "@/content/site";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { Year } from "./Year";

export function Footer() {
  const social = "grid size-10 place-items-center rounded-md border border-line bg-panel text-soft transition-colors hover:border-line-strong hover:text-text";
  return (
    <footer className="border-t border-line">
      <div className="shell flex flex-col gap-8 py-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="flex items-center gap-3 font-semibold">
            <span aria-hidden="true" className="grid size-8 place-items-center rounded-md border border-line-strong bg-panel font-mono text-sm">
              A
            </span>
            {site.name}
          </p>
          <p className="mt-3 max-w-[32rem] text-sm text-muted">{site.description}</p>
        </div>
        <div className="flex flex-col gap-4 md:items-end">
          <ul className="flex items-center gap-2">
            <li>
              <a href={site.socials.github.url} target="_blank" rel="noreferrer" aria-label="GitHub" className={social}>
                <GithubIcon className="size-[18px]" />
              </a>
            </li>
            <li>
              <a href={site.socials.linkedin.url} target="_blank" rel="noreferrer" aria-label="LinkedIn" className={social}>
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
