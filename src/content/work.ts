// Infrastructure & security project pages. Each entry renders /work/<slug>/.
//
// HOW TO MAINTAIN THIS FILE
// - `classification`: "production" (real systems for real users), "personal" (your own
//   project, self-hosted or in development), or "lab" (built to learn or test).
// - `reviewed`: while false, the page shows a "draft write-up" notice. The overview,
//   architecture, technologies, implementation, and controls below are written from the
//   project's scope. Correct anything that doesn't match what you actually built, then
//   set `reviewed: true`.
// - `evidence`, `challenges`, and `outcomes` start empty on purpose: they are claims, and
//   only you can supply them. Empty sections show a "documentation in progress" state.
//   See /evidence-kit/ for every evidence block type rendered with sample data.
// - `diagramImage` replaces the generated diagram with your own export (put the file
//   in /public/work/<slug>/).

export type Domain = "sysadmin" | "network" | "devops" | "cloud" | "security";
export type Classification = "production" | "personal" | "lab";

export const domains: Record<Domain, { label: string; short: string }> = {
  sysadmin: { label: "Systems Administration", short: "SysAdmin" },
  network: { label: "Network Engineering", short: "Network" },
  devops: { label: "DevOps", short: "DevOps" },
  cloud: { label: "Cloud Infrastructure", short: "Cloud" },
  security: { label: "Cybersecurity", short: "Security" },
};

export const classifications: Record<Classification, { label: string; description: string }> = {
  production: { label: "Production", description: "Real systems serving real users" },
  personal: { label: "Personal project", description: "My own build, self-hosted or in development" },
  lab: { label: "Lab", description: "Built to learn, test, or reproduce a scenario" },
};

export type NodeKind =
  | "internet"
  | "router"
  | "firewall"
  | "switch"
  | "wifi"
  | "server"
  | "vm"
  | "container"
  | "database"
  | "storage"
  | "client"
  | "service"
  | "sensor"
  | "camera"
  | "phone"
  | "tv"
  | "repo"
  | "cloud";

export type Diagram = {
  zones: { id: string; label: string; tone?: "untrusted" | "edge" | "internal" | "restricted" | "mgmt" }[];
  nodes: { id: string; label: string; sub?: string; zone: string; kind: NodeKind }[];
  links: { from: string; to: string; label?: string; dashed?: boolean }[];
};

export type Evidence =
  | { type: "terminal"; title: string; caption?: string; prompt?: string; command: string; output?: string }
  | { type: "config"; title: string; caption?: string; language?: string; code: string }
  | {
      type: "chart";
      title: string;
      caption?: string;
      unit: string;
      xLabels: string[];
      series: { name: string; values: number[] }[];
      threshold?: { value: number; label: string };
    }
  | { type: "status"; title: string; caption?: string; items: { name: string; state: "ok" | "warn" | "crit"; detail: string }[] }
  | { type: "screenshot"; title: string; caption?: string; src: string; alt: string }
  | { type: "document"; title: string; caption?: string; sections: string[]; href?: string };

export type WorkProject = {
  slug: string;
  title: string;
  short: string;
  classification: Classification;
  domains: Domain[];
  reviewed: boolean;
  overview: string[];
  diagram: Diagram;
  diagramCaption: string;
  diagramImage?: { src: string; alt: string };
  technologies: { name: string; role: string }[];
  implementation: { title: string; detail: string }[];
  controls: { title: string; detail: string }[];
  evidence: Evidence[];
  challenges: { problem: string; resolution: string }[];
  outcomes: string[];
  repo?: string;
  writeup?: string;
};

