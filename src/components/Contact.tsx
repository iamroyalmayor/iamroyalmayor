"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Copy, Mail } from "lucide-react";
import { site } from "@/content/site";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { ContactForm } from "./ContactForm";

export function Contact() {
  const [copied, setCopied] = useState<"idle" | "done" | "failed">("idle");

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied("done");
    } catch {
      setCopied("failed");
    }
    setTimeout(() => setCopied("idle"), 2400);
  }

  const channels = [
    { label: site.socials.github.label, handle: site.socials.github.handle, href: site.socials.github.url, Icon: GithubIcon },
    { label: site.socials.linkedin.label, handle: site.socials.linkedin.handle, href: site.socials.linkedin.url, Icon: LinkedinIcon },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="border-t border-line py-20 md:py-28">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <h2 id="contact-title" className="text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] font-semibold tracking-[-0.04em]">
            Have a challenging idea? Let&apos;s make it work.
          </h2>
          <p className="mt-6 max-w-[30rem] text-lg text-muted">
            A role, a project, or a problem you can&apos;t pin down yet. Tell me what you&apos;re dealing with and I&apos;ll
            reply personally.
          </p>

          <div className="mt-10 overflow-hidden rounded-lg border border-line bg-panel">
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-line px-4 py-4">
              <a href={`mailto:${site.email}`} className="group flex min-w-0 items-center gap-3 rounded-sm font-medium">
                <Mail className="size-[18px] shrink-0 text-muted" aria-hidden="true" />
                <span className="truncate underline decoration-line-strong underline-offset-4 transition-colors group-hover:text-signal group-hover:decoration-signal">
                  {site.email}
                </span>
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center gap-1.5 rounded-md border border-line px-2.5 py-1 font-mono text-xs text-soft transition-colors hover:border-line-strong hover:text-text"
              >
                {copied === "done" ? <Check className="size-3.5 text-ok" aria-hidden="true" /> : <Copy className="size-3.5" aria-hidden="true" />}
                {copied === "done" ? "Copied" : copied === "failed" ? "Copy failed" : "Copy"}
              </button>
              <span className="sr-only" role="status">
                {copied === "done" ? "Email address copied" : copied === "failed" ? "Could not copy; select the address instead" : ""}
              </span>
            </div>
            {channels.map(({ label, handle, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between gap-4 border-b border-line px-4 py-4 transition-colors last:border-0 hover:bg-raised"
              >
                <span className="flex items-center gap-3">
                  <Icon className="size-[18px] text-muted" />
                  <span className="font-medium">{label}</span>
                  <span className="font-mono text-xs text-muted">@{handle}</span>
                </span>
                <ArrowUpRight className="size-4 text-faint transition-colors group-hover:text-signal" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
