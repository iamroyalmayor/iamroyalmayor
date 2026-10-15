const steps = [
  {
    title: "Understand the problem",
    body: "Find out what has to work, for whom, and under which constraints: budget, site, existing systems, and risk.",
  },
  {
    title: "Design the solution",
    body: "Plan the architecture end to end, from network layout and hardware to services, data, and access.",
  },
  {
    title: "Build and integrate",
    body: "Build it and connect it to what's already there, so the new system fits the building and the business.",
  },
  {
    title: "Test, secure, and improve",
    body: "Test under real conditions, close the gaps, document everything, and keep refining once it's live.",
  },
];

export function Approach() {
  return (
    <section aria-labelledby="approach-title" className="border-t border-line py-20 md:py-28">
      <div className="shell">
        <h2 id="approach-title" className="h-section">
          How I work
        </h2>
        <ol className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="bg-panel p-6">
              <span className="tabular font-mono text-sm text-muted">
                <span className="sr-only">Step </span>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-6 text-lg font-semibold tracking-[-0.02em]">{s.title}</h3>
              <p className="mt-2 text-[0.9375rem] text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
