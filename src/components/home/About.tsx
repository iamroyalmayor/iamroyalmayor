const layers = [
  { name: "Applications", detail: "Python · FastAPI · Next.js · PostgreSQL" },
  { name: "Platforms", detail: "Linux · Proxmox · Docker · Ansible" },
  { name: "Networks", detail: "Routing · VLANs · MikroTik · Cisco · Wi-Fi" },
  { name: "Physical", detail: "Cabling · CCTV · VoIP · IPTV · Solar" },
];

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="border-t border-line py-20 md:py-28">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <h2 id="about-title" className="h-section">
            Technology fails at the seams. That&apos;s where I work.
          </h2>
          <figure className="mt-10 overflow-hidden rounded-lg border border-line bg-panel">
            <div className="flex">
              <ol className="flex-1">
                {layers.map((l) => (
                  <li key={l.name} className="border-b border-line px-4 py-3 last:border-0">
                    <span className="block text-sm font-medium">{l.name}</span>
                    <span className="block font-mono text-xs text-muted">{l.detail}</span>
                  </li>
                ))}
              </ol>
              <div className="flex w-10 items-center justify-center border-l border-line bg-raised">
                <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-soft [writing-mode:vertical-rl]">SECURITY</span>
              </div>
            </div>
            <figcaption className="border-t border-line px-4 py-2.5 text-xs text-muted">
              Where I work: every layer, with security running through all of them.
            </figcaption>
          </figure>
        </div>

        <div className="space-y-5 text-[1.0625rem] leading-[1.75] text-soft lg:col-span-6 lg:col-start-7">
          <p>
            Between the network and the server, the app and its users, the system and whoever is trying to break into
            it: that&apos;s where most failures happen, and where I&apos;m most useful.
          </p>
          <p>
            Some days that means configuring VLANs and switch ports; other days it means writing a FastAPI service,
            provisioning virtual machines on Proxmox, or testing an application the way an attacker would.
          </p>
          <p>
            Because I work on both hardware and software, I can follow a problem all the way down the stack instead of
            handing it off at a boundary. A slow application might be a database query, a misconfigured switch, or a
            failing power supply. I would rather find out than guess.
          </p>
          <p>
            I build systems to be operated, not demonstrated: secured, documented, and maintainable by whoever comes
            next. And I keep learning by building: setting something up, breaking it, and setting it up better.
          </p>
        </div>
      </div>
    </section>
  );
}
