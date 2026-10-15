// Products Ademola builds. Add `url` / `repo` when public; set `image` to a screenshot in /public/products/.

export type Product = {
  id: string;
  name: string;
  summary: string;
  tags: string[];
  stage?: string;
  url?: string;
  repo?: string;
  image?: string;
  related?: string; // slug of a related engineering project page
};

export const products: Product[] = [
  {
    id: "kiraosint",
    name: "KiraOSINT",
    summary:
      "An intelligence and security investigation platform combining OSINT, SOC workflows, digital evidence, intelligence graphs, and AI-assisted analysis.",
    tags: ["OSINT", "SOC workflows", "Intelligence graph", "Digital evidence"],
  },
  {
    id: "kiracall",
    name: "KiraCall",
    summary:
      "A business communication and calling platform built for contact-centre and browser-based calling workflows.",
    tags: ["Browser calling", "Contact centre", "VoIP"],
  },
  {
    id: "wellstv",
    name: "WellsTV",
    summary:
      "A hotel IPTV application that brings entertainment, guest services, and property-management integration onto the room TV.",
    tags: ["IPTV", "Guest services", "PMS integration"],
  },
  {
    id: "proxmox-cloud",
    name: "Proxmox Cloud Platform",
    summary:
      "A self-service hosting platform concept on standalone Proxmox hosts: automated provisioning and customer server management.",
    tags: ["Proxmox VE", "Provisioning", "Self-service"],
    stage: "Concept",
    related: "proxmox-private-cloud",
  },
];
