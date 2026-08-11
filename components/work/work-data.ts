export interface WorkEntry {
  id: string;
  index: string;
  role: string;
  company: string;
  location: string;
  dates: string;
  current?: boolean;
  accent: "blue" | "orange" | "purple";
  stack: string[];
  bullets: { text: string; bold?: string[] }[];
  metrics: { value: string; label: string }[];
  photos: [
    { src: string; alt: string; caption: string },
    { src: string; alt: string; caption: string },
  ];
}

export const workEntries: WorkEntry[] = [
  {
    id: "cloud-coe-coop",
    index: "01",
    role: "Cloud Centre of Excellence Co-op",
    company: "Sobeys Inc.",
    location: "Stellarton, NS",
    dates: "May 2026 — Present",
    current: true,
    accent: "blue",
    stack: ["Azure Resource Graph", "KQL", "PowerShell", "Azure Policy", "RBAC"],
    bullets: [
      {
        text: "Built Resource Graph and KQL-based discovery tooling to identify and remediate stale cloud resources across production subscriptions.",
        bold: ["Resource Graph", "KQL"],
      },
      {
        text: "Led cross-team retirement coordination for legacy VM SKUs and orphaned disk infrastructure spanning multiple owner teams.",
        bold: ["VM SKUs", "orphaned disk infrastructure"],
      },
      {
        text: "Ran IAM and RBAC access reviews to tighten least-privilege boundaries across subscriptions ahead of an internal audit.",
        bold: ["IAM", "RBAC"],
      },
    ],
    metrics: [
      { value: "340+", label: "Resources remediated" },
      { value: "18", label: "Teams coordinated" },
      { value: "6", label: "Subscriptions covered" },
    ],
    photos: [
      { src: "/images/placeholder-work-1.jpg", alt: "Placeholder photo — swap in later", caption: "Governance tooling" },
      { src: "/images/placeholder-work-2.jpg", alt: "Placeholder photo — swap in later", caption: "Team retirement sync" },
    ],
  },
  {
    id: "it-ops-transformation",
    index: "02",
    role: "IT Ops Transformation Student",
    company: "Sobeys Inc.",
    location: "Stellarton, NS",
    dates: "Sept 2025 — Dec 2025",
    accent: "orange",
    stack: ["PowerShell", "ServiceNow", "Azure Automation", "Process Mapping"],
    bullets: [
      {
        text: "Automated recurring operational tickets with PowerShell runbooks, cutting manual handling time on routine requests.",
        bold: ["PowerShell runbooks"],
      },
      {
        text: "Mapped legacy IT operations workflows and proposed transformation targets adopted into the team's roadmap.",
        bold: ["transformation targets"],
      },
      {
        text: "Partnered with the service desk to reduce recurring ticket volume through root-cause fixes rather than one-off patches.",
        bold: ["root-cause fixes"],
      },
    ],
    metrics: [
      { value: "45%", label: "Ticket time reduced" },
      { value: "12", label: "Runbooks shipped" },
      { value: "3", label: "Workflows redesigned" },
    ],
    photos: [
      { src: "/images/placeholder-work-3.jpg", alt: "Placeholder photo — swap in later", caption: "Runbook automation" },
      { src: "/images/placeholder-work-4.jpg", alt: "Placeholder photo — swap in later", caption: "Workflow mapping" },
    ],
  },
  {
    id: "cloud-coe-summer",
    index: "03",
    role: "Cloud Centre of Excellence Summer Student",
    company: "Sobeys Inc.",
    location: "Stellarton, NS",
    dates: "May 2025 — Aug 2025",
    accent: "purple",
    stack: ["Azure Governance", "Cost Management", "KQL", "Documentation"],
    bullets: [
      {
        text: "Assisted with Azure governance baselining across subscriptions, documenting policy gaps for the CoE backlog.",
        bold: ["Azure governance baselining"],
      },
      {
        text: "Built early KQL queries against Resource Graph to surface untagged and unowned resources for cleanup.",
        bold: ["KQL queries"],
      },
      {
        text: "Produced onboarding documentation that shortened ramp-up time for the next term's incoming co-op.",
        bold: ["onboarding documentation"],
      },
    ],
    metrics: [
      { value: "120+", label: "Resources tagged" },
      { value: "9", label: "Policy gaps documented" },
      { value: "1", label: "Onboarding guide shipped" },
    ],
    photos: [
      { src: "/images/placeholder-work-5.jpg", alt: "Placeholder photo — swap in later", caption: "Governance baselining" },
      { src: "/images/placeholder-work-6.jpg", alt: "Placeholder photo — swap in later", caption: "Onboarding docs" },
    ],
  },
];
