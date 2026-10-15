// Personal details. Edit this file to change anything about you that appears on the site.

export const site = {
  name: "Ademola",
  role: "Infrastructure & Security Engineer",
  // Shown in the hero's status panel. Set `available: false` to switch to a neutral state.
  status: {
    available: true,
    label: "Available for projects and full-time roles",
  },
  headline: "I build, secure, and connect technology that works in the real world.",
  intro:
    "I'm Ademola, a technology engineer working across systems administration, network engineering, DevOps, cloud infrastructure, and cybersecurity. I design the network, run the servers, ship the application, and lock it down.",
  description:
    "Engineer across systems administration, network engineering, DevOps, cloud infrastructure, and cybersecurity.",
  email: "ilesanmisulaimon19@gmail.com",
  socials: {
    github: { label: "GitHub", handle: "iamroyalmayor", url: "https://github.com/iamroyalmayor" },
    linkedin: {
      label: "LinkedIn",
      handle: "iamroyalmayor",
      url: "https://www.linkedin.com/in/iamroyalmayor",
    },
  },
  // Set this once the site has a domain, e.g. "https://ademola.dev". Used for SEO metadata.
  url: "",
} as const;

export const nav = [
  { label: "Home", href: "/#top", id: "top" },
  { label: "Capabilities", href: "/#capabilities", id: "capabilities" },
  { label: "Work", href: "/#work", id: "work" },
  { label: "Products", href: "/#products", id: "products" },
  { label: "About", href: "/#about", id: "about" },
  { label: "Contact", href: "/#contact", id: "contact" },
] as const;
