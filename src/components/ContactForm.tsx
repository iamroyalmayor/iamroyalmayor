"use client";

import { useState, type FormEvent } from "react";
import { Send, CircleCheck, CircleAlert } from "lucide-react";
import { site } from "@/content/site";

// No backend: the form composes an email in the visitor's own mail app. It says so up
// front, and never claims a message was "sent".
type Errors = Partial<Record<"name" | "email" | "message", string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [opened, setOpened] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const next: Errors = {};
    if (!name) next.name = "Add your name so I know who's writing.";
    if (!email) next.email = "Add your email so I can reply.";
    else if (!emailPattern.test(email)) next.email = "That email looks incomplete. Check it and try again.";
    if (message.length < 10) next.message = "Tell me a little more: a sentence or two about the project.";
    setErrors(next);

    if (Object.keys(next).length) {
      const first = Object.keys(next)[0];
      e.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      setOpened(false);
      return;
    }

    const subject = `Project enquiry from ${name}`;
    const body = `${message}\n\n${name}\n${email}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  }

  const field =
    "mt-2 block w-full rounded-md border bg-void px-3.5 py-2.5 text-text placeholder:text-muted transition-colors focus:border-signal focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-0";

  return (
    <form noValidate onSubmit={onSubmit} className="rounded-lg border border-line bg-panel p-6 sm:p-8" aria-describedby="form-note">
      <div className="grid gap-5 sm:grid-cols-2">
        {(["name", "email"] as const).map((key) => (
          <div key={key}>
            <label htmlFor={`cf-${key}`} className="text-sm font-medium text-soft">
              {key === "name" ? "Name" : "Email"}
            </label>
            <input
              id={`cf-${key}`}
              name={key}
              type={key === "email" ? "email" : "text"}
              autoComplete={key}
              aria-invalid={!!errors[key]}
              aria-describedby={errors[key] ? `cf-${key}-error` : undefined}
              className={`${field} ${errors[key] ? "border-crit" : "border-line-strong"}`}
            />
            {errors[key] && (
              <p id={`cf-${key}-error`} className="mt-1.5 flex items-start gap-1.5 text-sm text-crit">
                <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" /> {errors[key]}
              </p>
            )}
          </div>
        ))}
      </div>
      <div className="mt-5">
        <label htmlFor="cf-message" className="text-sm font-medium text-soft">
          What are you working on?
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={5}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "cf-message-error" : undefined}
          placeholder="A network that needs rebuilding, an app that needs securing, an idea that needs an engineer…"
          className={`${field} resize-y ${errors.message ? "border-crit" : "border-line-strong"}`}
        />
        {errors.message && (
          <p id="cf-message-error" className="mt-1.5 flex items-start gap-1.5 text-sm text-crit">
            <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" /> {errors.message}
          </p>
        )}
      </div>
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p id="form-note" className="text-sm text-muted">
          Opens your email app with the message ready to send. Nothing is stored on this site.
        </p>
        <button
          type="submit"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-text px-5 py-3 font-semibold text-void transition-colors hover:bg-white"
        >
          Write the email <Send className="size-4" aria-hidden="true" />
        </button>
      </div>
      <p role="status" className="text-sm">
        {opened && (
          <span className="mt-5 flex items-start gap-2 rounded-md border border-ok/40 bg-ok-dim px-4 py-3 text-soft">
            <CircleCheck className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            <span>
              Your email app should now be open with the message drafted. If nothing happened, email me directly at{" "}
              <a href={`mailto:${site.email}`} className="font-semibold underline">
                {site.email}
              </a>
              .
            </span>
          </span>
        )}
      </p>
    </form>
  );
}
