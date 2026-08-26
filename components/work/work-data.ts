export interface WorkBullet {
  /** Short title for the bullet, used only on the detail page where
   *  each point gets its own block. The list on the home page renders
   *  `text` alone. */
  heading: string;
  text: string;
  bold?: string[];
}

export interface WorkPhoto {
  /** Caption doubles as the placeholder label until a real file exists,
   *  so an empty slot still says what belongs in it. */
  caption: string;
  src?: string;
  alt?: string;
}

export interface WorkEntry {
  id: string;
  /** URL segment for /work/[slug]. */
  slug: string;
  index: string;
  role: string;
  company: string;
  location: string;
  dates: string;
  /** Two or three words for the meta rail and the detail-page eyebrow. */
  focus: string;
  accent: "blue" | "orange";
  stack: string[];
  /** Lead paragraphs on the detail page. */
  summary: string[];
  bullets: WorkBullet[];
  photos: WorkPhoto[];
}

export const workEntries: WorkEntry[] = [
  {
    id: "cloud-coe-coop",
    slug: "cloud-centre-of-excellence-coop",
    index: "01",
    role: "Cloud Centre of Excellence Co-op",
    company: "Sobeys Inc.",
    location: "Stellarton, NS",
    dates: "May 2026 - Aug 2026",
    focus: "Governance & Identity",
    accent: "blue",
    stack: [
      "Azure Resource Graph",
      "KQL",
      "Azure Policy",
      "Databricks",
      "SCIM",
      "IAM / RBAC",
    ],
    summary: [
      "My third co-op term on the Cloud Centre of Excellence team, spent making governance automatic rather than manual. The work centred on identity, policy, and visibility: connecting Databricks to central identity so access maintains itself, writing policy that protects resources the moment they exist, and querying the estate to find what had quietly drifted out of it.",
      "Alongside the build work, I coordinated the retirement of outdated infrastructure across teams that each owned a different slice of the environment — the part of cloud cleanup that is less about tooling than about getting the right people to agree on what can safely go.",
    ],
    bullets: [
      {
        heading: "Automated identity sync for Databricks",
        text: "Connected Databricks to the company's central identity system using SCIM, so user and group access updates automatically instead of being added and removed by hand.",
        bold: ["SCIM"],
      },
      {
        heading: "Policy-enforced deletion protection",
        text: "Built an Azure Policy that automatically protects new resources from accidental deletion the moment they're created, rather than relying on someone to remember to do it.",
        bold: ["Azure Policy"],
      },
      {
        heading: "Fleet-wide resource discovery",
        text: "Wrote queries using Azure Resource Graph and KQL to search the entire cloud environment for resources that were unused, untracked, or misconfigured.",
        bold: ["Azure Resource Graph", "KQL"],
      },
      {
        heading: "Cross-team infrastructure retirement",
        text: "Coordinated the retirement of outdated infrastructure across multiple teams, each responsible for a different part of the environment.",
        bold: ["retirement of outdated infrastructure"],
      },
    ],
    photos: [
      { caption: "Governance tooling" },
      { caption: "Team retirement sync" },
    ],
  },
  {
    id: "it-ops-transformation",
    slug: "it-ops-transformation-student",
    index: "02",
    role: "IT Ops Transformation Student",
    company: "Sobeys Inc.",
    location: "Stellarton, NS",
    dates: "Sept 2025 - Dec 2025",
    focus: "IT Operations",
    accent: "orange",
    stack: [
      "ServiceNow",
      "Incident Management",
      "Store Systems",
      "Process Documentation",
    ],
    summary: [
      "A term inside IT operations rather than cloud engineering, working the support side of retail store systems. Most days started with a ticket and ended with either a fix or a clear handoff to whoever could make one.",
      "The through-line was reducing repeat work: documenting what kept coming back, rewriting the workflow guides around it, and learning how operational data actually moves between stores and the central servers behind them.",
    ],
    bullets: [
      {
        heading: "End-to-end ticket resolution",
        text: "Resolved support tickets end to end for retail store systems, restoring access and functionality for staff across the store network.",
        bold: ["end to end"],
      },
      {
        heading: "Vendor and store coordination",
        text: "Worked with external vendors and store teams to investigate incidents and coordinate fixes between the people reporting problems and the people able to solve them.",
        bold: ["external vendors"],
      },
      {
        heading: "Documentation that cut repeat work",
        text: "Documented recurring issues and rewrote workflow guides so the same problems could be resolved faster the next time they appeared.",
        bold: ["workflow guides"],
      },
      {
        heading: "Tracing operational data flows",
        text: "Traced how operational data moves between store systems and central servers, learning where enterprise data breaks down and how it gets repaired.",
        bold: ["operational data"],
      },
    ],
    photos: [
      { caption: "Store systems support" },
      { caption: "Workflow documentation" },
    ],
  },
  {
    id: "cloud-devops-intern",
    slug: "cloud-devops-intern",
    index: "03",
    role: "Cloud & DevOps Intern, Cloud Centre of Excellence",
    company: "Sobeys Inc.",
    location: "Stellarton, NS",
    dates: "May 2025 - Aug 2025",
    focus: "Provisioning & FinOps",
    accent: "blue",
    stack: [
      "Azure",
      "RBAC",
      "Key Vault",
      "PowerShell",
      "Azure Data Factory",
      "Databricks",
      "SQL",
      "FinOps",
    ],
    summary: [
      "My first term on the Cloud Centre of Excellence team, spent largely on the provisioning and security side of Azure — setting environments up for internal teams and making sure access and credentials were handled properly from the start rather than patched later.",
      "The second half leaned toward data and cost: reporting pipelines in Azure Data Factory and Databricks, and FinOps work alongside architects to find spend that wasn't buying anything.",
    ],
    bullets: [
      {
        heading: "Secure environment provisioning",
        text: "Set up and secured Azure environments for internal teams, controlling who has access to what using RBAC and storing credentials safely in Azure Key Vault.",
        bold: ["RBAC", "Azure Key Vault"],
      },
      {
        heading: "Secretless pipeline authentication",
        text: "Replaced stored passwords in deployment pipelines with Workload Identity Federation, so systems authenticate without any long-lived secret existing to be leaked.",
        bold: ["Workload Identity Federation"],
      },
      {
        heading: "PowerShell automation",
        text: "Wrote PowerShell scripts to automate setup tasks that were previously done manually every time they were needed.",
        bold: ["PowerShell scripts"],
      },
      {
        heading: "Cost reporting pipelines",
        text: "Built reporting pipelines in Azure Data Factory and Databricks, using SQL to turn large volumes of usage data into cost insights for the team.",
        bold: ["Azure Data Factory", "Databricks"],
      },
      {
        heading: "FinOps and cost reduction",
        text: "Worked with architects on FinOps initiatives to find and reduce unnecessary cloud spend across Azure and GCP.",
        bold: ["FinOps"],
      },
    ],
    photos: [
      { caption: "Azure environment setup" },
      { caption: "Cost reporting pipeline" },
    ],
  },
];

export function getWorkEntry(slug: string) {
  return workEntries.find((entry) => entry.slug === slug);
}

/** Previous and next terms, for the pager at the foot of a detail page. */
export function getWorkNeighbours(slug: string) {
  const i = workEntries.findIndex((entry) => entry.slug === slug);
  if (i === -1) return { previous: undefined, next: undefined };
  return {
    previous: i > 0 ? workEntries[i - 1] : undefined,
    next: i < workEntries.length - 1 ? workEntries[i + 1] : undefined,
  };
}
