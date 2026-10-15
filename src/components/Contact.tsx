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
    <section id="contact" aria-labelledby="contact-title" className="border-t border-rule py-20 md:py-28">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <h2
            id="contact-title"
            className="text-[clamp(2.25rem,4.6vw,3.75rem)] leading-[1.03] font-[820] tracking-[-0.035em]"
          >
            Have a challenging idea? Let&apos;s make it work.
          </h2>
          <p className="mt-6 max-w-[30rem] text-lg text-muted">
            Projects, roles, or a problem you can&apos;t pin down yet. Tell me what you&apos;re dealing with and
            I&apos;ll reply personally.
          </p>

          <div className="mt-10 border-t border-ink">
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-rule py-5">
              <a
                href={`mailto:${site.email}`}
                className="group flex min-w-0 items-center gap-3 rounded-sm font-semibold"
              >
                <Mail className="size-5 shrink-0 text-muted" aria-hidden="true" />
                <span className="truncate text-[1.0625rem] underline decoration-rule-strong underline-offset-4 transition-colors group-hover:text-signal group-hover:decoration-signal sm:text-lg">
                  {site.email}
                </span>
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center gap-1.5 rounded-full border border-rule px-3 py-1.5 text-sm font-semibold text-ink-soft transition-colors hover:border-ink"
              >
                {copied === "done" ? (
                  <Check className="size-4 text-go" aria-hidden="true" />
                ) : (
                  <Copy className="size-4" aria-hidden="true" />
                )}
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
                className="group flex items-center justify-between gap-4 border-b border-rule py-5"
              >
                <span className="flex items-center gap-3">
                  <Icon className="size-5 text-muted" />
                  <span className="font-semibold">{label}</span>
                  <span className="font-mono text-sm text-muted">@{handle}</span>
                </span>
                <ArrowUpRight
                  className="size-5 text-faint transition-[color,transform] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-signal"
                  aria-hidden="true"
                />
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
