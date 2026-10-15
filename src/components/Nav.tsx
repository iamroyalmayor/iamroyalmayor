"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { nav, site } from "@/content/site";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [current, setCurrent] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // On the home page, mark the section in view. Project pages have no matching sections.
  useEffect(() => {
    const sections = nav.map((n) => document.getElementById(n.id)).filter((el): el is HTMLElement => el !== null);
    if (!sections.length) {
      if (window.location.pathname.startsWith("/work")) setCurrent("work");
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setCurrent(visible[visible.length - 1].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onResize = () => window.innerWidth >= 900 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors duration-300 ${
        scrolled || open ? "border-line bg-void/95 backdrop-blur-sm" : "border-transparent bg-void"
      }`}
    >
      <div className="shell flex h-16 items-center justify-between gap-6">
        <a href="/#top" className="flex items-center gap-3 rounded-sm" aria-label={`${site.name}, home`}>
          <span aria-hidden="true" className="grid size-8 place-items-center rounded-md border border-line-strong bg-panel font-mono text-sm font-semibold text-text">
            A
          </span>
          <span className="leading-tight">
            <span className="block text-[0.9375rem] font-semibold tracking-[-0.01em]">{site.name}</span>
            <span className="block font-mono text-[0.6875rem] text-muted">{site.role}</span>
          </span>
        </a>

        <nav aria-label="Primary" className="hidden min-[900px]:block">
          <ul className="flex items-center gap-0.5">
            {nav.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  aria-current={current === item.id ? "location" : undefined}
                  className="rounded-md px-3 py-2 text-sm text-muted transition-colors hover:bg-panel hover:text-text aria-[current]:bg-panel aria-[current]:text-text"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="/#contact"
            className="hidden items-center gap-1.5 rounded-md bg-text px-3.5 py-2 text-sm font-semibold text-void transition-colors hover:bg-white sm:inline-flex"
          >
            Let&apos;s Talk <ArrowRight className="size-4" aria-hidden="true" />
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="grid size-10 place-items-center rounded-md border border-line bg-panel text-text min-[900px]:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <nav id="mobile-menu" aria-label="Mobile" hidden={!open} className="border-t border-line bg-void min-[900px]:hidden">
        <ul className="shell flex flex-col py-3">
          {nav.map((item) => (
            <li key={item.id}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-b border-line py-3.5 text-lg font-medium"
              >
                {item.label}
                <ArrowRight className="size-4 text-faint" aria-hidden="true" />
              </a>
            </li>
          ))}
          <li className="pt-4 pb-2">
            <a
              href="/#contact"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 rounded-md bg-text px-5 py-3 font-semibold text-void"
            >
              Let&apos;s Talk <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