export const work: WorkProject[] = [
  {
    slug: "enterprise-network-vlan-segmentation",
    title: "Enterprise Network Architecture & VLAN Segmentation",
    short: "One physical network, separated into isolated segments for staff, guests, cameras, phones, and TV.",
    classification: "production",
    domains: ["network", "security"],
    reviewed: false,
    overview: [
      "Buildings that run staff systems, guest Wi-Fi, CCTV, VoIP, and IPTV on one flat network give every device a path to every other device. A guest laptop can see the camera recorder; a broadcast storm on the TV network slows the phones.",
      "This project designs the network as separate VLANs, each with its own addressing, DHCP scope, and access policy, routed and filtered at a single core so that every service gets the isolation and capacity it needs.",
    ],
    diagram: {
      zones: [
        { id: "edge", label: "Edge", tone: "edge" },
        { id: "core", label: "Core", tone: "internal" },
        { id: "access", label: "Access", tone: "internal" },
        { id: "segments", label: "VLAN segments", tone: "restricted" },
      ],
      nodes: [
        { id: "isp", label: "ISP uplink", zone: "edge", kind: "internet" },
        { id: "rtr", label: "Edge router", sub: "NAT · firewall", zone: "edge", kind: "router" },
        { id: "core", label: "Core switch", sub: "Inter-VLAN routing", zone: "core", kind: "switch" },
        { id: "mgmt", label: "Management", sub: "VLAN 99", zone: "core", kind: "client" },
        { id: "acc1", label: "Access switch", sub: "Floors / rooms", zone: "access", kind: "switch" },
        { id: "ap", label: "Wi-Fi APs", sub: "SSID → VLAN", zone: "access", kind: "wifi" },
        { id: "v10", label: "Staff", sub: "VLAN 10", zone: "segments", kind: "client" },
        { id: "v20", label: "Guest Wi-Fi", sub: "VLAN 20", zone: "segments", kind: "wifi" },
        { id: "v30", label: "CCTV", sub: "VLAN 30", zone: "segments", kind: "camera" },
        { id: "v40", label: "VoIP", sub: "VLAN 40", zone: "segments", kind: "phone" },
        { id: "v50", label: "IPTV", sub: "VLAN 50", zone: "segments", kind: "tv" },
      ],
      links: [
        { from: "isp", to: "rtr" },
        { from: "rtr", to: "core", label: "uplink" },
        { from: "mgmt", to: "core", dashed: true },
        { from: "core", to: "acc1", label: "802.1Q trunk" },
        { from: "core", to: "ap", label: "802.1Q trunk" },
        { from: "acc1", to: "v10" },
        { from: "acc1", to: "v30" },
        { from: "acc1", to: "v40" },
        { from: "acc1", to: "v50" },
        { from: "ap", to: "v20" },
      ],
    },
    diagramCaption: "Logical topology: one core routes between segments; access switches and APs carry tagged VLANs.",
    technologies: [
      { name: "MikroTik RouterOS", role: "Edge routing, NAT, firewall filter rules" },
      { name: "Cisco switching", role: "Access ports, 802.1Q trunks, port security" },
      { name: "802.1Q VLANs", role: "Logical separation of each service" },
      { name: "DHCP / IP addressing plan", role: "One subnet and scope per segment" },
      { name: "Wireless SSID mapping", role: "Guest and staff SSIDs bound to their VLANs" },
    ],
    implementation: [
      { title: "Survey", detail: "Inventory existing cabling, switches, access points, and every service on the network." },
      { title: "Addressing plan", detail: "Assign a VLAN ID, subnet, gateway, and DHCP scope to each service, plus a management VLAN." },
      { title: "Trunks and access ports", detail: "Tag VLANs on uplinks between core, access switches, and APs; set access ports per device type." },
      { title: "Inter-VLAN policy", detail: "Route at the core and write firewall rules that allow only the flows each service needs." },
      { title: "Documentation", detail: "Record the port map, addressing table, and rule set so the network can be maintained by others." },
    ],
    controls: [
      { title: "Guest isolation", detail: "Guest VLAN reaches the Internet only, with no route to internal subnets." },
      { title: "CCTV containment", detail: "Cameras are reachable only from the recorder and management hosts." },
      { title: "Dedicated management VLAN", detail: "Switch and router administration is reachable only from the management segment." },
      { title: "Default-deny between segments", detail: "Inter-VLAN traffic is denied unless a rule explicitly allows it." },
      { title: "Unused ports disabled", detail: "Ports with no assigned device are shut or placed in an unused VLAN." },
    ],
    evidence: [],
    challenges: [],
    outcomes: [],
  },
  {
    slug: "linux-server-administration-hardening",
    title: "Linux Server Administration & Hardening",
    short: "Building, running, and hardening Linux servers that host applications and services.",
    classification: "production",
    domains: ["sysadmin", "security"],
    reviewed: false,
    overview: [
      "A server is only as trustworthy as its least-maintained setting. This project covers the full life of a Linux server, from provisioning and service configuration to patching, backups, and day-to-day operation, with a hardening baseline applied from first boot.",
    ],
    diagram: {
      zones: [
        { id: "net", label: "Internet", tone: "untrusted" },
        { id: "host", label: "Linux host", tone: "internal" },
        { id: "ops", label: "Operations", tone: "mgmt" },
      ],
      nodes: [
        { id: "users", label: "Users", zone: "net", kind: "client" },
        { id: "admin", label: "Admin", sub: "SSH key", zone: "net", kind: "client" },
        { id: "fw", label: "Host firewall", sub: "Default deny", zone: "host", kind: "firewall" },
        { id: "web", label: "Reverse proxy", sub: "TLS termination", zone: "host", kind: "service" },
        { id: "app", label: "Application", sub: "systemd service", zone: "host", kind: "service" },
        { id: "db", label: "Database", sub: "Local only", zone: "host", kind: "database" },
        { id: "logs", label: "Logs", sub: "journald · auth.log", zone: "ops", kind: "storage" },
        { id: "backup", label: "Backups", sub: "Off-host copy", zone: "ops", kind: "storage" },
      ],
      links: [
        { from: "users", to: "fw", label: "443" },
        { from: "admin", to: "fw", label: "22 · key only" },
        { from: "fw", to: "web" },
        { from: "web", to: "app" },
        { from: "app", to: "db" },
        { from: "app", to: "logs", dashed: true },
        { from: "db", to: "backup", dashed: true },
      ],
    },
    diagramCaption: "Single-host layout: only the proxy and SSH are exposed; the database listens locally.",
    technologies: [
      { name: "Linux (Debian / Ubuntu)", role: "Server operating system" },
      { name: "OpenSSH", role: "Key-based remote administration" },
      { name: "UFW / nftables", role: "Host firewall" },
      { name: "systemd", role: "Service management, restarts, logging" },
      { name: "Nginx", role: "Reverse proxy and TLS termination" },
      { name: "Fail2ban", role: "Brute-force protection" },
    ],
    implementation: [
      { title: "Baseline build", detail: "Minimal install, named admin account, time sync, and hostname/DNS configuration." },
      { title: "Access", detail: "SSH keys only, root login disabled, sudo granted per role." },
      { title: "Services", detail: "Applications run as unprivileged service users under systemd with restart policies." },
      { title: "Patching", detail: "Automatic security updates, with scheduled windows for kernel and major upgrades." },
      { title: "Backup and restore", detail: "Scheduled off-host backups of data and configuration, with restores tested." },
    ],
    controls: [
      { title: "Key-only SSH", detail: "Password authentication and root login disabled." },
      { title: "Least privilege", detail: "Services run as dedicated non-login users; sudo is scoped." },
      { title: "Minimal exposure", detail: "Firewall denies inbound by default; only required ports are open." },
      { title: "Brute-force throttling", detail: "Repeated failed logins are banned automatically." },
      { title: "Patch currency", detail: "Security updates are applied automatically." },
      { title: "Audit trail", detail: "Authentication and service logs are retained for investigation." },
    ],
    evidence: [],
    challenges: [],
    outcomes: [],
  },
  {
    slug: "proxmox-private-cloud",
    title: "Proxmox Virtualization & Private Cloud Infrastructure",
    short: "Standalone Proxmox hosts turned into a private cloud with templates, isolated networks, and backups.",
    classification: "personal",
    domains: ["cloud", "sysadmin"],
    reviewed: false,
    overview: [
      "The infrastructure layer behind the Proxmox Cloud Platform concept: Proxmox VE hosts that provision virtual machines from templates, give each tenant an isolated network, and back everything up on a schedule.",
      "The goal is self-service hosting on hardware you own, without hand-building every server.",
    ],
    diagram: {
      zones: [
        { id: "front", label: "Customer access", tone: "untrusted" },
        { id: "control", label: "Control plane", tone: "mgmt" },
        { id: "hosts", label: "Compute", tone: "internal" },
        { id: "data", label: "Storage", tone: "restricted" },
      ],
      nodes: [
        { id: "portal", label: "Self-service portal", zone: "front", kind: "client" },
        { id: "api", label: "Provisioning service", sub: "Proxmox API", zone: "control", kind: "service" },
        { id: "tmpl", label: "VM templates", sub: "cloud-init", zone: "control", kind: "storage" },
        { id: "pve1", label: "pve-01", sub: "Proxmox VE", zone: "hosts", kind: "server" },
        { id: "pve2", label: "pve-02", sub: "Proxmox VE", zone: "hosts", kind: "server" },
        { id: "vms", label: "Tenant VMs", sub: "Isolated bridges", zone: "hosts", kind: "vm" },
        { id: "bk", label: "Backup store", sub: "Scheduled vzdump", zone: "data", kind: "storage" },
      ],
      links: [
        { from: "portal", to: "api", label: "HTTPS" },
        { from: "api", to: "pve1", label: "API token" },
        { from: "api", to: "pve2", label: "API token" },
        { from: "tmpl", to: "pve1", dashed: true },
        { from: "pve1", to: "vms" },
        { from: "pve2", to: "vms" },
        { from: "vms", to: "bk", dashed: true },
      ],
    },
    diagramCaption: "Provisioning flow: the portal calls a service that drives standalone hosts through the Proxmox API.",
    technologies: [
      { name: "Proxmox VE", role: "Hypervisor and host management" },
      { name: "KVM / QEMU and LXC", role: "Virtual machines and containers" },
      { name: "cloud-init", role: "First-boot configuration of templated VMs" },
      { name: "Proxmox API", role: "Automated create / start / stop / delete" },
      { name: "Linux bridges and VLANs", role: "Per-tenant network isolation" },
      { name: "vzdump", role: "Scheduled VM backups" },
    ],
    implementation: [
      { title: "Host build", detail: "Install and configure Proxmox VE hosts with storage pools and network bridges." },
      { title: "Templates", detail: "Golden VM templates with cloud-init so new servers boot configured." },
      { title: "Network isolation", detail: "Each tenant's VMs attach to their own bridge or VLAN." },
      { title: "Automation", detail: "Provisioning is driven through scoped API tokens rather than the web console." },
      { title: "Backups", detail: "Scheduled backups with retention, stored apart from the compute hosts." },
    ],
    controls: [
      { title: "Scoped API tokens", detail: "Automation uses tokens limited to the permissions it needs." },
      { title: "Tenant isolation", detail: "Tenant networks cannot reach each other or the management network." },
      { title: "Management plane separation", detail: "The Proxmox web UI and API are not exposed publicly." },
      { title: "Backup separation", detail: "Backups live on storage separate from the hosts they protect." },
    ],
    evidence: [],
    challenges: [],
    outcomes: [],
  },
  {
    slug: "network-monitoring-alerting",
    title: "Network Monitoring & Alerting",
    short: "Knowing a link or service is down before the users call: metrics, dashboards, and alerts.",
    classification: "lab",
    domains: ["network", "sysadmin"],
    reviewed: false,
    overview: [
      "A network without monitoring is diagnosed by complaints. This project collects availability and performance data from routers, switches, and servers, puts it on dashboards, and sends alerts when thresholds are crossed.",
    ],
    diagram: {
      zones: [
        { id: "targets", label: "Monitored", tone: "internal" },
        { id: "collect", label: "Collection", tone: "mgmt" },
        { id: "notify", label: "Visibility", tone: "edge" },
      ],
      nodes: [
        { id: "rtr", label: "Routers", sub: "SNMP", zone: "targets", kind: "router" },
        { id: "sw", label: "Switches", sub: "SNMP", zone: "targets", kind: "switch" },
        { id: "srv", label: "Servers", sub: "node exporter", zone: "targets", kind: "server" },
        { id: "prom", label: "Prometheus", sub: "Scrape · store", zone: "collect", kind: "service" },
        { id: "am", label: "Alertmanager", sub: "Rules · routing", zone: "collect", kind: "service" },
        { id: "graf", label: "Grafana", sub: "Dashboards", zone: "notify", kind: "client" },
        { id: "chan", label: "Notifications", sub: "Email / chat", zone: "notify", kind: "phone" },
      ],
      links: [
        { from: "rtr", to: "prom", label: "SNMP" },
        { from: "sw", to: "prom", label: "SNMP" },
        { from: "srv", to: "prom", label: "metrics" },
        { from: "prom", to: "am", dashed: true },
        { from: "prom", to: "graf" },
        { from: "am", to: "chan" },
      ],
    },
    diagramCaption: "Pull-based monitoring: one collector scrapes devices; alerts route to a notification channel.",
    technologies: [
      { name: "SNMP", role: "Interface, uptime, and resource counters from network gear" },
      { name: "Prometheus", role: "Metric collection and storage" },
      { name: "node exporter", role: "Host CPU, memory, disk, and network metrics" },
      { name: "Alertmanager", role: "Alert rules, grouping, and routing" },
      { name: "Grafana", role: "Dashboards" },
    ],
    implementation: [
      { title: "Inventory", detail: "List devices and services, and decide what 'healthy' means for each." },
      { title: "Collection", detail: "Enable SNMP on network devices and exporters on servers; scrape on a fixed interval." },
      { title: "Dashboards", detail: "Per-site and per-device views: availability, bandwidth, errors, and resource use." },
      { title: "Alert rules", detail: "Thresholds for down links, high utilisation, disk space, and failed services." },
      { title: "Tuning", detail: "Adjust thresholds and grouping so alerts are actionable, not noise." },
    ],
    controls: [
      { title: "Read-only SNMP", detail: "SNMP credentials are read-only and restricted to the collector's address." },
      { title: "Monitoring on the management network", detail: "Collectors and dashboards are not exposed publicly." },
      { title: "Authenticated dashboards", detail: "Dashboard access requires login." },
    ],
    evidence: [],
    challenges: [],
    outcomes: [],
  },
  {
    slug: "wazuh-siem-security-operations-lab",
    title: "Wazuh SIEM & Security Operations Lab",
    short: "A working SOC stack: agents on endpoints, centralised detection, and alerts triaged like real incidents.",
    classification: "lab",
    domains: ["security"],
    reviewed: false,
    overview: [
      "A security operations lab built around Wazuh. Endpoints ship logs and integrity data to a central manager, detection rules raise alerts, and alerts are investigated and documented the way a SOC analyst would.",
    ],
    diagram: {
      zones: [
        { id: "endpoints", label: "Endpoints", tone: "internal" },
        { id: "siem", label: "Wazuh stack", tone: "mgmt" },
        { id: "analyst", label: "Analyst", tone: "edge" },
        { id: "attack", label: "Test traffic", tone: "untrusted" },
      ],
      nodes: [
        { id: "lin", label: "Linux server", sub: "Wazuh agent", zone: "endpoints", kind: "server" },
        { id: "win", label: "Windows host", sub: "Wazuh agent", zone: "endpoints", kind: "client" },
        { id: "mgr", label: "Wazuh manager", sub: "Decoders · rules", zone: "siem", kind: "service" },
        { id: "idx", label: "Indexer", sub: "Alert storage", zone: "siem", kind: "database" },
        { id: "dash", label: "Dashboard", sub: "Triage", zone: "analyst", kind: "client" },
        { id: "atk", label: "Attacker VM", sub: "Simulated activity", zone: "attack", kind: "vm" },
      ],
      links: [
        { from: "lin", to: "mgr", label: "1514/tcp" },
        { from: "win", to: "mgr", label: "1514/tcp" },
        { from: "mgr", to: "idx" },
        { from: "idx", to: "dash" },
        { from: "atk", to: "lin", dashed: true, label: "test" },
      ],
    },
    diagramCaption: "Agents report to the manager; a separate attacker VM generates activity for detection testing.",
    technologies: [
      { name: "Wazuh manager", role: "Log analysis, decoders, and detection rules" },
      { name: "Wazuh indexer and dashboard", role: "Alert storage, search, and triage" },
      { name: "Wazuh agents", role: "Log collection and file integrity monitoring on endpoints" },
      { name: "Sysmon", role: "Detailed Windows process and network telemetry" },
      { name: "MITRE ATT&CK", role: "Mapping detections to adversary techniques" },
    ],
    implementation: [
      { title: "Deploy the stack", detail: "Install manager, indexer, and dashboard on an isolated lab network." },
      { title: "Enrol endpoints", detail: "Install agents on Linux and Windows hosts and confirm events arrive." },
      { title: "Tune detection", detail: "Enable file integrity monitoring, vulnerability detection, and custom rules." },
      { title: "Simulate", detail: "Generate brute-force, privilege-escalation, and persistence activity from a test VM." },
      { title: "Triage", detail: "Investigate each alert, map it to ATT&CK, and record findings as an incident note." },
    ],
    controls: [
      { title: "Lab isolation", detail: "The lab network has no route to production systems." },
      { title: "Encrypted agent traffic", detail: "Agents register with keys and communicate over encrypted channels." },
      { title: "File integrity monitoring", detail: "Changes to critical system paths raise alerts." },
      { title: "Detection coverage", detail: "Rules map to specific ATT&CK techniques so gaps are visible." },
    ],
    evidence: [],
    challenges: [],
    outcomes: [],
  },
  {
    slug: "vulnerability-assessment-remediation",
    title: "Vulnerability Assessment & Remediation",
    short: "Finding weaknesses, ranking them by real risk, fixing them, and proving the fix with a re-scan.",
    classification: "lab",
    domains: ["security"],
    reviewed: false,
    overview: [
      "Scanning is the easy part. This project follows the whole cycle: discover what is on the network, scan it for known weaknesses, rank findings by actual risk rather than raw score, remediate, and verify with a second scan.",
    ],
    diagram: {
      zones: [
        { id: "scan", label: "Assessment", tone: "mgmt" },
        { id: "targets", label: "Scope", tone: "internal" },
        { id: "report", label: "Remediation", tone: "edge" },
      ],
      nodes: [
        { id: "nmap", label: "Discovery", sub: "Nmap", zone: "scan", kind: "service" },
        { id: "gvm", label: "Vuln scanner", sub: "Greenbone / OpenVAS", zone: "scan", kind: "service" },
        { id: "srv", label: "Servers", zone: "targets", kind: "server" },
        { id: "web", label: "Web apps", zone: "targets", kind: "service" },
        { id: "net", label: "Network devices", zone: "targets", kind: "router" },
        { id: "rep", label: "Findings register", sub: "Risk-ranked", zone: "report", kind: "storage" },
        { id: "fix", label: "Fix & re-scan", zone: "report", kind: "client" },
      ],
      links: [
        { from: "nmap", to: "srv" },
        { from: "nmap", to: "net" },
        { from: "gvm", to: "web" },
        { from: "srv", to: "rep", dashed: true },
        { from: "web", to: "rep", dashed: true },
        { from: "net", to: "rep", dashed: true },
        { from: "rep", to: "fix" },
      ],
    },
    diagramCaption: "Assessment loop: discover, scan, register findings, remediate, verify.",
    technologies: [
      { name: "Nmap", role: "Host, port, and service discovery" },
      { name: "Greenbone / OpenVAS", role: "Authenticated and unauthenticated vulnerability scanning" },
      { name: "Nikto", role: "Web server misconfiguration checks" },
      { name: "CVSS", role: "Baseline severity, adjusted for exposure and context" },
    ],
    implementation: [
      { title: "Scope", detail: "Agree targets and boundaries in writing before anything is scanned." },
      { title: "Discover", detail: "Enumerate live hosts, open ports, and service versions." },
      { title: "Scan", detail: "Run vulnerability scans, authenticated where possible, to reduce false positives." },
      { title: "Prioritise", detail: "Rank findings by exploitability and exposure, not severity score alone." },
      { title: "Remediate and verify", detail: "Patch or reconfigure, then re-scan to confirm each finding is closed." },
    ],
    controls: [
      { title: "Written scope", detail: "Only explicitly authorised targets are tested." },
      { title: "Findings register", detail: "Each issue is tracked from discovery through verified fix." },
      { title: "Verification scans", detail: "Nothing is closed without a clean re-test." },
    ],
    evidence: [],
    challenges: [],
    outcomes: [],
  },
  {
    slug: "docker-cicd-automated-deployment",
    title: "Docker, CI/CD & Automated Deployment",
    short: "From git push to a running, health-checked container, with no manual steps on the server.",
    classification: "personal",
    domains: ["devops", "sysadmin"],
    reviewed: false,
    overview: [
      "Manual deployments are where outages start. This project containerises applications with Docker and builds a pipeline that tests, builds, and deploys on every push to the main branch, with health checks before traffic moves.",
    ],
    diagram: {
      zones: [
        { id: "dev", label: "Source", tone: "edge" },
        { id: "ci", label: "Pipeline", tone: "mgmt" },
        { id: "prod", label: "Server", tone: "internal" },
      ],
      nodes: [
        { id: "git", label: "Git repository", sub: "main branch", zone: "dev", kind: "repo" },
        { id: "test", label: "Test & lint", zone: "ci", kind: "service" },
        { id: "build", label: "Image build", sub: "Dockerfile", zone: "ci", kind: "container" },
        { id: "reg", label: "Registry", sub: "Tagged images", zone: "ci", kind: "storage" },
        { id: "proxy", label: "Reverse proxy", sub: "TLS", zone: "prod", kind: "service" },
        { id: "app", label: "App containers", sub: "Compose", zone: "prod", kind: "container" },
      ],
      links: [
        { from: "git", to: "test", label: "push" },
        { from: "test", to: "build" },
        { from: "build", to: "reg" },
        { from: "reg", to: "app", label: "pull · deploy" },
        { from: "proxy", to: "app" },
      ],
    },
    diagramCaption: "Pipeline: every push is tested and built into a versioned image before the server pulls it.",
    technologies: [
      { name: "Docker", role: "Reproducible application images" },
      { name: "Docker Compose", role: "Multi-container services on a single host" },
      { name: "GitHub Actions", role: "Test, build, and deploy pipeline" },
      { name: "Container registry", role: "Versioned image storage" },
      { name: "Nginx", role: "Reverse proxy and TLS" },
    ],
    implementation: [
      { title: "Containerise", detail: "Multi-stage Dockerfiles producing small images that run as a non-root user." },
      { title: "Pipeline", detail: "On push: install, lint, test, then build and tag an image with the commit SHA." },
      { title: "Deploy", detail: "The server pulls the new tag and restarts services through Compose." },
      { title: "Health checks", detail: "Containers report health; a failed check stops the rollout." },
      { title: "Rollback", detail: "Previous image tags stay available for a one-command rollback." },
    ],
    controls: [
      { title: "Secrets outside the repository", detail: "Credentials live in pipeline secrets and environment files, never in git." },
      { title: "Non-root containers", detail: "Application processes do not run as root inside containers." },
      { title: "Immutable, traceable images", detail: "Every running image maps to a commit." },
      { title: "Least-privilege deploy access", detail: "The pipeline's deploy key can only do what deployment needs." },
    ],
    evidence: [],
    challenges: [],
    outcomes: [],
  },
  {
    slug: "infrastructure-automation-ansible",
    title: "Infrastructure Automation with Ansible",
    short: "Server configuration as code: one playbook run brings any host to the same known-good state.",
    classification: "lab",
    domains: ["devops", "sysadmin"],
    reviewed: false,
    overview: [
      "Servers configured by hand drift apart. This project describes users, packages, services, firewall rules, and hardening settings as Ansible roles, so a new or rebuilt host reaches the same state from one command, and running it again changes nothing.",
    ],
    diagram: {
      zones: [
        { id: "ctl", label: "Control node", tone: "mgmt" },
        { id: "code", label: "Configuration", tone: "edge" },
        { id: "hosts", label: "Managed hosts", tone: "internal" },
      ],
      nodes: [
        { id: "ans", label: "Ansible", sub: "Control node", zone: "ctl", kind: "client" },
        { id: "inv", label: "Inventory", sub: "Groups · vars", zone: "code", kind: "storage" },
        { id: "roles", label: "Roles", sub: "base · harden · web", zone: "code", kind: "repo" },
        { id: "vault", label: "Vault", sub: "Encrypted secrets", zone: "code", kind: "storage" },
        { id: "web", label: "Web servers", zone: "hosts", kind: "server" },
        { id: "db", label: "DB servers", zone: "hosts", kind: "database" },
      ],
      links: [
        { from: "inv", to: "ans", dashed: true },
        { from: "roles", to: "ans", dashed: true },
        { from: "vault", to: "ans", dashed: true },
        { from: "ans", to: "web", label: "SSH" },
        { from: "ans", to: "db", label: "SSH" },
      ],
    },
    diagramCaption: "Agentless push: the control node applies roles to inventory groups over SSH.",
    technologies: [
      { name: "Ansible", role: "Agentless configuration management over SSH" },
      { name: "Roles and playbooks", role: "Reusable, composable configuration" },
      { name: "Ansible Vault", role: "Encrypted secrets in the repository" },
      { name: "Inventory groups", role: "Per-environment and per-role variables" },
    ],
    implementation: [
      { title: "Base role", detail: "Users, SSH keys, packages, time sync, and logging." },
      { title: "Hardening role", detail: "SSH policy, firewall defaults, automatic updates, and kernel settings." },
      { title: "Service roles", detail: "Web server, database, and monitoring agent configuration." },
      { title: "Idempotency", detail: "A second run reports zero changes; drift shows up as changes." },
      { title: "Secrets", detail: "Credentials encrypted with Vault and injected at run time." },
    ],
    controls: [
      { title: "Consistent hardening", detail: "Every host receives the same security baseline from code." },
      { title: "Encrypted secrets", detail: "No plaintext credentials in the repository." },
      { title: "Reviewable changes", detail: "Configuration changes go through version control." },
    ],
    evidence: [],
    challenges: [],
    outcomes: [],
  },
  {
    slug: "network-traffic-analysis-incident-investigation",
    title: "Network Traffic Analysis & Incident Investigation",
    short: "Reading packet captures to reconstruct what happened: who talked to whom, when, and what was sent.",
    classification: "lab",
    domains: ["security", "network"],
    reviewed: false,
    overview: [
      "When something looks wrong on a network, the packets are the record. This project captures traffic at a mirror port, analyses it to separate normal from suspicious behaviour, and turns the findings into a timeline and an incident report.",
    ],
    diagram: {
      zones: [
        { id: "net", label: "Network", tone: "internal" },
        { id: "cap", label: "Capture", tone: "mgmt" },
        { id: "ana", label: "Analysis", tone: "edge" },
      ],
      nodes: [
        { id: "hosts", label: "Hosts", zone: "net", kind: "client" },
        { id: "sw", label: "Switch", sub: "SPAN / mirror port", zone: "net", kind: "switch" },
        { id: "sensor", label: "Capture sensor", sub: "tcpdump", zone: "cap", kind: "sensor" },
        { id: "pcap", label: "PCAP store", zone: "cap", kind: "storage" },
        { id: "ws", label: "Wireshark", sub: "Filters · streams", zone: "ana", kind: "client" },
        { id: "rpt", label: "Incident report", sub: "Timeline · IOCs", zone: "ana", kind: "storage" },
      ],
      links: [
        { from: "hosts", to: "sw" },
        { from: "sw", to: "sensor", label: "mirror" },
        { from: "sensor", to: "pcap" },
        { from: "pcap", to: "ws" },
        { from: "ws", to: "rpt" },
      ],
    },
    diagramCaption: "Passive capture: a mirror port copies traffic to a sensor without touching the hosts.",
    technologies: [
      { name: "Wireshark", role: "Protocol dissection, filters, and stream reconstruction" },
      { name: "tcpdump", role: "Headless capture on the sensor" },
      { name: "Port mirroring (SPAN)", role: "Copying switch traffic to the sensor" },
      { name: "DNS, HTTP, TLS analysis", role: "Spotting beaconing, exfiltration, and odd lookups" },
    ],
    implementation: [
      { title: "Capture", detail: "Mirror the relevant ports and capture with rotation so nothing is lost." },
      { title: "Baseline", detail: "Profile normal traffic: protocols, talkers, and volumes." },
      { title: "Hunt", detail: "Filter for anomalies such as unusual DNS, periodic beacons, cleartext credentials, and scans." },
      { title: "Reconstruct", detail: "Follow streams and extract objects to see exactly what was exchanged." },
      { title: "Report", detail: "Write a timeline, indicators of compromise, and recommended containment." },
    ],
    controls: [
      { title: "Passive collection", detail: "Capture never alters production traffic." },
      { title: "Evidence handling", detail: "Captures are hashed and stored read-only once collected." },
      { title: "Data minimisation", detail: "Captures are scoped and retained only as long as needed." },
    ],
    evidence: [],
    challenges: [],
    outcomes: [],
  },
  {
    slug: "cloud-infrastructure-security-automation",
    title: "Cloud Infrastructure & Security Automation",
    short: "Cloud environments defined as code, with security checks that run before anything is deployed.",
    classification: "personal",
    domains: ["cloud", "security", "devops"],
    reviewed: false,
    overview: [
      "Cloud misconfiguration is one of the most common causes of breaches. This project defines networks, compute, and access as code, and adds automated checks so insecure changes are caught in review rather than in production.",
    ],
    diagram: {
      zones: [
        { id: "code", label: "Code", tone: "edge" },
        { id: "pipe", label: "Pipeline", tone: "mgmt" },
        { id: "cloud", label: "Cloud account", tone: "internal" },
      ],
      nodes: [
        { id: "tf", label: "Terraform", sub: "Infrastructure code", zone: "code", kind: "repo" },
        { id: "scan", label: "Policy checks", sub: "IaC scanning", zone: "pipe", kind: "service" },
        { id: "plan", label: "Plan & apply", sub: "Reviewed", zone: "pipe", kind: "service" },
        { id: "vpc", label: "Private network", sub: "Subnets · rules", zone: "cloud", kind: "cloud" },
        { id: "vm", label: "Compute", zone: "cloud", kind: "vm" },
        { id: "iam", label: "IAM", sub: "Least privilege", zone: "cloud", kind: "service" },
      ],
      links: [
        { from: "tf", to: "scan", label: "pull request" },
        { from: "scan", to: "plan" },
        { from: "plan", to: "vpc" },
        { from: "plan", to: "iam" },
        { from: "vpc", to: "vm" },
      ],
    },
    diagramCaption: "Changes flow through policy checks and a reviewed plan before they reach the cloud account.",
    technologies: [
      { name: "Terraform", role: "Declarative cloud infrastructure" },
      { name: "IaC security scanning", role: "Catches open ports, public storage, and weak encryption before apply" },
      { name: "Cloud IAM", role: "Roles and policies with least privilege" },
      { name: "Private networking", role: "Public and private subnets with explicit firewall rules" },
    ],
    implementation: [
      { title: "Model the environment", detail: "Networks, compute, storage, and identities written as code modules." },
      { title: "Secure defaults", detail: "Private by default: encryption on, no public storage, minimal open ports." },
      { title: "Policy checks", detail: "Every change is scanned in the pipeline; failures block the merge." },
      { title: "Reviewed apply", detail: "Plans are reviewed before they are applied." },
      { title: "Drift detection", detail: "Scheduled plans flag changes made outside of code." },
    ],
    controls: [
      { title: "Least-privilege IAM", detail: "Identities get only the permissions they use." },
      { title: "No public exposure by default", detail: "Public endpoints must be declared explicitly." },
      { title: "Encryption at rest", detail: "Storage and volumes are encrypted by default." },
      { title: "Shift-left scanning", detail: "Misconfigurations fail the pipeline, not the audit." },
    ],
    evidence: [],
    challenges: [],
    outcomes: [],
  },
];

export const workBySlug = Object.fromEntries(work.map((w) => [w.slug, w])) as Record<string, WorkProject>;
