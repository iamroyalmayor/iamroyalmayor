"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { nav, site } from "@/content/site";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [current, setCurrent] = useState<string>("#top");
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mark the section in view so the nav doubles as a "you are here" indicator.
  useEffect(() => {
    const sections = nav
      .map((n) => document.querySelector<HTMLElement>(n.href))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setCurrent(`#${visible[visible.length - 1].target.id}`);
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
    const onResize = () => window.innerWidth >= 768 && setOpen(false);
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
        scrolled || open ? "border-rule bg-paper/95 backdrop-blur-sm" : "border-transparent bg-paper"
      }`}
    >
      <div className="shell flex h-16 items-center justify-between gap-6">
        <a href="#top" className="group flex items-center gap-2.5 rounded-sm" aria-label={`${site.name}, back to top`}>
          <span
            aria-hidden="true"
            className="grid size-8 place-items-center rounded-full border-[2.5px] border-ink pt-[2px] font-mono text-[13px] font-semibold transition-colors group-hover:border-signal group-hover:bg-signal group-hover:text-white"
          >
            A
          </span>
          <span className="text-[1.0625rem] font-bold tracking-[-0.01em]">{site.name}</span>
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={current === item.href ? "location" : undefined}
                  className="relative rounded-sm px-3 py-2 text-[0.9375rem] font-medium text-muted transition-colors hover:text-ink aria-[current]:text-ink"
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-3 -bottom-0.5 h-[2px] origin-left bg-signal transition-transform duration-300 ${
                      current === item.href ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-[0.9375rem] font-semibold text-white transition-colors hover:bg-signal sm:inline-flex"
          >
            Let&apos;s Talk <ArrowRight className="size-4" aria-hidden="true" />
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="grid size-10 place-items-center rounded-full border border-rule bg-card text-ink md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <nav
        id="mobile-menu"
        aria-label="Mobile"
        hidden={!open}
        className="border-t border-rule bg-paper md:hidden"
      >
        <ul className="shell flex flex-col py-3">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-b border-rule py-3.5 text-lg font-semibold"
              >
                {item.label}
                <ArrowRight className="size-4 text-faint" aria-hidden="true" />
              </a>
            </li>
          ))}
          <li className="pt-4 pb-2">
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 font-semibold text-white"
            >
              Let&apos;s Talk <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
